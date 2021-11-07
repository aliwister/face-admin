import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {DRIVERS, PACKAGE_TYPES, SHIPMENT_METHODS, SHIPMENT_TYPES} from "./Constants";
import Select from "react-select";

export const SendToDetrackDialog = ({open, onClose, onSubmit}) => {
  const { register, handleSubmit, errors, control } = useForm();
  return (
  <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" style={{minHeight:"250px"}}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle id="form-dialog-title">Deliver</DialogTitle>
      <DialogContent style={{height: "250px", width: "250px"}}>
        <DialogContentText>
          Send To Detrack
        </DialogContentText>
        <div>
          <Controller
            as={<Select options={DRIVERS}/>}
            rules={{ required: false }}
            name="assignTo"
            register={register}
            control={control}
            defaultValue=""
          />
        </div>
        <div>
          <Controller
            as={<Select options={DRIVERS}/>}
            rules={{ required: false }}
            name="assignTo"
            register={register}
            control={control}
            defaultValue=""
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Send
        </Button>
      </DialogActions>
    </form>
  </Dialog>
  )
};