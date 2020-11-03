import React, {useEffect, useReducer, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';

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
import Image from "../../../components/Image/Image";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import {usePurchaseQueueQuery} from "../../../codegen/generated/_graphql";


const UPDATE_PURCHASE = gql`
  mutation updatePurchase($dto: PurchaseInput, $items: [PurchaseItemInput]) {
    updatePurchase(dto: $dto, items: $items) {
      id
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
  titleField: {
    width: '25ch',
    size: 'small'
  },
  quantityField: {
    width: '5ch',
  },

}));


export default function PurchaseQueue({handleAdd}) {

  const { data, loading, error, refetch } = usePurchaseQueueQuery({fetchPolicy: "network-only", context: { clientName: "shopLink" }});


  const alert = useAlert();
  const classes = useStyles();

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  if(loading) {
    return <div>Loading</div>
  }
  return (
      <Grid container xs={12} md={12}>
        <Typography variant="h6">PurchaseQueue</Typography>
        <Button variant="contained" color="secondary" onClick={()=>{refetch({})}}>
          Refresh
        </Button>

        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price (OMR/USD)</TableCell>
                <TableCell align="right">Link</TableCell>
                <TableCell align="right">Order</TableCell>
              </TableRow>
            </TableHead>
            {data && <TableBody>
              {data.purchaseQueue.map(q => (
                  <TableRow key={q.id}>
                    <TableCell align="right">{q.id}</TableCell>
                    <TableCell align="right"><Image url={q.image} className="product-image" style={{maxWidth: '70px'}} /></TableCell>
                    {q.url ?
                        <TableCell component="th" scope="row">
                          <a href={`${q.url}`} target="_blank">
                            {q.productName} <small>{q.attributes}</small>
                          </a>
                        </TableCell> : <TableCell component="th" scope="row">
                          {q.productName}<small>{q.attributes}</small>
                        </TableCell>
                    }
                    <TableCell align="right">{q.quantity}</TableCell>
                    <TableCell align="right">{q.price} / {Math.round(q.price * 260)/100}</TableCell>
                    <TableCell align="right">
                      <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.button}
                          startIcon={<SaveIcon />}
                          onClick={()=>handleAdd(q)}
                      />
                    </TableCell>
                    <TableCell align="right"><Link to={`/order-details/${q.orderId}`} target={"_blank"}>{q.orderId}</Link></TableCell>
                  </TableRow>
              ))}
            </TableBody>}
          </Table>
        </TableContainer>
      </Grid>
  );
}
