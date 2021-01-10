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
import Image from "../../../components/Image/Image";
import React from "react";
import TextField from "@material-ui/core/TextField";
import {Controller, useForm} from "react-hook-form";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TableFooter from "@material-ui/core/TableFooter";
import {RETURN_REASONS} from "../../Shipments/components/Constants";
import Select from "react-select";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
}));


export const ReturnDialog = ({open, orderItems, onSubmit, onClose}) => {
  const { register, handleSubmit, errors, control } = useForm();
  const classes = useStyles();
  const handleSubmitEdit = (data) => {
    console.log(data);
    onClose();
    onSubmit(data);
  }

  return (
    <Dialog  classes={{ paper : classes.dialogPaper}} open={open} onClose={onClose} aria-labelledby="form-dialog-title"
            maxWidth={"md"}
            fullWidth={true}>
      <form onSubmit={handleSubmit(handleSubmitEdit)}>
      <DialogTitle id="form-dialog-title">Request Return</DialogTitle>
      <DialogContent style={{'minHeight':'60vh'}}>
        <div><Controller
          as={<Select options={RETURN_REASONS}/>}
          rules={{ required: true }}
          name="reason"
          label="Reason"
          register={register}
          control={control}
        /></div>
        <div><TextField variant="outlined" fullWidth type="text" placeholder="Ticket URL" name="ticketUrl"
                   inputRef={register()} /></div>
        <div><input type="checkbox" name="onUs" ref={register} />Our responsibility</div>
        <div><input type="checkbox" name="replacement" ref={register} />Request replacement</div>
        <div><input type="checkbox" name="toVendor" ref={register} />Direct customer to vendor return</div>
        <div><TextField variant="outlined" fullWidth type="text" placeholder="Instructions" name="instructions" multiline
                        rows="4"
                        inputRef={register({required: true})} /></div>
{/*        <div><TextField variant="outlined" fullWidth type="text" placeholder="ID" name="id"
                        inputRef={register()} /></div>*/}
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Image</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">PID</TableCell>
            <TableCell align="left">SKU</TableCell>
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
                <TableCell align="left"> <TextField placeholder="Product Name" name={`orderItems[${i}].productName`} inputRef={register} value={row.productName}  disabled={true}/></TableCell>
                <TableCell component="th" scope="row">
                  <TextField type="number" placeholder="Sequence" name={`orderItems[${i}].productId`} inputRef={register} value={row.productId} disabled={true}/>
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField  placeholder="Sku" name={`orderItems[${i}].productSku`} inputRef={register} value={row.productSku} disabled={true}/>
                </TableCell>



                <TableCell align="center">
                  <TextField type="number" placeholder="Quantity" name={`orderItems[${i}].quantity`} inputRef={register} defaultValue={0}/>
                  OF {row.quantity}
                </TableCell>

                <TableCell align="center">
                  <TextField inputProps={{step: 0.1}} type="number" placeholder="Price" name={`orderItems[${i}].price`} inputRef={register} defaultValue={row.price} disabled={true}/>
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