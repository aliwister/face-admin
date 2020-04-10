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
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import {LoadOrderForm} from "./components/LoadOrderForm";
import  Select from "react-select";
import {theme} from "../../theme";
import {ORDER_STATES} from "./components/Constants";

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
  const [limit, setLimit] = useState([]);
  const [search, setSearch] = useState([]);
  const alert = useAlert();
  const classes = useStyles();

  const arrayToObject = (array,prop) =>
    array.map(t => t[prop]);

  const { data, error, refetch } = useQuery(GET_ORDERS, {
    variables: {
      state: arrayToObject(status, 'value'),
      limit: 10,
      searchText: "",
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
      });
    } else {
      refetch({ state: [], limit:10, searchText:"" });
    }
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
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Payment</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            {data && data.ordersA.length && (
              <TableBody>

                {data.ordersA.map(row => (
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
                      <Link to={`order-details/${row.id}`}>{row.id}</Link>
                    </TableCell>
                    <TableCell align="left">{row.reference}</TableCell>

                    <TableCell align="left">{row.deliveryAddress.firstName} {row.deliveryAddress.lastName}</TableCell>
                    <TableCell align="right">OMR {row.total}</TableCell>

                    <TableCell align="center">{row.paymentMethod}</TableCell>
                    <TableCell align="right"><Moment format='Do MMM YYYY'>{row.createdDate}</Moment></TableCell>
                    <TableCell align="right">
                      {row.orderState}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
