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

export const DiscountDialog = ({open, onSubmit, onClose, title}) =>{
  const alert = useAlert();
  const { register, handleSubmit, errors } = useForm({defaultValues: {
    amount: 1
  }});

  const classes = useStyles();
  //console.log(payment)
  const formSubmit = async (data) => {

    console.log(data);
    if(data.amount <= 0) {
      alert.error("Cannot discount negative or 0");
      return;
    }

    return onSubmit(data);
  }


  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
    <form onSubmit={handleSubmit(formSubmit)}>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
      <TextField variant="filled" size="small" placeholder="Amount" name="amount" className={classes.textBox} inputRef={register({required: true, max: 1500, min:0, maxLength: 5})} />
      <br/>
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            name="reason"
            variant="outlined"
            inputRef={register({ required: true })}/>
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" type="submit" size="large">Add</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}