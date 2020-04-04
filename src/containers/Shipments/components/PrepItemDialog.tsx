import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {useForm} from "react-hook-form";

export const PreptemDialog = ({item, open, onClose, onSubmit, pkg}) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      pkgId: pkg.id,
      shipmentItemId: item.id,
      quantity: item.quantity
    }
  });

  const onSubmitDialog = (data) => {
    onSubmit(data);
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmitDialog)}>
        <DialogTitle id="form-dialog-title">Prep Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Item to Pkg Info
          </DialogContentText>
          <TextField fullWidth type="number" placeholder="Pkg ID" name="pkgId" inputRef={register({required: true})} />
          <TextField fullWidth type="number" placeholder="Shipment Item ID" name="shipmentItemId" inputRef={register({required: true})} />
          <TextField fullWidth type="number" placeholder="Quantity" name="quantity" inputRef={register} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Accept</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
