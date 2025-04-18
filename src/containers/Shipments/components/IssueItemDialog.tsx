import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

export const IssueItemDialog = ({item, open, onClose, onSubmit, productId, description}) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      productId: productId,
      description: description,
      orderItemId: item.orderItemId
    }
  });

  const onSubmitDialog = (data) => {
    console.log(data);
    if(!data['quantity']) {
      alert("Must enter quantity");
      return;
    }

    let allocatable = Number(data['quantity']) - Number(item.preallocated);
    if ( allocatable > Number(data['quantity']) || data['quantity'] == 0) {
      alert("Max Allocatable = " + allocatable );
      return;
    }
    onSubmit(data);
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmitDialog)}>
        <DialogTitle id="form-dialog-title">Issue Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Package Info
          </DialogContentText>
          <div>Item Qty = {item.quantity} Preallocated = {item.preallocated}  <Link to={`/order-details/${item.orderId}`} target="_blank">{item.orderId}</Link></div>
          <TextField fullWidth type="number" placeholder="Product ID" name="productId" value={productId} inputRef={register({required: true})} />
          <TextField fullWidth type="text" placeholder="Description" name="description" value={description} inputRef={register({})} />

          <TextField fullWidth type="number" placeholder="Quantity" name="quantity"  inputProps={{step: 0.1}} inputRef={register({required: true})} />
          <TextField fullWidth type="number" placeholder="Order Item Id" name="orderItemId" value={item.orderItemId} inputRef={register} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Accept</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
