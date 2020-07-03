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

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  textBox: {
    width: 120,
    margin: theme.spacing(1)
  }
}));

export const PaymentFormDialog = ({open, onSubmit, onClose}) =>{
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle id="form-dialog-title">Add Payment</DialogTitle>
      <DialogContent>
      <TextField variant="filled" size="small" placeholder="Amount" name="amount" className={classes.textBox} inputRef={register({required: true, max: 10000, min: .1, maxLength: 5})} />
      <TextField variant="filled" size="small" type="text" placeholder="Auth Code" name="authCode" className={classes.textBox} inputRef={register({required: true, maxLength: 10})} />
      <FormControl variant="filled" size="small" className={classes.formControl}>
        <Select native name="method" inputRef={register({ required: true })}>
          <option value="POS">POS</option>
          <option value="CHECKOUTCOM">CHECKOUTCOM</option>
          <option value="BMB">Bank Transfer</option>
          <option value="CASH">CASH</option>
        </Select>
      </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" type="submit" size="large">Add</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}