import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Select from "@material-ui/core/Select";
import { CSVLink, CSVDownload } from "react-csv";
import {formatDate} from "baseui/datepicker";

export const ExportXeroCsvDialog = ({checked, items, open, onClose, title, total}) => {
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
    }
  });
  const [download, setDownload] = useState(false);
  const [csvData, setData] = useState([]);

  const onSubmitDialog = (formData) => {
    console.log(formData);
    const csvData = [["*Date","*Amount", "Payee","Description", "Reference","Check Number"]];
    csvData.push([formData.date,total,"Bank Muscat", "Settlement "+formData.date,"",""]);
    items.filter(function(el) { return checked.includes(el.id) }).forEach(function(a,b) {
      csvData.push([formatDate(new Date(a.settlementDate),'yyyy-MM-dd'),a.amount, a.customer, a.paymentMethod, a.orderReference, a.cartId]);
    });
    setData(csvData);
    setDownload(true);
  }

  return (

    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmitDialog)}>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {checked}
        </DialogContentText>
        <TextField
          id="date"
          label="Settlement Date"
          type="date"
          name="date"
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={register({required: true})}
        />
        {download && <CSVLink data={csvData}  enclosingCharacter={``} filename={"tranactions-"+formatDate(watch('date'),'yyyy-MM-dd')+".csv"}>Download me</CSVLink>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button type="submit">Generate</Button>
      </DialogActions>
      </form>
    </Dialog>
  )
}
