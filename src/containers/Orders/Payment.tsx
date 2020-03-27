import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Snackbar} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { useAlert } from "react-alert";
import Paper from "@material-ui/core/Paper";
import {OrderInfoPaper} from "./Orders.style";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";

//const

const SEND_ORDER_EMAIL = gql`
mutation sendOrderLevelEmail($id:ID, $template:String) {
    sendOrderLevelEmail(id: $id, template: $template) {
        value
    } 
}
`;

const SEND_PAYMENT_SMS = gql`
mutation sendPaymentSms($id: ID, $mobile: String) {
  sendPaymentSms(id:$id, mobile:$mobile) {
    value
  }
}
`;

const GET_PAYMENTS = gql`
mutation addPayment($id: ID, $amount: BigDecimal, $method: String) {
  addPayment(id: $id, amount: $amount, method: $method) {
    paymentMethod
    amount
  }
}
`;

const ADD_PAYMENT_MUTATION = gql`
mutation addPayment($id: ID, $amount: BigDecimal, $method: String) {
  addPayment(id: $id, amount: $amount, method: $method) {
    paymentMethod
    amount
  }
}
`;

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textbox: {
        width: 120,
        margin: theme.spacing(1)
    }
}));

export default function Payment({orderId, orderRef}) {
  const [b1,setB1] = useState(true);
  const [b2,setB2] = useState(true);

  const [amount, setAmount] = useState([]);
  const [snack, setSnack] = useState(false);
  const [method, setMethod] = useState(false);
  const [auth, setAuth] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [addPaymentMutation] = useMutation(ADD_PAYMENT_MUTATION);
  const [sendOrderLevelEmailMutation] = useMutation(SEND_ORDER_EMAIL);
  const [sendPaymentSmsMutation] = useMutation(SEND_PAYMENT_SMS);
  const alert = useAlert();
  const classes = useStyles();

  const onSubmit = async data => {
    console.log(data);
    setB1(false);
    const {
      data: { addPayment },
    }: any = await addPaymentMutation({
      variables: {id: orderId, amount, method:data.method}
    });
    if(addPayment)  {
      alert.success("Payment added");
    }
  }

  const onSendOrderCreateEmail = async data => {
    console.log(data);
    setB2(false);
    const {
        data: { sendOrderLevelEmail },
    }: any = await sendOrderLevelEmailMutation({
        variables: {id: orderId, template: "NEW_ORDER"}
    });
    if(sendOrderLevelEmail)  {
        alert.success("Payment added");
    }
  }


  return (
    <>
        <OrderInfoPaper>
        <form onSubmit={handleSubmit(onSubmit)}>

            <TextField variant="filled" placeholder="Amount" name="Amount" className={classes.textbox} inputRef={register({required: true, max: 1000, min: 1, maxLength: 5})} />
            <TextField variant="filled" type="text" placeholder="Auth Code" name="Auth Code" className={classes.textbox} inputRef={register({required: true, maxLength: 6, pattern: /^\S+@\S+$/i})} />
            <FormControl variant="filled" className={classes.formControl}>
                <Select native name="method" inputRef={register({ required: true })}>
                    <option value="POS">POS</option>
                    <option value="CHECKOUTCOM">CHECKOUTCOM</option>
                    <option value="BMB">Bank Transfer</option>
                    <option value="CASH">CASH</option>
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" type="submit" size="large" disabled={!b1}>Add</Button>
        </form>
        <Button onClick={onSendOrderCreateEmail} disabled={!b2}>Send Order Confirmation</Button>
        </OrderInfoPaper>
{/*        <Snackbar open={snack} autoHideDuration={6000} onClose={()=>{setSnack(false)}}>
            <Alert onClose={handleClose} severity="success">
                This is a success message!
            </Alert>
        </Snackbar>*/}

    </>
  );
}
