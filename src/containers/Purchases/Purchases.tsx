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
import { useAlert } from "react-alert";
import {
  OrderInfoPaper
} from '../Orders/Orders.style';
import NoResult from '../../components/NoResult/NoResult';
import { Link } from 'react-router-dom';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";

const GET_ORDERS = gql`
  query purchases($state: [OrderState], $limit: Int, $searchText: String) {
    purchases(state: $state, limit: $limit, searchText: $searchText) {
      id
      currency
      invoiceDate
      subtotal
      deliveryTotal
      taxesTotal
      discountTotal
      total
      merchantObj {
        id
        name
      }
      purchaseItems {
        description
        price
        quantity
      }
    }
  }
`;
const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

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

export default function Purchases() {
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState([]);
  const [limit, setLimit] = useState([]);
  const [search, setSearch] = useState([]);
  const alert = useAlert();
  const classes = useStyles();

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

  alert.success('in purchases');
  const { data, error, refetch } = useQuery(GET_ORDERS, {
    variables: {
      status: [],
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

            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell align="left">Ref</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="center">Payment</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                {data && data.purchases.length && (
                    <TableBody>

                      {data.purchases.map(row => (
                          <TableRow key={row.orderId}>
                            <TableCell align="right"><Checkbox
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
                            /></TableCell>
                            <TableCell component="th" scope="row">
                              <Link to={`purchase-details/${row.id}`}>{row.id}</Link>
                            </TableCell>
                            <TableCell align="left">{row.merchantObj.name}</TableCell>

                            <TableCell align="left">{row.deliveryTotal}</TableCell>
                            <TableCell align="right">{row.taxesTotal}</TableCell>

                            <TableCell align="center">OMR {row.total}</TableCell>
                            <TableCell align="right"><Moment format='Do MMM YYYY'>{row.createdDate}</Moment></TableCell>
                            <TableCell align="right">
                              <Status
                                  className={
                                    row.orderState === 'Delivered'
                                        ? sent
                                        : row.orderState === 'PAYMENT_ACCEPTED'
                                        ? paid
                                        : row.orderState === 'AWAITING_PAYMENT'
                                            ? processing
                                            : row.orderState === 'CANCELLED'
                                                ? failed
                                                : ''
                                  }
                              >
                                {row.orderState}
                              </Status>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                )}
              </Table>
            </TableContainer>
          </Col>
        </Row>
      </Grid>
  );
}
