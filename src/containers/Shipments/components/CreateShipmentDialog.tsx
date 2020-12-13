import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {PACKAGE_TYPES, SHIPMENT_METHODS, SHIPMENT_TYPES} from "./Constants";
import Select from "react-select";
import Loader from "../../../components/Loader/Loader";

export const CreateShipmentDialog = ({show, onClose, onSubmit, merchants, defaults}) => {
  console.log(defaults);
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: defaults
  });
  return (
  <Dialog open={show} onClose={onClose} aria-labelledby="form-dialog-title">
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle id="form-dialog-title">Create Import Shipment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Shipment Info
        </DialogContentText>
        <div>
          <Controller
            as={<Select options={SHIPMENT_TYPES}/>}
            rules={{ required: true }}
            name="shipmentType"
            register={register}
            control={control}

          />
        </div>
        <div>
        <Controller
          as={<Select options={SHIPMENT_METHODS}/>}
          rules={{ required: true }}
          name="shipmentMethod"
          register={register}
          control={control}

        />
        </div>
        <div><Controller as={<Select
          options={merchants.merchants}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
        />}
                         rules={{ required: true }}
                         name="merchant"
                         register={register}
                         control={control}

        /></div>
        <div><TextField variant="outlined" fullWidth type="text" placeholder="Tracking #" name="trackingNum"
                        inputRef={register({required: true})} /></div>
        <div><TextField variant="outlined" fullWidth type="text" placeholder="Reference" name="reference" inputRef={register({required: true, maxLength: 100})} /></div>
        <div><TextField variant="outlined" fullWidth type="number" placeholder="Pkg count" name="pkgCount"
                        inputRef={register({required: true})} /></div>
        <div><textarea name="handlingInstructions" ref={register({required: true})}  rows={3} cols={10}/></div>


      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {defaults.loading?<Loader/>: <Button type="submit" color="primary">
          Create
        </Button>}
      </DialogActions>
    </form>
  </Dialog>
  )
};