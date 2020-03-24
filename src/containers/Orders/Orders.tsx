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
import { useQuery } from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import Checkbox from '../../components/CheckBox/CheckBox';

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from './Orders.style';
import NoResult from '../../components/NoResult/NoResult';
import { Link } from 'react-router-dom';

const GET_ORDERS = gql`
  query getOrders($state: [OrderState], $limit: Int, $searchText: String) {
    ordersA(state: $state, limit: $limit, searchText: $searchText) {
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
      deliveryAddress {
          firstName
          lastName
          line1
          line1
          city
      }
      orderItems {
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
const limitSelectOptions = [
  { value: 7, label: 'Last 7 orders' },
  { value: 15, label: 'Last 15 orders' },
  { value: 30, label: 'Last 30 orders' },
];

export default function Orders() {
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

  const { data, error, refetch } = useQuery(GET_ORDERS, {
    variables: {
      status: ['PAYMENT_ACCEPTED'],
      limit: 10,
      searchText: "",
    },
    fetchPolicy: "network-only"

  });
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function handleStatus({ value }) {
    setStatus(value);
    if (value.length) {
      refetch({
        status: [value[0].value],
        limit: limit.length ? limit[0].value : null,
        searchText: "",
      });
    } else {
      refetch({ status: [], limit:10, searchText:"" });
    }
  }

  function handleLimit({ value }) {
    setLimit(value);
    if (value.length) {
      refetch({
        status: status.length ? [status[0].value] : [],
        limit: value[0].value,
        searchText: ""
      });
    } else {
      refetch({ status: [], limit:10, searchText:"" });
    }
  }
  function handleSearch(event) {
    const { value } = event.currentTarget;
    setSearch(value);
    refetch({ status: [], limit:10, searchText:value });
  }
  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.orders.map(order => order.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }

  function handleCheckbox(event) {
    const { name } = event.currentTarget;
    if (!checkedId.includes(name)) {
      setCheckedId(prevState => [...prevState, name]);
    } else {
      setCheckedId(prevState => prevState.filter(id => id !== name));
    }
  }
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
              <Heading>Orders</Heading>
            </Col>

            <Col md={9} xs={12}>
              <Row>
                <Col md={3} xs={12}>
                  <Select
                    options={statusSelectOptions}
                    labelKey='label'
                    valueKey='value'
                    placeholder='Status'
                    value={status}
                    searchable={false}
                    onChange={handleStatus}
                  />
                </Col>

                <Col md={3} xs={12}>
                  <Select
                    options={limitSelectOptions}
                    labelKey='label'
                    valueKey='value'
                    value={limit}
                    placeholder='Order Limits'
                    searchable={false}
                    onChange={handleLimit}
                  />
                </Col>

                <Col md={6} xs={12}>
                  <Input
                    value={search}
                    placeholder='Ex: Search By Address'
                    onChange={handleSearch}
                    clearable
                  />
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns='minmax(70px, 70px) minmax(70px, 70px) minmax(150px, auto) minmax(150px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)'>
                <StyledHeadCell>
                  <Checkbox
                    type='checkbox'
                    value='checkAll'
                    checked={checked}
                    onChange={onAllCheck}
                    overrides={{
                      Checkmark: {
                        style: {
                          borderWidth: '2px',
                          borderRadius: '4px',
                        },
                      },
                    }}
                  />
                </StyledHeadCell>
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Customer ID</StyledHeadCell>
                <StyledHeadCell>Time</StyledHeadCell>
                <StyledHeadCell>Delivery Address</StyledHeadCell>
                <StyledHeadCell>Amount</StyledHeadCell>
                <StyledHeadCell>Payment Method</StyledHeadCell>
                <StyledHeadCell>Contact</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>

                {data ? (
                  data.ordersA.length ? (
                    data.ordersA
                      //.map(item => Object.values(item))
                      .map((row, index) => (
                        <React.Fragment key={index}>
                          <StyledCell>
                            <Checkbox
                              name={row.id}
                              checked={checkedId.includes(row.id)}
                              onChange={handleCheckbox}
                              overrides={{
                                Checkmark: {
                                  style: {
                                    borderWidth: '2px',
                                    borderRadius: '4px',
                                  },
                                },
                              }}
                            />
                          </StyledCell>
                          <StyledCell><div><Link to={`order-details/${row.id}`}>{row.id}</Link></div></StyledCell>
                          <StyledCell>{row.reference}</StyledCell>
                          <StyledCell>
                            <Moment format='Do MMM YYYY'>{row.createdDate}</Moment>
                          </StyledCell>
                          <StyledCell>{row.deliveryAddress.firstName}</StyledCell>
                          <StyledCell>OMR {row.total}</StyledCell>
                          <StyledCell>{row.paymentMethod}</StyledCell>
                          <StyledCell>{row.orderState}</StyledCell>
                          <StyledCell style={{ justifyContent: 'center' }}>
                            <Status
                              className={
                                row[7] === 'delivered'
                                  ? sent
                                  : row[7] === 'pending'
                                  ? paid
                                  : row[7] === 'processing'
                                  ? processing
                                  : row[7] === 'failed'
                                  ? failed
                                  : ''
                              }
                            >
                              {row[7]}
                            </Status>
                          </StyledCell>
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
