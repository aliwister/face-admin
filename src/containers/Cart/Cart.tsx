import React, {useEffect, useReducer, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';


import gql from 'graphql-tag';


const CREATE_CART = gql`
  mutation createCart($cart: CheckoutCartInput) {
    createCart(cart: $cart) {
      id
      phone
      email
      secureKey
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

export default function Cart() {
 return (
   <></>
  );
}
