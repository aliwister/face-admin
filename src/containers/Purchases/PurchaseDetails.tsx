import React, {useReducer, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import { useAlert } from "react-alert";

import {useParams} from "react-router-dom";
import PurchaseForm from "./PurchaseForm";
import {usePurchaseQuery} from "../../codegen/generated/_graphql";

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
  let { slug } = useParams();

  const [po, setPO] = useState(0);
  const [items, setItems] = useState([]);
  const [create, setCreate] = useState(true);
  const [update, setUpdate] = useState(false);
  const [pqButton, setPQButton] = useState([]);

  const { data:dp, loading:lp, error:ep, refetch:rp } = usePurchaseQuery({variables: {id: slug}, fetchPolicy: "network-only",context: { clientName: "shopLink" }});
  const alert = useAlert();
  const classes = useStyles();

  const addToPurchase = ({id,price,quantity, productName}) => {
    setItems([
        ...items,
      {
        sequence:items.length+1,
        price: price,
        quantity: quantity,
        description: productName,
        orderItems: [{id: id}]
      }]);
  }
  if (lp)
    return <div>Loading</div>

  return (
    <>
      <Heading>Purchase PO {dp.purchase.id}</Heading>
      <PurchaseForm purchase={dp.purchase}/>
    </>
  );
}
