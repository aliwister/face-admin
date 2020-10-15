import React, {useContext, useState, useCallback} from 'react';

import {useForm} from "react-hook-form";
import {Dialog} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Uploader from "../../../components/Uploader/Uploader";
import { useGetAdminImageUploadUrlMutation } from 'codegen/generated/_graphql';

export default function CreateHashtagDialog({item, show, onClose, onSubmit}) {
  const [hashtags, setHashtags] = useState();
  const [getImageUrl] = useGetAdminImageUploadUrlMutation({ context: { clientName: "shopLink" }});
  const [files, setFiles] = useState([]);
  console.log(item);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      id: item?item.id:"",
      en: item?item.en:"",
      ar: item?item.ar:"",
      icon: item?item.icon:null,
      position: item?item.position:"",
    }
  });

  const onSubmitDialog = async (data) => {
    console.log(data);
    if(files.length > 0)
      data.icon = await handleUpload();
    else
      data.icon = item?item.icon:null;
    onSubmit(data);
  }

  const handleHashtag = () => {

  }

  const handleUploader = async files => {
    //console.log(files);
    setFiles(files);
  };

  const handleUpload = async () => {

    const [pendingImage] = files;
    //console.log(pendingImage);
    const filename = pendingImage.path;
    const folder = "_hash-tag-icons";
    const { data: { getAdminImageUploadUrl },}: any = await getImageUrl({variables: {filename: filename, merchant: folder}});

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", pendingImage.type);

    await fetch(getAdminImageUploadUrl.uploadUrl, {
      method: 'put',
      headers: myHeaders,
      body: pendingImage,
      redirect: 'follow'
    }).then(function(data) {
      console.log(data);
    }).catch(function(err){
      console.log(err);
    });
    return getAdminImageUploadUrl.imageUrl;
    ///console.log(res);
    //return { fields: {}, meta: { fileUrl: "https://badal-assets.s3-eu-west-1.amazonaws.com/"+name }, url: getImageUploadUrl.value }
  }

  return (
      <Dialog open={show} onClose={onClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit(onSubmitDialog)}>
          <DialogTitle id="form-dialog-title">Create Hashtag</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Hashtag Info
            </DialogContentText>
            <div className="container">
              <Uploader current={item?item.icon:""} onChange={handleUploader} handleUpload={handleUpload } />
            </div>
            <TextField disabled={true} fullWidth type="number" placeholder="id" name="id" inputRef={register({required: false})} />
            <TextField fullWidth type="number" placeholder="position" name="position" inputRef={register({required: true})} />
            <TextField fullWidth type="text" placeholder="en" name="en" inputRef={register({required: true,pattern: /.+/ })} />
            <TextField fullWidth type="text" placeholder="ar" name="ar" inputRef={register({required: true,pattern: /.+/})} />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Done</Button>
          </DialogActions>
        </form>
      </Dialog>
  )
}