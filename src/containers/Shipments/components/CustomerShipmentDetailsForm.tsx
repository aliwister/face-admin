import {Grid} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {SectionCard} from "../Shipment.style";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Controller, useForm} from "react-hook-form";
import CardHeader from "@material-ui/core/CardHeader";
import Select from "react-select";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    fontSize: '23px',
    marginBottom: theme.spacing(1),
  },
  form: {
    width: '100%',
  }
}));

export const CustomerShipmentDetailsForm = ({shipment, onSubmit}) => {
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      ...shipment
    }
  });
  const classes = useStyles();

  function onSubmitForm(data) {
    onSubmit(data);
  }

  return (
    <SectionCard>
      <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)}>
      <CardHeader
        subheader="Shipment Info"
        action={<Button variant="contained" color="primary" type="submit" size="small">Save</Button>}
      />
      <Grid container xs={12} md={12} spacing={1}>
        <Grid item md={6}>
          <TextField size="small" label="Ref" variant="outlined" className={classes.textField} name="reference" value={shipment.customerId}/>
        </Grid>
        <Grid item md={6}>
          <TextField size="small" label="Ref" variant="outlined" className={classes.textField} name="reference" inputRef={register}/>
        </Grid>
        <Grid item md={12}>
          <TextField fullWidth size="small" label="Shipping Instructions" variant="outlined"  name="handlingInstructions" className={classes.textField} inputRef={register}/>
        </Grid>
        <Grid item md={12}>

        </Grid>
      </Grid>
      </form>
    </SectionCard>
  );
}
