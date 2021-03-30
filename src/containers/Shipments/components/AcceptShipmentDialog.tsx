import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Webcam from "react-webcam";

import Uploader from "../../../components/Uploader/Uploader";
import {useMutation} from "@apollo/react-hooks";
import {useGetUploadUrlMutation} from "codegen/generated/_graphql";
import Select from "react-select";
import {handleUpload} from "../../Image/Uploader";
import {useHistory} from "react-router-dom";
import { useAlert } from "react-alert";
import {gql} from "apollo-boost";
import {DRIVERS, USERS} from "./Constants";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const ACCEPT_SHIPMENT = gql`
  mutation acceptShipment($trackingNum: String, $payment: PaymentInput, $invoiceLink: String ) {
    acceptShipment(trackingNum: $trackingNum, payment: $payment, invoiceLink: $invoiceLink) {
      id
    }
  }
`;

export const AcceptShipmentDialog = ({show, onClose}) => {
  const { register, handleSubmit, errors, control } = useForm();
  const [getUploadUrlMutation] = useGetUploadUrlMutation({ context: { clientName: "shopLink" }});
  const [acceptShipmentMutation] = useMutation(ACCEPT_SHIPMENT,{context: { clientName: "adminLink" }});
  const history = useHistory();
  const alert = useAlert();
  const [files, setFiles] = useState([]);
  const webcamRef = React.useRef(null);
  const handleUploader = async files => {
    setFiles(files);
  };

  const handleAcceptShipment = async formData => {
    console.log( formData.trackingNum);
    const filename = 'shipment-receipts/'+formData.trackingNum + '.jpg';
    // @ts-ignore
    const {
      data: { acceptShipment },
    }: any = await acceptShipmentMutation({
      variables: {
        trackingNum: formData.trackingNum,
        payment: {
          price: {
            amount: formData.amount,
            currency: "omr"
          },
          invoiceNum: formData.invoiceNum,
          userId: formData.user.value
        },
        invoiceLink: filename
      },
    });


    let {data: { getUploadUrl }} = await getUploadUrlMutation({variables: {filename: filename}});
    const [pendingImage] = files;

    let xyz = await handleUpload(pendingImage, getUploadUrl, "image/jpeg");
    console.log(xyz);

    if(acceptShipment)  {
      alert.success(acceptShipment.id);
      history.push('/shipment-details/'+acceptShipment.id+'/RECEIVE');
    }
  }

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
    },
    [webcamRef]
  );

  return (
  <Dialog open={show} onClose={onClose} aria-labelledby="form-dialog-title">
    <form onSubmit={handleSubmit(handleAcceptShipment)}>
      <DialogTitle id="form-dialog-title">Accept Shipment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Shipment Info
        </DialogContentText>
        <div><TextField variant="outlined" fullWidth type="text" placeholder="Tracking #" name="trackingNum"
                        inputRef={register({required: true})} /></div>
       {/* <Uploader onChange={handleUploader} handleUpload={handleUpload } />*/}
        <div><TextField variant="outlined" fullWidth type="text" placeholder="Invoice #" name="invoiceNum"
                        inputRef={register({required: true})} /></div>
        <div><TextField variant="outlined" fullWidth type="text" placeholder="Amount" name="amount"
                        inputRef={register({required: true})} /></div>
        <div>          <Controller
          as={<Select options={USERS}/>}
          rules={{ required: true }}
          name="user"
          register={register}
          control={control}
          defaultValue=""
        /></div>

        <Uploader onChange={handleUploader} handleUpload={handleUpload } />

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Accept
        </Button>
      </DialogActions>
    </form>
  </Dialog>
  )
};