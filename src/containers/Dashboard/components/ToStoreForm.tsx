import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {flowAPI} from "../../../api/config";
import Select from "react-select";
import { useAlert } from "react-alert";
import {SHIPMENT_METHODS, USERS_ALL} from "../../Shipments/components/Constants";

export const ToStoreForm = ({register, control}) =>  (
<>

          <div>
            <label>Received By</label>
            <Controller
                as={<Select options={USERS_ALL}/>}
                rules={{ required: true }}
                name="username"
                register={register}
                control={control}
              />
          </div>
      <div>
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
      </div>
</>
  )
