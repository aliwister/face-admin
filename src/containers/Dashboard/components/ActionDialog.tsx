import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {flowAPI} from "../../../api/config";
import Select from "react-select";
import { useAlert } from "react-alert";

export const ActionDialog = ({item, open, onClose, state, type}) => {
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: {
      id: item
    }
  });
  const [loading, setLoading] = useState(true);
  const [transitions, setTransitions] = useState([]);
  const alert = useAlert();
  useEffect(() => {
    flowAPI.get("/workflow-definition", {params: {type: type, include: "currentStateVariables"}}).then(res => {
      setLoading(false);
      let options= [];
/*      console.log(state);
      console.log(res.data[0].states.filter((el) => el.id == state));
      console.log(res.data[0].states.filter((el) => el.id == state)[0]);*/
      res.data[0].states.filter((el) => el.id == state)[0].transitions.map((x) => {
          options.push({value: x, label: x});
        }
      );
      setTransitions(options);
    });
  }, []);

  const onSubmitDialog = (formData) => {
      let testData = {
        "state": formData.state.value,
        "nextActivationTime": new Date(),
        "stateVariables": {"comments": formData.comments}
      };
      flowAPI.put(`/workflow-instance/id/${formData.id}`, testData)
        .then(res => {
          alert.success(res.statusText);
        });

  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmitDialog)}>
        <DialogTitle id="form-dialog-title">Accept Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Package Info
          </DialogContentText>
          <div>   {transitions &&       <Controller
            as={<Select options={transitions}/>}
            rules={{ required: true }}
            name="state"
            register={register}
            control={control}
          />}</div>
          <div><TextField variant="outlined" fullWidth type="text" placeholder="ID" name="id"
                          inputRef={register()} /></div>
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
