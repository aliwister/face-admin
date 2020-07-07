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


export default function OrderForm({}) {
  //const [updatePurchaseMutation] = useMutation(UPDATE_PURCHASE,{ context: { clientName: "shopLink" }});
  const [po, setPO] = useState(0);
  const [items, setItems] = useState([]);
  const [create, setCreate] = useState(true);
  const [update, setUpdate] = useState(false);
  const [pqButton, setPQButton] = useState([]);
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [{ name: "useFieldArray", nested: [{ name: "nested" }] }]
    }
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "test"
    }
  );

  const onSubmit = data => console.log("data", data);

  function handleAdd(q) {

  }

  //const onClose = () => setNewpurchasedialog(false);

  const merchantsx =  [{name:"ali", id:1},{name:"mas",id:2}];
  // @ts-ignore
  // @ts-ignore

  const headCells = [
    { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'lineTotal', numeric: true, disablePadding: false, label: 'Line Total' },
  ];

  return (
      <Grid container>
      <Grid item xs={12} md={12}>
        <form onSubmit={handleSubmit(onSubmit)}>


          <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Line Total</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {fields.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                  <ProductNameInput
                    name={`test[${index}].id`}
                    defaultValue={`${item.id}`}
                    ref={register({})}
                  />
                  <ProductNameInput
                    name={`test[${index}].name`}
                    defaultValue={`${item.name}`}
                    ref={register({})}
                  />
                  </TableCell>
                  <TableCell>
                  <Input
                    name={`test[${index}].quantity`}
                    defaultValue={`${item.quantity}`}
                    ref={register({})}
                  />
                  </TableCell>
                  <TableCell>
                  <Input
                    name={`test[${index}].price`}
                    defaultValue={`${item.price}`}
                    ref={register({})}
                  />
                  </TableCell>
                  <TableCell>
                  <Input
                    name={`test[${index}].ref`}
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
            <button
              type="button"
              onClick={() => {
                append({
                  name: "append",
                  nested: [{ name: "append nested by parent" }]
                });
              }}
            >
              append
            </button>
            <button type="button" onClick={() => prepend({ name: "prepend" })}>
              prepend
            </button>
            <button
              type="button"
              onClick={() => insert(parseInt("2", 10), { name: "insert" })}
            >
              insert at
            </button>

            <button type="button" onClick={() => swap(1, 2)}>
              swap
            </button>

            <button type="button" onClick={() => move(1, 4)}>
              move
            </button>

            <button type="button" onClick={() => remove(1)}>
              remove at
            </button>
          </section>

          <input type="submit" />
        </form>
      </Grid>
      </Grid>
  );
}
