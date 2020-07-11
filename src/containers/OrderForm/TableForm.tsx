import React, {useEffect, useReducer, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TitleTextField} from '../Orders/Orders.style';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import { useAlert } from "react-alert";
import {
  Grid,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  TableCell,
  Typography,
  TableBody } from '@material-ui/core';
import Image from "../../components/Image/Image";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import {useFieldArray, useForm} from "react-hook-form";
import {Input, ProductNameInput} from "./OrderForm.style";


const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  titleField: {
    width: '25ch',
    size: 'small'
  },
  quantityField: {
    width: '5ch',
  },

}));


export default function TableForm({register, fields, onSubmit, remove, watch, order }) {

  const [total, setTotal] = useState(getTotal(order));
  const [subtotal, setSubtotal] = useState(getSubtotal(order));

  const headCells = [
    { id: 'id', numeric: true, disablePadding: false, label: 'Seq/ID' },
    { id: 'productId', numeric: true, disablePadding: false, label: 'Product ID' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'lineTotal', numeric: true, disablePadding: false, label: 'Line Total' },
  ];

  const watchTotals= watch(["deliveryTotal","taxesTotal","discountTotal","items"]);
  function handleUpdate(a,b) {
    console.log('handle update');
    setSubtotal(getSubtotal(watchTotals));
    setTotal(getTotal(watchTotals));
    //setTotal(getSubtotal() + Math.round( 100*( watchTotals.deliveryTotal + watchTotals.taxesTotal - watchTotals.discountTotal)/100));
  }

  function getSubtotal(order) {
    const f = order.items?order.items:order.purchaseItems;
    return Math.round(100* f.reduce((sum,p) => sum + p.quantity * p.price, 0))/100;
  }
  function getTotal(order) {
    return Math.round( 100*( getSubtotal(order) + order.deliveryTotal*1.0 + order.taxesTotal*1.0 - order.discountTotal*1.0))/100.0;
  }

  return (
      <Grid item xs={12} md={12}>
        <form onSubmit={onSubmit}>
          <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Product Id</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Line Total</TableCell>
              <TableCell>Ref</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {fields.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell style={{width:100}}>
                    {index+1}
                    <Input
                      name={`items[${index}].pid`}
                      defaultValue={`${item.pid}`}
                      ref={register({})}
                    />
                  </TableCell>
                  <TableCell style={{width:150}}>
                    <Input
                      name={`items[${index}].productId`}
                      defaultValue={`${item.productId}`}
                      ref={register({})}
                    />
                  </TableCell>
                  <TableCell>
                  <ProductNameInput
                    name={`items[${index}].description`}
                    defaultValue={`${item.description}`}
                    ref={register({})}
                  />
                  </TableCell>
                  <TableCell style={{width:100}}>
                  <Input
                    name={`items[${index}].quantity`}
                    defaultValue={`${item.quantity}`}
                    ref={register({})}
                    onChange={(e) => handleUpdate('delivery', e.target.value)}
                  />
                  </TableCell>
                  <TableCell style={{width:100}}>
                  <Input
                    name={`items[${index}].price`}
                    defaultValue={`${item.price}`}
                    ref={register({})}
                    onChange={(e) => handleUpdate('delivery', e.target.value)}
                  />

                  </TableCell>

                  <TableCell>
                    {watchTotals.items && watchTotals.items[index] ?
                      Math.round(100* watchTotals.items[index].quantity * watchTotals.items[index].price)/100:
                      Math.round(100* item.quantity * item.price)/100
                    }
                  </TableCell>
                  <TableCell>
                    {item.orderId &&
                    <Link to={`/order-details/${item.orderId}`} target="_blank">{item.orderId}</Link>
                    }
                    <Input
                      name={`items[${index}].ref`}
                      defaultValue={`${item.ref}`}
                      ref={register({})}
                    />
                  </TableCell>
                  <TableCell>
                    <button type="button" onClick={() => remove(index)}>
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
            </TableBody>
          </Table>
          </TableContainer>
          <section>
            <ul>
              <li><label>Subtotal:</label> <input name="subtotal" disabled value={subtotal}/></li>
              <li>Delivery: <input name="deliveryTotal" ref={register({})}  onChange={(e) => handleUpdate('delivery', e.target.value)}/></li>
              <li>Taxes: <input  name="taxesTotal" ref={register({})} onChange={(e) => handleUpdate('taxes', e.target.value)}/></li>
              <li>Discount: <input name="discountTotal" ref={register({})} onChange={(e) => handleUpdate('discount', e.target.value)}/></li>
              <li>Total: <input  name="total" disabled value={total}/></li>
            </ul>
          </section>
          <Button type="submit" variant="contained" color="primary" size="large">
            Save
          </Button>
        </form>
      </Grid>
  );
}
