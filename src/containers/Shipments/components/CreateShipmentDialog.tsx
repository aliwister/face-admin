import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import React from "react";

export const CreateShipmentDialog = ({show, handleClose, handleSubmit, register, merchants, setMerchant}) => {

  return (
  <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
    <form onSubmit={handleSubmit}>
      <DialogTitle id="form-dialog-title">Accept Shipment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Shipment Info
        </DialogContentText>
        <div><NativeSelect variant="filled" fullWidth name="shipmentType" ref={register({required: true})}>
          <option value="PURCHASE">PURCHASE</option>
          <option value="RETURN">RETURN</option>
          <option value="TRANSFER">TRANSFER</option>
        </NativeSelect></div>
        <div><NativeSelect variant="filled" fullWidth name="shipmentMethod" inputRef={register({required: true})}>
          <option value="DHL">DHL</option>
          <option value="Fedex">Fedex</option>
          <option value="UPS">UPS</option>
          <option value="Falcon">Falcon</option>
          <option value="Aramex">Aramex</option>
          <option value="Oman Post">Oman Post</option>
          <option value="Cargo">Cargo</option>
        </NativeSelect></div>

        <div><TextField variant="outlined" fullWidth type="text" placeholder="Reference" name="reference" inputRef={register({required: true, maxLength: 100})} /></div>

        <div><TextField variant="outlined" fullWidth type="text" placeholder="Tracking #" name="trackingNum"
                        inputRef={register({required: true})} /></div>

        <div><Autocomplete
          id="combo-box-demo"
          options={merchants.merchants}
          getOptionLabel={(option: any) => option.name}
          style={{ width: 300 }}
          onChange={(event, value) => setMerchant(value)}
          renderInput={params => <TextField {...params} label="Merchant Name" variant="outlined" />}
        /></div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Accept
        </Button>
      </DialogActions>
    </form>
  </Dialog>
  )
};