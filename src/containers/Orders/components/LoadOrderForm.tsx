import React from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import {Link, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";


const useStyles = makeStyles(theme => ({

  form: {
    width: '100%',
  }
}));

export const LoadOrderForm = () => {
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {}
  });

  const classes = useStyles();
  const history = useHistory();

  function onSubmitForm(data) {
    history.push('/order-details/'+data.id);
  }

  return (
      <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)}>
        <TextField size="small" label="Order #" variant="outlined" type="number" name="id" inputRef={register({required: true, minLength: 5, maxLength: 7})}/>
        <Button size="medium" variant="contained" color="primary" type="submit" >Go</Button>
      </form>
  );
}