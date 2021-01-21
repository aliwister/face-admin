import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {flowAPI} from "../../../api/config";
import Select from "react-select";
import { useAlert } from "react-alert";
import {SHIPMENT_METHODS} from "../../Shipments/components/Constants";

export const ToStoreForm = ({register, control}) =>  (
<>
          <div>
            <TextField variant="outlined" fullWidth type="text" placeholder="Tracking #" name="trackingNum"
                          inputRef={register()} /></div>
          <div>
            <Controller
              as={<Select options={SHIPMENT_METHODS}/>}
              rules={{ required: true }}
              name="carrier"
              register={register}
              control={control}

            /></div>
  <div>
    <TextField variant="outlined" fullWidth type="text" placeholder="Label File" name="labelFile"
               inputRef={register()} /></div>
  <div><input type="checkbox" name="ourLabel" ref={register} />Our Label?</div>
  <div>
    <TextField variant="outlined" fullWidth type="text" placeholder="Weight (KG)" name="weight"
               inputRef={register()} /></div>
  <div>
    <TextField variant="outlined" fullWidth type="text" placeholder="Return Fee (OMR)" name="returnFee"
               inputRef={register()} /></div>
</>
  )
