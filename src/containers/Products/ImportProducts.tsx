import React, { useState } from 'react';
import { styled } from 'baseui';
import { useAlert } from "react-alert";
import {
  Grid,
  Row as Rows,
  Col as Column,
} from '../../components/FlexBox/FlexBox';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Header, Heading } from '../../components/WrapperStyle';
import Fade from 'react-reveal/Fade';
import ProductCard from '../../components/ProductCard/ProductCard';
import NoResult from '../../components/NoResult/NoResult';
import { CURRENCY } from '../../settings/constants';
import Placeholder from '../../components/Placeholder/Placeholder';
import {useForm} from "react-hook-form";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {ImportAllDialog} from "./components/ImportAllDialog";

export const ProductsRow = styled('div', ({ $theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '25px',
  backgroundColor: $theme.colors.backgroundF7,
  position: 'relative',
  zIndex: '1',

  '@media only screen and (max-width: 767px)': {
    marginLeft: '-7.5px',
    marginRight: '-7.5px',
    marginTop: '15px',
  },
}));

export const Col = styled(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Row = styled(Rows, () => ({
  '@media only screen and (min-width: 768px) and (max-width: 991px)': {
    alignItems: 'center',
  },
}));

export const ProductCardWrapper = styled('div', () => ({
  height: '100%',
}));

export const LoaderWrapper = styled('div', () => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexWrap: 'wrap',
}));

export const LoaderItem = styled('div', () => ({
  width: '25%',
  padding: '0 15px',
  marginBottom: '30px',
}));



export const IMPORT_ALL = gql`
  mutation importProducts($products: [AddProductInput], $shopIds: [Long], $browseNode: String) {
    importProducts(products: $products, shopIds: $shopIds, browseNode: $browseNode) {
      value
    }
  }
`;


export const IMPORT_PRODUCTS = gql`
  query merchantImportProducts(
    $type: String 
    $limit: Int = 12
    $text: String
    $offset: Int = 0
    $lang: Int
  ) {
    merchantImportProducts(
      type: $type
      limit: $limit
      text: $text
      offset: $offset
      lang: $lang
    ) {
      items {
        id
        ref
        name
        brand
        description
        features               
        name_ar
        brand_ar
        description_ar
        features_ar
        image
        price
        unit
        sku
        salePrice
        discountInPercent
        upc
        availability
        weight
        cost
        quantity
        browseNode
        browseNode_ar
        shopIds
      }
      total
      hasMore
    }
  }
`;

const typeSelectOptions = [
  { value: 'grocery', label: 'Grocery' },
  { value: 'women-cloths', label: 'Women Cloths' },
  { value: 'bags', label: 'Bags' },
  { value: 'makeup', label: 'Makeup' },
];
const priceSelectOptions = [
  { value: 'highestToLowest', label: 'Highest To Lowest' },
  { value: 'lowestToHighest', label: 'Lowest To Highest' },
];

export default function Products() {
  const { data, error, refetch, fetchMore } = useQuery(IMPORT_PRODUCTS,{ context: { clientName: "shopLink" }});
  const [ importAllMutation ] = useMutation(IMPORT_ALL, { context: { clientName: "shopLink" }});


  const [dialog, setDialog] = useState(false);
  const [priceOrder, setPriceOrder] = useState([]);
  const [search, setSearch] = useState([]);
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {}
  });
  const alert = useAlert();

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  function loadMore() {
    fetchMore({
      variables: {
        offset: data.merchantImportProducts.items.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          merchantImportProducts: {
            __typename: prev.merchantImportProducts.__typename,
            items: [...prev.merchantImportProducts.items, ...fetchMoreResult.merchantImportProducts.items],
            hasMore: fetchMoreResult.merchantImportProducts.hasMore,
          },
        });
      },
    });
  }

  function handleSearch(data) {
    console.log(data);
    const value = data.search;
    console.log(value);
    refetch({ text: value });
  }

  const importAll = async (shopIds, browseNode) => {
    const s = data.merchantImportProducts.items.map(({__typename, ...props}) => ({...props}));
    console.log(s);
    //return;

    const {
      data: { importProducts },
    }: any = await importAllMutation({
      variables: {products: s, shopIds, browseNode}
    });
    if(importProducts)  {
      alert.success(importProducts.value);
      await refetch();
    }
  }

  const onShow = () => setDialog(true);
  const onClose = () => setDialog(false);

  return (
    <Grid fluid={true}>
      <ImportAllDialog open={dialog} onClose={onClose} onSubmit={importAll} />
      <Row>
        <Col md={12}>
          <Header style={{ marginBottom: 15 }}>
            <Col md={2} xs={12}>
              <Heading>Products to Import</Heading>
            </Col>
            <Col md={5} xs={12} >
              <form onSubmit={handleSubmit(handleSearch)}>
                <TextField name="search" inputRef={register({required: true, minLength: 2, maxLength: 12})}></TextField>
                <Button size="medium" variant="contained" color="primary" type="submit" >Go</Button>
              </form>
            </Col>
            <Col md={5} xs={12} >
                <Button size="medium" variant="contained" color="primary" onClick={onShow}>Import All</Button>
            </Col>
          </Header>

          <Row>
            {data ? (
              data.merchantImportProducts && data.merchantImportProducts.items.length !== 0 ? (
                data.merchantImportProducts.items.map((item: any, index: number) => (
                  <Col
                    md={4}
                    lg={3}
                    sm={6}
                    xs={12}
                    key={index}
                    style={{ margin: '15px 0' }}
                  >
                    <Fade bottom duration={800} delay={index * 10}>
                      <ProductCard
                        title={item.name}
                        weight={item.brand}
                        image={item.image}
                        currency={CURRENCY}
                        price={item.price}
                        salePrice={item.salePrice}
                        discountInPercent={item.discountInPercent}
                        data={item}
                      />
                    </Fade>
                  </Col>
                ))
              ) : (
                <NoResult />
              )
            ) : (
              <LoaderWrapper>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
              </LoaderWrapper>
            )}
          </Row>
          {data && data.merchantImportProducts && data.merchantImportProducts.hasMore && (
            <Row>
              <Col
                md={12}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button onClick={loadMore}>Load More</Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Grid>
  );
}
