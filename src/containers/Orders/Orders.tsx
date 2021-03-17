import React, { useState } from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import Moment from 'react-moment';


import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import Checkbox from '../../components/CheckBox/CheckBox';
import { useAlert } from "react-alert";
import {
  OrderInfoPaper
} from './Orders.style';
import NoResult from '../../components/NoResult/NoResult';
import { Link } from 'react-router-dom';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import {LoadOrderForm} from "./components/LoadOrderForm";
import  Select from "react-select";
import {theme} from "../../theme";
import {ORDER_STATES} from "./components/Constants";
import {useForm} from "react-hook-form";
import TimeAgo from 'react-timeago';

const GET_ORDERS = gql`
  query ordersA($state: [OrderState], $offset: Int = 0, $limit: Int = 25, $searchText: String, $balance: Boolean) {
    ordersA(state: $state, offset: $offset, limit: $limit, searchText: $searchText, balance: $balance) {
      total,
      hasMore,
      items {
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
      cartId
      balance
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
        po
      }
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
  const [status, setStatus] = useState([ORDER_STATES[4]]);
  const [balance, setBalance] = useState(false);
  const [limit, setLimit] = useState([]);
  const [search, setSearch] = useState([]);
  const alert = useAlert();
  const classes = useStyles();

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {}
  });

  const arrayToObject = (array,prop) =>
    array.map(t => t[prop]);

  const { data, error, refetch, fetchMore } = useQuery(GET_ORDERS, {
    variables: {
      state: arrayToObject(status, 'value'),
      limit: 15,
      searchText: "",
      balance: balance
    },
    fetchPolicy: "network-only",
    context: { clientName: "shopLink" }
  });
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function handleStatus(value) {
    console.log(value);
    setStatus(value);

    if (value && value.length) {
      refetch({
        state: arrayToObject(value, 'value'),
        limit: 15, //limit.length ? limit[0].value : null,
        searchText: "",
        balance: balance
      });
    } else {
      refetch({ state: [], limit:10, searchText:"", balance:balance });
    }
  }
  function handleSearch(data) {
    const searchText = data.search;
    if (searchText && searchText.length) {
      refetch({
        state: arrayToObject(status, 'value'),
        limit: 15, //limit.length ? limit[0].value : null,
        searchText: searchText,
        balance: balance,
      });
    } else {
      refetch({ state: [], limit:10, searchText:searchText, balance:balance });
    }
  }
  function loadMore() {
    fetchMore({
      variables: {
        offset: data.ordersA.items.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          ordersA: {
            // @ts-ignore
            __typename: prev.ordersA.__typename,
            // @ts-ignore
            items: [...prev.ordersA.items, ...fetchMoreResult.ordersA.items],
            // @ts-ignore
            hasMore: fetchMoreResult.ordersA.hasMore,
          },
        });
      },
    });
  }

/*  function handleLimit({ value }) {
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
  }*/

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
    <Grid container spacing={1}>
      <Grid item  md={5} >
        <Select
          value={status}
          onChange={handleStatus}
          options={ORDER_STATES}
          isMulti={true}
        />
        <form onSubmit={handleSubmit(handleSearch)}>
          <TextField name="search" inputRef={register({required: true, minLength: 2, maxLength: 12})} style={{width:'320px'}}></TextField>
          <Checkbox
            checked={balance}
            onChange={() => setBalance(!balance)}
            overrides={{
              Checkmark: {
                style: {
                  borderWidth: '2px',
                  borderRadius: '4px',
                },
              },
            }}
          >Balance Only</Checkbox>
          <Button size="medium" variant="contained" color="primary" type="submit" >Go</Button>
        </form>
      </Grid>
      <Grid  item  md={4} >
      </Grid>
      <Grid item  md={3} style={{textAlign: 'right'}}>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>ID</TableCell>
                <TableCell align="left">Ref</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Order Total</TableCell>
                <TableCell align="center">Balance</TableCell>
                <TableCell align="center">Paid Via</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            {data && data.ordersA.items.length && (
              <TableBody>

                {data.ordersA.items.map(row => (
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
                      <Link to={`order-details/${row.reference}`}>{row.id}</Link>
                    </TableCell>
                    <TableCell align="left">{row.reference}</TableCell>

                    <TableCell align="left">{row.deliveryAddress.firstName} {row.deliveryAddress.lastName}</TableCell>
                    <TableCell align="right">{row.total} <sup>OMR</sup> </TableCell>
                    <TableCell align="right">{row.balance}</TableCell>

                    <TableCell align="center">{row.paymentMethod}</TableCell>
                    <TableCell align="right"> <TimeAgo date={row.createdDate} /></TableCell>
                    <TableCell align="right">
                      {row.orderState}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {data && data.ordersA && data.ordersA.hasMore && (
          <Button onClick={loadMore}>Load More</Button>
        )}
      </Grid>
    </Grid>
  );
}
