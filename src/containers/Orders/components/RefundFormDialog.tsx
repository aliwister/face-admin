import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import {OrderInfoPaper} from "../Orders.style";
import React from "react";
import {useForm} from "react-hook-form";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import { useAlert } from "react-alert";
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  textBox: {
    width: 200,
    margin: theme.spacing(1)
  }
}));

export const RefundFormDialog = ({open, onSubmit, onClose, payment, order}) =>{
  const alert = useAlert();
  const { register, handleSubmit, errors } = useForm({defaultValues: {
    paymentMethod: payment.paymentMethod,
    amount: -1*order.balance
  }});
  console.log(payment);
  const classes = useStyles();
  //console.log(payment)
  const formSubmit = async (data) => {

    console.log(data);
    if(data.amount <= 0) {
      alert.error("Cannot refund negative or 0");
      return;
    }

    let refund = {...data, amount : -1*data.amount};

    refund.ref = payment.id;
    return onSubmit(refund);
  }


  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
    <form onSubmit={handleSubmit(formSubmit)}>
      <DialogTitle id="form-dialog-title">Refund Amount</DialogTitle>
      <DialogContent>
      <TextField variant="filled" size="small" placeholder="Amount" name="amount" className={classes.textBox} inputRef={register({required: true, max: 1500, min:0, maxLength: 5})} />
      <br/>
      <TextField variant="filled" size="small" type="text" placeholder="Auth Code" name="authCode" value={payment.authCode} className={classes.textBox} inputRef={register({required: true, maxLength: 10})} />
      <br/>
        <FormControl variant="filled" size="small" className={classes.formControl}>
          <Select native name="paymentMethod" inputRef={register({ required: true })} defaultValue={payment.paymentMethod}>
            <option value="POS">POS</option>
            <option value="checkoutcom">Checkout.com (Credit Card)</option>
            <option value="BMB">Bank Transfer</option>
            <option value="CASH">CASH</option>
          </Select>
        </FormControl>
        <br/>
      {payment.paymentMethod === "BMB" &&
        <>
          <FormControl variant="filled" size="small" className={classes.formControl}>
            <Select native name="bankName" inputRef={register({required: true})} >
              <option value="BANKMUSCAT">Bank Muscat</option>
              <option value="BANKDHOFAR">Bank Dhofar</option>
              <option value="HSBC">HSBC</option>
              <option value="AHLI">Ahli Bank</option>
              <option value="NBO">NBO</option>
              <option value="OAB">Oman Arab Bank</option>
            </Select>
          </FormControl>
          <br/>
          <TextField variant="filled" placeholder="Bank Account Number" name="bankAccountNumber" className={classes.textBox} inputRef={register({required: true})} />
          <br/>
          <TextField variant="filled" size="small" placeholder="Owner Name in English" name="bankOwnerName" className={classes.textBox} inputRef={register({required: true})} />
         </>
        }
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" type="submit" size="large">Add</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}