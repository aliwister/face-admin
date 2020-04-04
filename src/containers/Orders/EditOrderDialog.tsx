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


export const EditOrderDialog = ({open, orderItems, onSubmit, onClose}) => {
  console.log(orderItems);
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: orderItems
  });

  const handleSubmitEdit = (data) => console.log(data);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(handleSubmitEdit)}>
      <DialogTitle id="form-dialog-title">Accept Package</DialogTitle>
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
          {orderItems && orderItems.map(row => (
              <TableRow key={row.sequence}>
                <TableCell component="th" scope="row">
                  <TextField type="number" placeholder="Sequence" name={`sequence[${row.sequence}]`} inputRef={register} disabled/>
                </TableCell>
                <TableCell align="left">
                  <Image url={row.image} className="product-image"
                                               style={{maxWidth: '70px'}}/></TableCell>

                <TableCell align="left">{row.productName}</TableCell>
                <TableCell align="center">
                  <TextField type="number" placeholder="Sequence" name={`quantity[${row.sequence}]`} inputRef={register} />
                  {row.quantity}</TableCell>

                <TableCell align="center">
                  <TextField type="number" placeholder="Sequence" name={`price[${row.sequence}]`} inputRef={register} />
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