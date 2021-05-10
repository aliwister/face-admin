import React, { useState } from 'react';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { useAlert } from "react-alert";
import {OrderInfoPaper} from "./Orders.style";

import TableFooter from "@material-ui/core/TableFooter";
import Typography from "@material-ui/core/Typography";
import {PaymentFormDialog} from "./components/PaymentFormDialog";
import {RefundFormDialog} from "./components/RefundFormDialog";
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import {
  useAddPaymentMutation,
  useRefundPaymentMutation,
  useVoidPaymentMutation
} from "../../codegen/generated/_graphql";

export default function Payment({order, refetch}) {
  const [b1,setB1] = useState(true);

  const [paymentDialog,setPaymentdialog] = useState(false);
  const [refundDialog,setRefunddialog] = useState(false);
  const [voidDialog,setVoidDialog] = useState(false);
  const [activePayment,setActivepayment] = useState({});

  const [addPaymentMutation] = useAddPaymentMutation({context: { clientName: "shopLink" }});
  const [addRefundMutation] = useRefundPaymentMutation({context: { clientName: "shopLink" }});
  const [voidPaymentMutation] = useVoidPaymentMutation({context: { clientName: "shopLink" }});

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
      data: { refundPayment },
    }: any = await addRefundMutation({
      variables: {id: order.id, ...formData}
    });
    if(refundPayment)  {
      handleClose();
      alert.success("Refund added");
      refetch();
    }
  }

  const onVoidSubmit = async formData => {
    setB1(false);
    //console.log(formData);
    const {
      data: { voidPayment },
    }: any = await voidPaymentMutation({
      variables: {id: activePayment['id']}
    });
    if(voidPayment)  {
      handleClose();
      alert.success(voidPayment.value);
      refetch();
    }
  }

  const handleClose = () => {
    setPaymentdialog(false);
    setRefunddialog(false);
    setVoidDialog(false);
  }
  const handlePaymentDialogOpen = () => setPaymentdialog(true);
  const handleRefundDialogOpen = (payment) => {
    setActivepayment(payment);
    setRefunddialog(true);
  }
  const handleVoidDialogOpen = (payment) => {
    setActivepayment(payment);
    setVoidDialog(true);
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
                    <TableCell align="left">{row.settlementDate?row.settlementDate.substr(0,10):""}</TableCell>
                    <TableCell align="left">{row.voided?<BlockIcon/>:<CheckIcon/>}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" size="small" onClick={() => handleRefundDialogOpen(row)}>Refund</Button>
                      {!row.processedDate && !row.voided && <Button variant="contained" size="small" onClick={() => handleVoidDialogOpen(row)}>Void</Button>}
                    </TableCell>
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
          <RefundFormDialog onSubmit={onRefundSubmit} open={refundDialog} onClose={handleClose} payment={activePayment} order={order} />
          <ConfirmDialog title="Close Shipment?" open={voidDialog} cancel={handleClose} onConfirm={onVoidSubmit}>
            Are you sure you want to void payment <>{activePayment['id']}</> ?
          </ConfirmDialog>}
        </OrderInfoPaper>
{/*        <Snackbar open={snack} autoHideDuration={6000} onClose={()=>{setSnack(false)}}>
            <Alert onClose={handleClose} severity="success">
                This is a success message!
            </Alert>
        </Snackbar>*/}
    </>
  );
}
