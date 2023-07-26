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

export const UpdateCarrierDialog = ({open, onSubmit, onClose, title}) =>{
  const alert = useAlert();
  const { register, handleSubmit, errors } = useForm({defaultValues: {
    value: 1,
    couponName: 'pickup'
  }});

  const classes = useStyles();
  //console.log(payment)
  const formSubmit = async (data) => {

    console.log(data);
    if(data.value <= 0) {
      alert.error("Cannot carrier fee negative or 0");
      return;
    }

    return onSubmit(data);
  }


  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
    <form onSubmit={handleSubmit(formSubmit)}>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
      <TextField variant="filled" size="small" placeholder="Amount" name="value" className={classes.textBox} inputRef={register({required: true, max: 1500, min:0, maxLength: 5})} />
      <br/>
        <FormControl variant="filled" size="small" className={classes.formControl}>
          <Select native name="carrier" inputRef={register({ required: true })}>
            <option value="pickup">Pickup</option>
            <option value="nol">Nol</option>
            <option value="badals">Badals</option>
            <option value="dhl">DHL</option>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" type="submit" size="large">Update</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}