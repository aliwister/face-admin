import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {PACKAGE_TYPES, SHIPMENT_METHODS, SHIPMENT_TYPES} from "./Constants";
import Select from "react-select";
import Loader from "../../../components/Loader/Loader";
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";
import { useAlert } from "react-alert";
import {useHistory} from "react-router-dom";
import {MerchantLookup} from "../../../components/Merchant/MerchantsLookup";


const CREATE_SHIPMENT = gql`
  mutation createShipment($shipment: ShipmentInput) {
    createShipment(shipment: $shipment) {
      id
    }
  }
`;

export const CreateShipmentDialog = ({onSubmit = null, show = false, onClose = null,  defaults}) => {
  console.log(defaults);
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: defaults
  });
  const [createShipmentMutation] = useMutation(CREATE_SHIPMENT,{context: { clientName: "adminLink" }});
  const [createdialog, setCreatedialog] = React.useState(show);
  const [merchant, setMerchant] = React.useState(defaults.merchant ?defaults.merchant: {id:0});
  const [to, setTo] = React.useState(defaults.to ?defaults.to: {id:0});
  const alert = useAlert();
  const history = useHistory();


  function handleCreateButton() {
    setCreatedialog(true);
  }

  const handleClose = () => {
    if(onClose)
      return onClose();
    setCreatedialog(false);
  };

  const handleSubmitNewShipment = async data => {
    console.log(data);
    if (!merchant || !to) {
      alert.error("Must select merchant and to");
      return;
    }
    alert.success(merchant.name);
    data['merchantId'] = merchant.id;
    data['partyId'] = to.id;

    if(onSubmit) {
      return onSubmit(data);
    }

    // @ts-ignore
    const dto = {
      ...data,
      shipmentStatus: 'PROCESSING',
      //merchantId: merchant.value,
      //partyId: to.value,
      shipmentType: data.shipmentType.value,
      shipmentMethod: data.shipmentMethod.value
    };
    console.log(dto);
    delete dto['merchant'];
    const {
      data: { createShipment },
    }: any = await createShipmentMutation({
      variables: { shipment: dto },
    });
    if(createShipment)  {
      alert.success(createShipment.id);
      history.push('/shipment-details/'+createShipment.id+'/EDIT');
    }
  }

  if(!createdialog)
    return (
      <Button variant="contained" color="primary" onClick={handleCreateButton} >
        Create
      </Button>
    )

  return (
  <Dialog open={createdialog} onClose={handleClose} aria-labelledby="form-dialog-title">
    <form onSubmit={handleSubmit(handleSubmitNewShipment)}>
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
        <div><MerchantLookup selected={merchant} setMerchant={setMerchant} label={"From"}/></div>
        <div><MerchantLookup selected={to} setMerchant={setTo} label={"To"} onlyStores={true}/></div>

        <div><TextField variant="outlined" fullWidth type="text" placeholder="Tracking #" name="trackingNum"
                        inputRef={register({required: true})} /></div>
        <div><TextField variant="outlined" fullWidth type="text" placeholder="Reference" name="reference" inputRef={register({required: true, maxLength: 100})} /></div>
        <div><TextField variant="outlined" fullWidth type="number" placeholder="Pkg count" name="pkgCount"
                        inputRef={register({required: true})} /></div>
        <div><textarea name="handlingInstructions" ref={register({required: true})}  rows={3} cols={10}/></div>


      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
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