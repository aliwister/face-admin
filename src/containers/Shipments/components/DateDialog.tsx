import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {useForm} from "react-hook-form";

export const DateDialog = ({item, open, onClose, onSubmit, title}) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
    }
  });

  const onSubmitDialog = (data) => {
    console.log(data);
    onSubmit(item, data);
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmitDialog)}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {item}
          </DialogContentText>
          <TextField
            id="date"
            label="Date"
            type="date"
            name="date"
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={register({required: true})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
          <Button type="submit">Save & Email</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
