import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper} from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {useMutation, useQuery} from "@apollo/react-hooks";
import gql from 'graphql-tag';
import {useHistory} from "react-router-dom";
import OrderForm from "../../OrderForm/OrderForm";
import NewPurchaseDialog from "./NewPurchaseDialog";
import {MerchantLookup} from "../../../components/Merchant/MerchantsLookup";
import PurchaseQueue from "./PurchaseQueue";
import TableForm from "../../OrderForm/TableForm";
const CREATE_PURCHASE = gql`
  mutation createPurchase($dto: PurchaseInput) {
    createPurchase(dto: $dto) {
      id
    }
  }
`;
export default function PurchaseForm({purchase, savePurchase, setMerchant}) {
  const [newPurchaseDialog, setNewpurchasedialog] = useState(purchase.subtotal);

  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      items: purchase.purchaseItems.map(({id, orderItems, price, quantity, description, sequence, productId, sku}) => ({
        id: id,
        pid: id,
        ref: (orderItems.length > 0)?orderItems[0].id:"",
        orderId: (orderItems.length > 0)?orderItems[0].orderId:"",
        price,
        quantity,
        description,
        sequence,
        productId,
        sku
      })),
      deliveryTotal: purchase.deliveryTotal,
      taxesTotal: purchase.taxesTotal,
      discountTotal: purchase.discountTotal,
      ref: purchase.ref,
      currency: {value: purchase.currency, label: purchase.currency}
    }});
  const { fields, append, remove} = useFieldArray(
    {
      control,
      name: "items"
    }
  );


  const onSubmit = data => {
    console.log("data", data);
    return savePurchase(data);
  }
  const addToPurchase = ({id,cost,quantity, productName,productId, orderId, sku}) => {
    append(
      {
        pid: "",
        productId: productId,
        price: cost,
        quantity: quantity,
        description: productName,
        orderId: orderId,
        ref: id,
        sku: sku
      });
  }

  function removeItem(index) {
    console.log(index);
    console.log(fields);
    remove(index);
  }

  function onClose() {
    setNewpurchasedialog(false);
  }

  return (
    <Grid container xs={12} md={12}>
      <NewPurchaseDialog open={newPurchaseDialog} onClose={onClose} />
      <Grid item md={4}>
        <MerchantLookup setMerchant={setMerchant} selected={purchase.merchantObj}/>
      </Grid>
      <Grid item md={3}>
        <TextField size="small" id="outlined-basic" label="Shipping Instructions" variant="outlined" value={purchase.shippingInstructions} />
      </Grid>

      <Grid item md={3} style={{textAlign:'right'}}>
      <Button variant="contained" color="primary" size="large" onClick={()=> setNewpurchasedialog(true)}>
        New Purchase
      </Button>
      </Grid>
    <TableForm register={register} control={control} onSubmit={handleSubmit(onSubmit)} fields={fields} remove={removeItem} watch={watch} order={purchase}/>
    <PurchaseQueue handleAdd={addToPurchase}/>
    </Grid>
  );
}