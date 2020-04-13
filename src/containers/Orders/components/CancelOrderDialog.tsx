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

export const CancelOrderDialog = ({open, onSubmit, onClose}) =>{
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle id="form-dialog-title">Cancel Order</DialogTitle>
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
      <DialogActions>
        <Button variant="contained" color="primary" type="submit" size="large">Cancel</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}