import {
  Dialog, DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Image from "../../components/Image/Image";
import React from "react";
import TextField from "@material-ui/core/TextField";
import {useForm} from "react-hook-form";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TableFooter from "@material-ui/core/TableFooter";


export const EditOrderDialog = ({open, orderItems, onSubmit, onClose}) => {
  const { register, handleSubmit, errors, control } = useForm();

  const handleSubmitEdit = (data) => {
    console.log(data);
    onClose();
    onSubmit(data);
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(handleSubmitEdit)}>
      <DialogTitle id="form-dialog-title">Edit Order</DialogTitle>
      <DialogContent>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Image</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItems && orderItems.map((row,i) => (
              <TableRow key={row.sequence}>
                <TableCell component="th" scope="row">
                  <TextField type="number" placeholder="Sequence" name={`orderItems[${i}].sequence`} inputRef={register} value={row.sequence} disabled={true}/>
                </TableCell>
                <TableCell align="left">
                  <Image url={row.image} className="product-image"
                                               style={{maxWidth: '70px'}}/></TableCell>

                <TableCell align="left">{row.productName}</TableCell>
                <TableCell align="center">
                  <TextField type="number" placeholder="Quantity" name={`orderItems[${i}].quantity`} inputRef={register} defaultValue={row.quantity}/>
                </TableCell>

                <TableCell align="center">
                  <TextField inputProps={{step: 0.1}} type="number" placeholder="Price" name={`orderItems[${i}].price`} inputRef={register} defaultValue={row.price}/>
                </TableCell>

              </TableRow>
            ))}
        </TableBody>
      </Table>
      </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Done</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}