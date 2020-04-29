import Select from "react-select";
import Button from "@material-ui/core/Button";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import {OPTIONS, TYPE_OPTIONS} from "./Constants";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  textBox: {
    width: 120,
    margin: theme.spacing(1)
  }
}));

export const ImportAllDialog = ({open, onSubmit, onClose}) =>{
  const { register, handleSubmit, errors, control } = useForm();
  const classes = useStyles();

  const arrayToObject = (array,prop) =>
    array.map(t => t[prop]);

  const onLocalSubmit = (data) => {
    console.log(data);
    const shopIds = [];//arrayToObject([data.option],'id');
    const browseNode = "";//arrayToObject([data.type],'value')[0];
    onSubmit(shopIds, browseNode);
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" >
    <form onSubmit={handleSubmit(onLocalSubmit)}>
      <DialogTitle id="form-dialog-title">Import Search Result</DialogTitle>
      <DialogContent style={{height: "250px", width: "250px"}}>
{/*        <div><Controller as={<Select
          options={OPTIONS}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
        />}
                         rules={{ required: true }}
                         name="option"
                         register={register}
                         control={control}
                         label="Shop Name"
                         defaultValue=""
        /></div>
        <br/><br/>
        <div><Controller as={<Select
          options={TYPE_OPTIONS}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
        />}
                         rules={{ required: true }}
                         name="type"
                         register={register}
                         control={control}
                         label="Browse Node"
                         defaultValue=""
        /></div>*/}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" type="submit" size="large">Import All</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}