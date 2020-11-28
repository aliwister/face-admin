import React, {useReducer, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import { useAlert } from "react-alert";

import {useParams} from "react-router-dom";
import PurchaseForm from "./components/PurchaseForm";
import {usePurchaseQuery} from "../../codegen/generated/_graphql";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import Button from "@material-ui/core/Button";

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
  const [updatePurchaseMutation] = useMutation(UPDATE_PURCHASE,{ context: { clientName: "shopLink" }});
  const [merchant, setMerchant] = useState({});
  const [create, setCreate] = useState(true);
  const [update, setUpdate] = useState(false);
  const [pqButton, setPQButton] = useState([]);

  const { data, loading, error, refetch } = usePurchaseQuery({variables: {id: slug}, fetchPolicy: "network-only",context: { clientName: "shopLink" }});
  const alert = useAlert();
  const classes = useStyles();

  const savePurchase = async (form) => {
    console.log(form);
    console.log(merchant);

    console.log(merchant['id']);
    //return;

    const dto = {
      id: slug,
      deliveryTotal: form.deliveryTotal,
      taxesTotal: form.taxesTotal,
      discountTotal: form.discountTotal,
      merchantId: merchant['id'],
      ref: form.ref,
      currency: form.currency.value
    }

    const purchaseItems = form.items.map(({pid, productId, description, price, quantity, ref}) => ({
      id: pid===""?null:pid,
      orderItems: [{id: ref}],
      price,
      quantity,
      description,
      productId
    }));
    //console.log(dto);
    //console.log(purchaseItems);

    const {
      data: { updatePurchase },
    }: any = await updatePurchaseMutation({
      variables: { dto, items: purchaseItems },
    });
    if(updatePurchase)  {
      alert.success("Purchase saved successfully");
      //setPO(createPurchase.id);
      setCreate(true);

      //setItems(updatePurchase.items);
    }
  }



  if (loading)
    return <div>Loading</div>


  return (
    <>
      <h1>Purchase <Button variant="contained" color="secondary" onClick={()=>{refetch({id: slug})}}>
        Refresh
      </Button> </h1>
      <Heading>PO {data.purchase.id}</Heading>
      <PurchaseForm purchase={data.purchase} savePurchase={savePurchase} setMerchant={setMerchant}/>

    </>
  );
}
