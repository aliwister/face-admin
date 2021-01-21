import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
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

export const AssignSlackDialog = ({item, open, onClose, step, state, type}) => {

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

  /*
              orderId:slug,
            reason: formData.reason.value,
            instructions: formData.instructions,
            onUs: formData.onUs,
            toVendor: formData.toVendor,
            replacement: formData.replacement,
            sequence: a.sequence,
            productName: a.productName,
            productId: a.productId,
            sku: a.productSku,
            quantity: a.quantity
            */

  const onSubmitDialog = async (formData) => {


    const payload = {
      orderId: state.orderId,
      reason: state.reason,
      instructions: state.productName,
      productId: state.productId,
      productName: state.quantity,
      quantity: state.quantity,
      sku: `${state.sku}`,
      po: `${state.po}`,
      onUS: `${state.onUs}`,
      toVendor: `${state.toVendor}`,
      isReplacement: `${state.replacement}`,
      assigned: formData.username.value,
      requested:username,
      comments: formData.comments,
    };
/*    const data = JSON.stringify(payload);
    console.log(data);*/
    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: 'https://hooks.slack.com/workflows/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',
      withCredentials: false,
     transformRequest: [(data, headers) => {
        delete headers["Authorization"]
        return data
      }],
      data : JSON.stringify(payload)
    };
    // @ts-ignore
     axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">

      <form onSubmit={handleSubmit(onSubmitDialog)}>
        <DialogTitle id="form-dialog-title">Assign Work</DialogTitle>
        <DialogContent style={{height: "250px", width: "250px"}}>
          <DialogContentText>
            Assign will trigger the corresponding workflow on Slack
          </DialogContentText>
{/*          <div>
            <Radio
              checked={isUser===false}
              value="role"
              onChange={handleChange}
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'A' }}
            />
            Role
            <Radio
              checked={isUser===true}
              value="user"
              onChange={handleChange}
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'B' }}
            />
            User
          </div>*/}

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
{/*          <div><TextField variant="outlined" fullWidth type="text" placeholder="ID" name="id"
                          inputRef={register()} /></div>*/}
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
