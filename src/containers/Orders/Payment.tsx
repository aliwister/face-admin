import React, { useState } from 'react';
import { useAlert } from "react-alert";
import { useForm } from 'react-hook-form';
import {
  Grid,
  Row,
  Col,
} from '../../components/FlexBox/FlexBox';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import Button from "../../components/Button/Button";
import Input from '../../components/Input/Input';
import Select from "../../components/Select/Select";

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

export default function Payment({orderId, orderRef}) {
  const [b1,setB1] = useState(true);
  const [b2,setB2] = useState(true);
  const [b3,setB3] = useState(true);
  const [amount, setAmount] = useState([]);
  const [method, setMethod] = useState(false);
  const [auth, setAuth] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [addPaymentMutation] = useMutation(ADD_PAYMENT_MUTATION);
  const [sendOrderLevelEmailMutation] = useMutation(SEND_ORDER_EMAIL);
  const [sendPaymentSmsMutation] = useMutation(SEND_PAYMENT_SMS);
  const alert = useAlert();

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

  const onSendSms = async data => {
    console.log(data);
    setB3(false);
    const {
        data: { sendPaymentSms },
    }: any = await sendPaymentSmsMutation({
        variables: {id: orderId}
    });
    if(sendPaymentSms)  {
        alert.success(sendPaymentSms.value);
    }
  }
  /*const { data, loading, error, refetch } = useQuery(GET_PAYMENTS, {
    variables: {
      id: slug
    },
    fetchPolicy: "network-only"
  });

  //const []

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  if (loading)
    return <div>Loading </div>
*/
  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <select name="method" ref={register({ required: true })}>
                <option value="POS">POS</option>
                <option value="CHECKOUTCOM">CHECKOUTCOM</option>
                <option value="BMB">Bank Transfer</option>
                <option value="CASH">CASH</option>
            </select>
            <Input type="text" placeholder="Amount" name="Amount" onChange={e=>setAmount(e.target.value)} useRef={register({required: true, max: 1000, min: 1, maxLength: 5})} />
            <Input type="text" placeholder="Auth Code" name="Auth Code" onChange={e=>setAuth(e.target.value)} useRef={register({required: true, maxLength: 6, pattern: /^\S+@\S+$/i})} />
            <Button type="submit" disabled={!b1}>Add Payment</Button>
        </form>
        <Button onClick={onSendSms} disabled={!b3}>Contact By SMS</Button>
        <Button onClick={onSendOrderCreateEmail} disabled={!b2}>Send Order Confirmation</Button>
    </>
  );
}
