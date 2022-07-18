import React, {useEffect, useReducer, useState} from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import {
  Grid,
} from '../../components/FlexBox/FlexBox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm, useFieldArray } from "react-hook-form";

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { useAlert } from "react-alert";
import {  Typography, Checkbox
   } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import {Alert} from "@material-ui/lab";
import {useFindByKeywordQuery, useHashtagsQuery, useCustomerQuery} from "../../codegen/generated/_graphql";
import {SearchResults} from "./SearchResults";
import TableForm from "../OrderForm/TableForm";
import {Link} from "react-router-dom";

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
