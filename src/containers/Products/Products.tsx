import React, { useState } from 'react';
import { styled } from 'baseui';
import { useAlert } from "react-alert";

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Header, Heading } from '../../components/WrapperStyle';
import Fade from 'react-reveal/Fade';
import ProductCard from '../../components/ProductCard/ProductCard';
import NoResult from '../../components/NoResult/NoResult';
import { CURRENCY } from '../../settings/constants';
import Placeholder from '../../components/Placeholder/Placeholder';
import {Tab, TextField} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Col, IMPORT_ALL} from "./ImportProducts";
import {useForm} from "react-hook-form";
import Checkbox from "@material-ui/core/Checkbox";
import {ImportAllDialog} from "./components/ImportAllDialog";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useMerchantProductsQuery} from "../../codegen/generated/_graphql";
import {Link} from "react-router-dom";

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
  /*const { data, error, refetch, fetchMore } = useMerchantProductsQuery({ context: { clientName: "shopLink" }});
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {}
  });
  const [dialog, setDialog] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [type, setType] = useState([]);
  const [tab, setTab] = useState(1);
  const [priceOrder, setPriceOrder] = useState([]);
  const [search, setSearch] = useState([]);
  const [checkedId, setCheckedId] = useState([]);
  const [ importAllMutation ] = useMutation(IMPORT_ALL, { context: { clientName: "shopLink" }});
  const alert = useAlert();

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  function loadMore() {
    fetchMore({
      variables: {
        offset: data.merchantProducts.items.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          merchantProducts: {
            __typename: prev.merchantProducts.__typename,
            items: [...prev.merchantProducts.items, ...fetchMoreResult.merchantProducts.items],
            hasMore: fetchMoreResult.merchantProducts.hasMore,
          },
        });
      },
    });
  }
/!*
  function handlePriceSort({ value }) {
    setPriceOrder(value);
    if (value.length) {
      refetch({
        sortByPrice: value[0].value,
      });
    } else {
      refetch({
        sortByPrice: null,
      });
    }
  }
*!/


  function handleSearch(data) {
    const value = data.search;
    // @ts-ignore
    refetch({ text: value });
  }

  const handleTabChange = (event, newValue) =>  {
    if(tab !== newValue) {
      // @ts-ignore
      refetch({imported: newValue});
      setTab(newValue);
    }
  }

  function handleCheckbox(event) {

    let value = event.target.value;
    console.log('handleCheckbox',value)
    if(checkedId.length >= 20) {
      alert.error("Cannot update more than 10 products at one time");
      return false;
    }

    if (!checkedId.includes(value)) {
      setCheckedId(prevState => [...prevState, value]);
    } else {
      setCheckedId(prevState => prevState.filter(id => id !== value));
    }
  }
  const importAll = async (shopIds, browseNode) => {
    if(checkedId.length < 1) {
      alert.error("Must select to import");
      return;
    }

    const s = data.merchantProducts.items.filter(e => ~checkedId.indexOf(e.id)).map(({__typename, ...props}) => ({...props}));
    //console.log(s);
    //return;

    setBackdrop(true);
    const {
      data: { importProducts },
    }: any = await importAllMutation({
      variables: {products: s, shopIds, browseNode}
    });
    if(importProducts)  {
      alert.success(importProducts.value);
      setBackdrop(false);
      setDialog(false);
      await refetch();
    }
  }

  const onShow = () => setDialog(true);
  const onClose = () => setDialog(false);
  return (
    <Grid container spacing={1}>

      <ImportAllDialog open={dialog} onClose={onClose} onSubmit={importAll} />
      <Backdrop open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid item  md={12} >
        <Header style={{ marginBottom: 15 }}>
          <Grid item md={2}>
        <Heading>Products</Heading>
          <Link to="hashtags">
            <Button variant="contained" color="secondary">
              Hash Tags
            </Button></Link>
          </Grid>
          <Grid item md={6}>
            <form onSubmit={handleSubmit(handleSearch)}>
              <TextField name="search" inputRef={register({required: true, minLength: 2, maxLength: 12})} style={{width:'320px'}}></TextField>
              <span> </span>
              <Button size="medium" variant="contained" color="primary" type="submit" >Go</Button>
              {!tab && <Button size="medium" variant="contained" color="primary" onClick={onShow}>Import Selected</Button>}
            </form>
          </Grid>
        </Header>
      </Grid>
      <Grid item md={12} >
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Draft" />
        <Tab label="Active" />
      </Tabs>
      </Grid>
        {data ? (
          data.merchantProducts && data.merchantProducts.items.length !== 0 ? (
            data.merchantProducts.items.map((item: any, index: number) => (
              <Grid item
                md={3}
                lg={2}
                sm={4}
                xs={6}
                key={index}
                style={{ margin: '15px 0' }}

              >
                <Fade bottom duration={800} delay={index * 10}>
                  <Checkbox
                    name={item.id}
                    checked={checkedId.includes(item.id)}
                    onChange={handleCheckbox}
                    value={item.id}
                  />
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
              </Grid>
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
      {data && data.merchantProducts && data.merchantProducts.hasMore && (
            <Button onClick={loadMore}>Load More</Button>
      )}
      </Grid>
*/
  return(
    <></>
  );
}
