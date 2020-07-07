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


export default function TableForm({register, fields, onSubmit, remove }) {


  //const onSubmit = data => console.log("data", data);

  function handleAdd(q) {

  }

  //const onClose = () => setNewpurchasedialog(false);

  const merchantsx =  [{name:"ali", id:1},{name:"mas",id:2}];
  // @ts-ignore
  // @ts-ignore

  const headCells = [
    { id: 'id', numeric: true, disablePadding: false, label: 'Seq/ID' },
    { id: 'productId', numeric: true, disablePadding: false, label: 'Product ID' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'lineTotal', numeric: true, disablePadding: false, label: 'Line Total' },
  ];

  function subtotal() {
    return fields.length+"";
  }


  return (

      <Grid item xs={12} md={12}>
        <form onSubmit={onSubmit}>
          <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Ref</TableCell>
              <TableCell>Line Total</TableCell>
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
                  />
                  </TableCell>
                  <TableCell style={{width:100}}>
                  <Input
                    name={`items[${index}].price`}
                    defaultValue={`${item.price}`}
                    ref={register({})}
                  />

                  </TableCell>

                  <TableCell>
                    {Math.round(100* item.quantity * item.price)/100}
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
              <li><label>Subtotal:</label> <input name="subtotal" disabled value={subtotal()}/></li>
              <li>Delivery: <input name="deliveryTotal" ref={register({})}/></li>
              <li>Taxes: <input  name="taxesTotal" ref={register({})}/></li>
              <li>Discount: <input name="discountTotal" ref={register({})}/></li>
              <li>Total: <input  name="total" disabled/></li>
            </ul>
          </section>
          <Button type="submit" variant="contained" color="primary" size="large">
            Save
          </Button>
        </form>
      </Grid>
  );
}
