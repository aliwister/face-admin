import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {PACKAGE_TYPES} from "./Constants";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import Select from "react-select";

export const CreatePkgDialog = ({open, handleClose, onSubmit}) => {
  const { register, handleSubmit, errors, control } = useForm();

  function handleAcceptPackage(data) {
    onSubmit(data);
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(handleAcceptPackage)}>
        <DialogTitle id="form-dialog-title">Accept Package</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Package Info
          </DialogContentText>
          <Controller
            as={<Select options={PACKAGE_TYPES}/>}
            rules={{ required: true }}
            name="packageType"
            register={register}
            control={control}
            defaultValue=""
          />
          <TextField fullWidth type="number" placeholder="Length" name="length" inputRef={register} />
          <TextField fullWidth type="number" placeholder="Width" name="width" inputRef={register} />
          <TextField fullWidth type="number" placeholder="Height" name="height" inputRef={register} />
          <TextField fullWidth type="number" inputProps={{step: 0.01}} placeholder="Weight" name="weight" inputRef={register} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Done</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
