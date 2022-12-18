import Webcam from "react-webcam";
import React, {useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Buffer} from 'buffer';

import {handleUpload} from "../../Image/Uploader";
import {useGetUploadUrlMutation} from "../../../codegen/generated/_graphql";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};


export const WebCamDialog  = ({open, handleClose, handleSave}) => {
  const [image, setImage] = useState();

  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    },
    [webcamRef]
  );

  const retake = () => {
    setImage(null);
  }

  const save = () => {
    // @ts-ignore
    const imgData = new Buffer.from(image.split(',')[1], 'base64');
    return handleSave(imgData);
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Capture Image</DialogTitle>
      <DialogContent>

        {image ?
          <div>
            <img src={image} alt={""} style={{width: 300}} />
          </div>
        : <Webcam
            audio={false}
            height={300}
            width={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            forceScreenshotSourceSize
            videoConstraints={videoConstraints}
          />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        {image ?
          <>
            <Button color="primary" onClick={retake}>Retake</Button>
            <Button color="primary" onClick={save}>Save</Button>
          </>
          :
          <Button color="primary" onClick={capture}>Capture photo</Button>
        }
      </DialogActions>
    </Dialog>
  )
}