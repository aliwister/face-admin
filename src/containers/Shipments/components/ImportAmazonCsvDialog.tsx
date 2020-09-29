import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";

import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone';
import { useAlert } from "react-alert";
import axios from 'axios';

export const ImportAmazonCsvDialog = ({show, onClose}) => {
  const [files, setFiles] = useState([]);
  const alert = useAlert();

  const handleUpload = () => {
    let formData = new FormData();
    //formData.append('username', 'Chris');
    formData.append('file', files[0], files[0].name);
    //console.log(formData);
    axios.post(`${process.env.REACT_APP_ADMIN_API}/import/amazon-file`, formData, {headers: {"Content-type": "multipart/form-data"}})
      .then(function (response){
        alert.success(response.data);
      });
    setFiles([]);
  }

  const onDrop = useCallback((acceptedFiles) => {
      setFiles(
        acceptedFiles
      );
  }, []);
  const {getRootProps, getInputProps, open, isDragActive} = useDropzone({
    multiple: false,
    onDrop
  });

  return (
    <Dialog open={show} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Accept Package</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Package Info
          </DialogContentText>
          <div className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here</p>
              {files && files.length > 0 ? files[0].name: ""}
              <button type="button" onClick={open}>
                Open File Dialog
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
         <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogActions>
    </Dialog>
  );
}
