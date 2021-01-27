import {Chip, Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {flowAPI} from "../../../api/config";
import Select from "react-select";
import { useAlert } from "react-alert";
import Radio from "@material-ui/core/Radio";

import {ROLES, USERS_ALL} from "../../Shipments/components/Constants";
import {AuthContext} from "../../../context/auth";
import axios from "axios";
const qs = require('qs');

export const AssignDialog = ({item, open, onClose, step, state, type}) => {

  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: {
      id: item
    }
  });
  const [loading, setLoading] = useState(true);
  const [transitions, setTransitions] = useState([]);
  const [isUser, setUser] = useState(true);//state && state.includes("@") || false);
  const alert = useAlert();
  const { username } = React.useContext(AuthContext);


  const handleChange = (val) => {
    setUser(!isUser);
  }

  const onSubmitDialog = (formData) => {
    const by = USERS_ALL.find(i => i.value === username);
    if( !by ) {
      alert.error("Unknown User " + username + " Must add it to USERS_ALL in Constants.tsx");
      return;
    }

    let testData = {
      "state": step,
      "actionDescription": formData.comments + " assigned to " + formData.username.label + "  by " + by.label,
      "stateVariables": {
        "assignedTo": formData.username.value
      }
    };

    flowAPI.put(`/workflow-instance/id/${item}`, testData)
      .then(res => {
        alert.success(res.statusText);
        onClose();

      });

  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">

      <form onSubmit={handleSubmit(onSubmitDialog)}>
        <DialogTitle id="form-dialog-title">Assign Work</DialogTitle>
        <DialogContent style={{height: "250px", width: "250px"}}>
          <DialogContentText>
          </DialogContentText>

          <div>{isUser? <Controller
            as={<Select options={USERS_ALL}/>}
            rules={{ required: true }}
            name="username"
            register={register}
            control={control}
          />:<Controller
            as={<Select options={ROLES}/>}
            rules={{ required: true }}
            name="businessKey"
            register={register}
            control={control}
          />}</div>

          <div><TextField fullWidth placeholder="Comments" name="comments" inputRef={register({required: true})} /></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
