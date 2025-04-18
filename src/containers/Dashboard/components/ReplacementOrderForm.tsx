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

export const ReplacementOrderForm = ({register, control}) =>  (
<>
  <div>
    <TextField variant="outlined" fullWidth type="text" placeholder="Replacement Order #" name="replacementOrderNum"
                  inputRef={register()} />
  </div>
</>
  );
