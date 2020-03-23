import React, { useState } from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import Moment from 'react-moment';
import {
  Grid,
  Row as Rows,
  Col as Column,
} from '../../components/FlexBox/FlexBox';
import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import Checkbox from '../../components/CheckBox/CheckBox';
import { Link, useParams  } from 'react-router-dom';
import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from '../Orders/Orders.style';
import NoResult from '../../components/NoResult/NoResult';
import StickerCard from "../../components/Widgets/StickerCard/StickerCard";
import {CartIconBig, CoinIcon} from "../../components/AllSvgIcon";
import Image from '../../components/Image/Image';
import Button from "../../components/Button/Button";

const GET_ORDER = gql`
  query orderA($id: ID) {
    orderA(id: $id) {
      id
      reference
      createdDate
      invoiceDate
      total
      invoiceDate
      paymentMethod
      subtotal
      orderState
      deliveryTotal
      discountsTotal
      deliveryDate
      customer {
        id
        firstname
        lastname
      }
      deliveryAddress {
          firstName
          lastName
          line1
          line1
          city
      }
      orderItems {
        sequence
        sku
        productName
        price
        quantity
        image
        lineTotal
      }
    }
  }
`;
const SEND_PAYMENT_SMS = gql`
  query orderA($id: ID) {
    orderA(id: $id) {
      id
      reference
      createdDate
      invoiceDate
      total
      invoiceDate
      paymentMethod
      subtotal
      orderState
      deliveryTotal
      discountsTotal
      deliveryDate
      customer {
        id
        firstname
        lastname
      }
      deliveryAddress {
          firstName
          lastName
          line1
          line1
          city
      }
      orderItems {
        sequence
        sku
        productName
        price
        quantity
        image
        lineTotal
      }
    }
  }
`;

type CustomThemeT = { red400: string; textNormal: string; colors: any };
const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();

const Status = styled('div', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textDark,
  display: 'flex',
  alignItems: 'center',
  lineHeight: '1',
  textTransform: 'capitalize',

  ':before': {
    content: '""',
    width: '10px',
    height: '10px',
    display: 'inline-block',
    borderRadius: '10px',
    backgroundColor: $theme.borders.borderE6,
    marginRight: '10px',
  },
}));

const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  '@media only screen and (min-width: 768px)': {
    alignItems: 'center',
  },
}));

const statusSelectOptions = [
  { value: 'delivered', label: 'Delivered' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'failed', label: 'Failed' },
];

export default function PurchaseDetails(props) {
  let { slug } = useParams();
  console.log(slug);

  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);

  const [useCss, theme] = themedUseStyletron();
  const sent = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const failed = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });
  const processing = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.textNormal,
    },
  });
  const paid = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.blue400,
    },
  });

  const [status, setStatus] = useState([]);
  const [limit, setLimit] = useState([]);
  const [search, setSearch] = useState([]);

  const contactBySms = async => {
    alert('contact');
  }

  const { data, loading, error, refetch } = useQuery(GET_ORDER, {
    variables: {
      id: slug
    },
    fetchPolicy: "network-only"
  });

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  if (loading)
    return <div>Loading </div>

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: '0 0 8px rgba(0, 0 ,0, 0.1)',
            }}
          >
            <Col md={3} xs={12}>
              <Heading>Order {data.orderA.reference}</Heading>
            </Col>

            <Col md={9} xs={12}>
              <Row>

              </Row>
            </Col>
          </Header>
          <Row>
            <Col lg={3} sm={6} xs={12} className='mb-30'>
              <StickerCard
                  title={`${data.orderA.customer.firstname} ${data.orderA.customer.lastname} / ${data.orderA.customer.id}`}
                  subtitle={data.orderA.customer.email}
                  icon={<CoinIcon />}
                  price={data.orderA.total}
                  indicator='up'
                  indicatorText='Revenue up'
                  note='(previous 30 days)'
                  link='#'
                  linkText='Full Details'
              />
            </Col>
            <Col lg={3} sm={6} xs={12} className='mb-30'>
              <StickerCard
                  title='Address'
                  subtitle={`${data.orderA.deliveryAddress.firstName} ${data.orderA.deliveryAddress.lastName}`}
                  icon={<CartIconBig />}
                  price={data.orderA.deliveryAddress.city}
                  indicatorText={data.orderA.deliveryAddress.phone}
                  note='(previous 30 days)'
                  link='#'
                  linkText='Full Details'
              >

              </StickerCard>
            </Col>
            <Col lg={3} sm={6} xs={12} className='mb-30'>
              <Button onClick={contactBySms} >Contact By SMS</Button>
            </Col>
          </Row>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns='minmax(70px, 70px) minmax(150px, auto) minmax(150px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)'>
                <StyledHeadCell>Seq</StyledHeadCell>
                <StyledHeadCell>Image</StyledHeadCell>
                <StyledHeadCell>Description</StyledHeadCell>
                <StyledHeadCell>Quantity</StyledHeadCell>
                <StyledHeadCell>Price</StyledHeadCell>
                <StyledHeadCell>Line Total</StyledHeadCell>
                <StyledHeadCell>Sku</StyledHeadCell>

                {data ? (
                  data.orderA.orderItems ? (
                      data.orderA.orderItems
                      //.map(item => Object.values(item))
                      .map((row, index) => (
                        <React.Fragment key={index}>
                          <StyledCell>{row.sequence}</StyledCell>
                          <StyledCell>
                            <Image url={row.image} className="product-image" style={{maxWidth: '70px'}} />
                          </StyledCell>
                          <StyledCell>{row.productName}</StyledCell>
                          <StyledCell>{row.quantity}</StyledCell>
                          <StyledCell>{row.price}</StyledCell>
                          <StyledCell>${row.lineTotal}</StyledCell>
                        </React.Fragment>
                      ))
                  ) : (
                    <NoResult
                      hideButton={false}
                      style={{
                        gridColumnStart: '1',
                        gridColumnEnd: 'one',
                      }}
                    />
                  )
                ) : null}
              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  );
}
