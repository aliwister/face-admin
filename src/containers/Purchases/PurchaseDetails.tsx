import React, {useReducer, useState} from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import {
  Grid,
} from '../../components/FlexBox/FlexBox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import { useAlert } from "react-alert";
import {
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
import {useParams} from "react-router-dom";
import PurchaseForm from "./PurchaseForm";
const CREATE_PURCHASE = gql`
  mutation createPurchase($dto: PurchaseInput) {
    createPurchase(dto: $dto) {
      id
    }
  }
`;
const PURCHASE = gql`
query purchase($id: ID) {
  purchase(id: $id) {
    id
    deliveryTotal
    currency
    invoiceDate
    subtotal
    taxesTotal
    discountTotal
    total
    merchantObj {
      id
      name
    }
    purchaseItems {
      id
      sequence
      price
      quantity
      description
      orderItemId
      orderId
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

function reducer(state, action) {
  switch (action.type) {
    case 'NEXT':;
      return {step: state.step + 1}
    case 'PREV':
      return {step: state.step - 1};
    case 'SET_CARRIER':
      return {
        ...state,
        step: state.step+1,
        carrier : action.payload
      }
    default:
      return state;
  }
}
export default function PurchaseDetails(props) {
  console.log('in purchase details')
  let { slug } = useParams();
  console.log(slug);
  const [createPurchaseMutation] = useMutation(CREATE_PURCHASE);

  const [po, setPO] = useState(0);
  const [items, setItems] = useState([]);
  const [create, setCreate] = useState(true);
  const [update, setUpdate] = useState(false);
  const [pqButton, setPQButton] = useState([]);


  const { data:dp, loading:lp, error:ep, refetch:rp } = useQuery(PURCHASE, {variables: {id: slug}, fetchPolicy: "network-only"});
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



  return (

      <Grid item xs={12} md={12}>
        <Heading>Purchases</Heading>


        <Button variant="contained" color="primary" onClick={createPurchase} disabled={!create}>
          Create New Purchase
        </Button>
        {dp &&
            <>
              <TextField id="outlined-basic" label="PO" variant="outlined" value={dp.purchase.id}/>
              <PurchaseForm purchase={dp.purchase}/>
            </>
        }

    </Grid>
  );
}
