import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { useAlert } from "react-alert";
import Paper from "@material-ui/core/Paper";
import {OrderInfoPaper} from "./Orders.style";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Image from "../../components/Image/Image";
import TableFooter from "@material-ui/core/TableFooter";
import {errorHandler} from "../../api/config";
import Typography from "@material-ui/core/Typography";
import {PaymentFormDialog} from "./components/PaymentFormDialog";
import {RefundFormDialog} from "./components/RefundFormDialog";

//const


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
mutation addPayment($id: ID, $amount: BigDecimal, $method: String, $authCode: String) {
  addPayment(id: $id, amount: $amount, method: $method, authCode: $authCode) {
    paymentMethod
    amount
  }
}
`;

const ADD_REFUND_MUTATION = gql`
mutation refundPayment($id: ID, $amount: BigDecimal, $authCode: String, $bankName: String, $bankAccountNumber: String, $bankOwnerName: String, $ref: Long, $paymentMethod: String) {
  refundPayment(id: $id, amount: $amount, ref: $ref, authCode: $authCode, bankName: $bankName, bankAccountNumber: $bankAccountNumber, bankOwnerName: $bankOwnerName, paymentMethod: $paymentMethod)  {
    paymentMethod
    amount
  }
}
`;



export default function Payment({order, refetch}) {
  const [b1,setB1] = useState(true);

  const [paymentDialog,setPaymentdialog] = useState(false);
  const [refundDialog,setRefunddialog] = useState(false);
  const [activePayment,setActivepayment] = useState({});


  const [addPaymentMutation] = useMutation(ADD_PAYMENT_MUTATION,{context: { clientName: "shopLink" }});
  const [addRefundMutation] = useMutation(ADD_REFUND_MUTATION,{context: { clientName: "shopLink" }});


  const alert = useAlert();


  const onSubmit = async formData => {
    setB1(false);
    const {
      data: { addPayment },
    }: any = await addPaymentMutation({
      variables: {id: order.id, ...formData}
    });
    if(addPayment)  {
      handleClose();
      alert.success("Payment added");
      refetch();
    }
  }
  const onRefundSubmit = async formData => {
    setB1(false);
    //console.log(formData);
    const {
      data: { addRefund },
    }: any = await addRefundMutation({
      variables: {id: order.id, ...formData}
    });
    if(addRefund)  {
      handleClose();
      alert.success("Payment added");
      refetch();
    }
  }


  const handleClose = () => {
    setPaymentdialog(false);
    setRefunddialog(false);
  }
  const handlePaymentDialogOpen = () => setPaymentdialog(true);
  const handleRefundDialogOpen = (payment) => {
    setActivepayment(payment);
    setRefunddialog(true);
  }

  return (
    <>

        <OrderInfoPaper>
          <Typography variant="caption">Payments</Typography>
          <Table  size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Authcode</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Processed</TableCell>
              </TableRow>
            </TableHead>
            {order && order.payments && (
              <TableBody>

                {order.payments.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.createdDate.substr(0,10)}</TableCell>
                    <TableCell align="left">{row.paymentMethod}</TableCell>
                    <TableCell align="left">{row.authCode}</TableCell>
                    <TableCell align="left">OMR {row.amount}</TableCell>
                    <TableCell align="left">{row.processedDate?row.processedDate.substr(0,10):""}</TableCell>
                    <TableCell align="right"><Button variant="contained" size="small" onClick={() => handleRefundDialogOpen(row)}>Refund</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>



            )}
            <TableFooter>


              <TableRow>
                <TableCell component="th" scope="row">
                </TableCell>
                <TableCell align="left">Balance</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">OMR {order.balance}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>

          </TableFooter>

          </Table>
          <Button variant="contained" color="primary" onClick={handlePaymentDialogOpen}>New Payment</Button>

          <PaymentFormDialog onSubmit={onSubmit} open={paymentDialog} onClose={handleClose}/>
          <RefundFormDialog onSubmit={onRefundSubmit} open={refundDialog} onClose={handleClose} payment={activePayment}/>

        </OrderInfoPaper>
{/*        <Snackbar open={snack} autoHideDuration={6000} onClose={()=>{setSnack(false)}}>
            <Alert onClose={handleClose} severity="success">
                This is a success message!
            </Alert>
        </Snackbar>*/}
    </>
  );
}
