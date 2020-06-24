import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {useForm} from "react-hook-form";

export const AcceptItemDialog = ({item, open, onClose, onSubmit}) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      productId: (item)?item.productId:null,
      merchantId: (item)?item.merchantId:null,
      quantity: (item)?item.quantity:null,
    }
  });

  const onSubmitDialog = (data) => {
    console.log(data);
    if ((Number(data['accepted']) + Number(data['rejected'])) != Number(data['quantity']) || (Number(data['accepted']) + Number(data['rejected']))  == 0) {
      alert("Accepted + Rejected NOT Equal Quantity");
      return;
    }
    onSubmit(data);
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmitDialog)}>
        <DialogTitle id="form-dialog-title">Accept Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Package Info
          </DialogContentText>
          <TextField fullWidth type="number" placeholder="Product ID" name="productId" inputRef={register({required: true})}  />
        {/*  <TextField fullWidth type="number" placeholder="Merchant ID" name="merchantId" inputRef={register({required: true})} />*/}
          <TextField fullWidth type="number" placeholder="Quantity" inputProps={{step: 0.1}} name="quantity" inputRef={register({required: true})} />
          <TextField fullWidth type="number" placeholder="Accepted" inputProps={{step: 0.1}} name="accepted" inputRef={register({required: true})} />
          <TextField fullWidth type="number" placeholder="Rejected" inputProps={{step: 0.1}} name="rejected" inputRef={register({required: true})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Accept</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
