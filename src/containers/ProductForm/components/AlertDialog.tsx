import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import { useAlert } from "react-alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";

export default function AlertDialog({open, setOpen, text}) {
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Purchase</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}