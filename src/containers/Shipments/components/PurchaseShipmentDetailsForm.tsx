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
var _ = require('lodash');

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

export const PurchaseShipmentDetailsForm = ({merchants, shipment, onSubmit}) => {
/*  console.log(shipment);
  console.log(shipment.merchantId)
  console.log(merchants.filter(obj => {
    console.log(obj.id)
    return obj.id == shipment.merchantId
  }));*/
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      ...shipment,
      merchant: merchants.filter(obj => {
        return obj.id == shipment.merchantId
      })[0],
      party: merchants.filter(obj => {
        return obj.id == shipment.partyId
      })[0]
    }
  });


  const classes = useStyles();

  function onSubmitForm(data) {
    let shipmentInput = _.pick(shipment, [
      'id',
      'reference',
      'trackingNum',
      'shipmentMethod',
      'shipmentType',
      'shipmentStatus',
      'merchantId',
      'partyId',
      'pkgCount',
      'handlingInstructions']);
    //console.log(_.assign({},shipmentInput, data));
    onSubmit(_.assign({},shipmentInput, data));
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

          <TextField size="small" label="Carrier" variant="outlined" className={classes.textField} name="shipmentMethod" inputRef={register}/>
          </Grid>
          <Grid item md={6}>
          <TextField size="small" label="Tracking" variant="outlined" className={classes.textField} name="trackingNum" inputRef={register}/>
          </Grid>
        <Grid item md={6}>
          <Controller
            as={<Select
                  className="my-react-select"
                  options={merchants}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.id}
                  placeholder="Merchant Store"
                />}
            rules={{ required: true }}
            name="merchant"
            register={register}
            control={control}
          />
        </Grid>
        <Grid item md={6}>
          <Controller
            as={<Select
                  className="my-react-select"
                  options={merchants}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.id}
                  placeholder="To"
                />}
            rules={{ required: true }}
            name="party"
            register={register}
            control={control}
          />
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
