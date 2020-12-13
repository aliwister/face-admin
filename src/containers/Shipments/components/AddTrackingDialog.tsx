import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {PACKAGE_TYPES, SHIPMENT_METHODS, SHIPMENT_STATUS, SHIPMENT_TYPES} from "./Constants";
import Select from "react-select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Loader from "../../../components/Loader/Loader";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: 600,
    width: 400,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const AddTrackingDialog = ({show, onClose, onSubmit, events, defaults}) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, control } = useForm({defaultValues: defaults});
  return (
  <Dialog open={show} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth={true}
          maxWidth="md" style={{height:500}}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle id="form-dialog-title">Add Tracking Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Shipment Info
        </DialogContentText>
        <div><Controller as={<Select
        options={events.trackingEvents}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
      />}
                                                     rules={{ required: true }}
                                                     name="trackingEvent"
                                                     register={register}
                                                     control={control}

      /></div>
        <br/>
        <div>
        <Controller
          as={<Select options={SHIPMENT_STATUS}/>}
          rules={{ required: true }}
          name="shipmentStatus"
          register={register}
          control={control}

        /></div>
        <br/><div>
        <Controller
          as={  <TextField
            id="datetime-local"
            label="Event Date"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
          />}
          rules={{ required: false }}
          name="eventDate"
          register={register}
          control={control}
          defaultValue=""
        />
        </div>
        <br/>
        <div><TextField variant="outlined" fullWidth type="text" placeholder="details" name="details"
                        inputRef={register({required: true})} /></div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Add
        </Button>
      </DialogActions>
    </form>
  </Dialog>
  )
};