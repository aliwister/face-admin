import React, { useState } from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import {
  Grid,
  Row as Rows,
  Col as Column,
} from '../../components/FlexBox/FlexBox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import { useAlert } from "react-alert";
import { TableRow, TableHead, TableContainer, Table, Paper,
  TableCell,Typography,
  TableBody } from '@material-ui/core';
import Image from "../../components/Image/Image";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
const CREATE_PURCHASE = gql`
  mutation createPurchase($dto: PurchaseInput) {
    createPurchase(dto: $dto) {
      id
    }
  }
`;
const UPDATE_PURCHASE = gql`
  mutation updatePurchase($dto: PurchaseInput, $items: [PurchaseItemInput]) {
    updatePurchase(dto: $dto, items: $items) {
      id
    }
  }
`;

const PURCHASE_QUEUE = gql`
query purchaseQueue {
  purchaseQueue {
    id
    productName
    quantity
    price
    image
  }
}
`;
const PURCHASE = gql`
query purchase($id: Long) {
  purchase(id: $id) {
    id
    items {
      id
      sequence
      price
      quantity
      description
      orderItemId
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


export default function Purchases() {
  const [createPurchaseMutation] = useMutation(CREATE_PURCHASE);
  const [updatePurchaseMutation] = useMutation(UPDATE_PURCHASE);
  const [po, setPO] = useState(0);
  const [items, setItems] = useState([]);
  const [create, setCreate] = useState(true);
  const [update, setUpdate] = useState(false);
  const [pqButton, setPQButton] = useState([]);

  const { data, loading, error, refetch } = useQuery(PURCHASE_QUEUE, {fetchPolicy: "network-only"});
  const { data:dp, loading:lp, error:ep, refetch:rp } = useQuery(PURCHASE, {fetchPolicy: "network-only"});
  const alert = useAlert();
  const classes = useStyles();

  const createPurchase = async () => {
    const dto = {merchantId: 1, currency: "OMR"};
    const {
      data: { createPurchase },
    }: any = await createPurchaseMutation({
      variables: { dto: dto },
    });
    if(createPurchase)  {
      alert.success(createPurchase.id);
      setPO(createPurchase.id);
      setCreate(false);
      setItems([]);
    }
  }

  const savePurchase = async () => {
    const dto = {id: po, merchantId: 1, currency: "OMR"};
    const {
      data: { updatePurchase },
    }: any = await updatePurchaseMutation({
      variables: { dto, items },
    });
    if(updatePurchase)  {
      alert.success("Purchase saved successfully");
      //setPO(createPurchase.id);
      setCreate(true);
      //setItems(updatePurchase.items);
    }
  }

  const addToPurchase = ({id,price,quantity, productName}) => {
    setItems([
        ...items,
      {
        sequence:items.length+1,
        price: price,
        quantity: quantity,
        description: productName,
        orderItemId: id
      }]);
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  if(loading) {
    return <div>Loading</div>
  }

  return (

      <Grid item xs={12} md={12}>
        <Heading>Purchases</Heading>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={po}/>

        <Button variant="contained" color="primary" onClick={createPurchase} disabled={!create}>
          Create New Purchase
        </Button><Button variant="contained" color="primary" onClick={savePurchase}>
          Save Purchase
        </Button>
        <Typography variant="h6">Purchase Items</Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(q => (
                  <TableRow key={q.orderId}>
                    <TableCell align="right">{q.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {q.description}
                    </TableCell>
                    <TableCell align="right">{q.quantity}</TableCell>
                    <TableCell align="right">{q.price}</TableCell>
                    <TableCell align="right">
                      <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>

                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Link</TableCell>
              </TableRow>
            </TableHead>
            {data && <TableBody>
              {data.purchaseQueue.map(q => (
                  <TableRow key={q.id}>
                    <TableCell align="right">{q.id}</TableCell>
                    <TableCell align="right"><Image url={q.image} className="product-image" style={{maxWidth: '70px'}} /></TableCell>
                    <TableCell component="th" scope="row">
                      {q.productName}
                    </TableCell>
                    <TableCell align="right">{q.quantity}</TableCell>
                    <TableCell align="right">{q.price}</TableCell>
                    <TableCell align="right">
                      <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.button}
                          startIcon={<SaveIcon />}
                          onClick={()=>addToPurchase(q)}
                      />
                    </TableCell>

                  </TableRow>
              ))}
            </TableBody>}
          </Table>
        </TableContainer>
    </Grid>
  );
}
