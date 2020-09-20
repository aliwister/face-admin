import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Select from "@material-ui/core/Select";
import { CSVLink, CSVDownload } from "react-csv";
import {formatDate} from "baseui/datepicker";

export const ExportBmbCsvDialog = ({checked, items, open, onClose, title, total}) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
    }
  });
  const [download, setDownload] = useState(false);
  const [csvData, setData] = useState([]);

  const onSubmitDialog = (data) => {
    console.log(items);
    const csvData = [
      ["CR/DR", "Account Number", "Name", "Amount", "Employee Number", "Remarks"]
    ];
    csvData.push(["DR","0333015845260014","Badal Trad", total,"","Refunds"])
    items.filter(function(el) { return checked.includes(el.id) }).forEach(function(a,b) {
      csvData.push(["CR",a.bankAccountNumber, a.bankOwnerName, Math.abs(a.amount), "",a.orderReference])
    });
    setData(csvData);
    setDownload(true);
  }

  return (

    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {checked}
        </DialogContentText>
        {download && <CSVLink data={csvData}  enclosingCharacter={``} filename={"refunds-"+formatDate(new Date(),'yyyy-MM-dd')+".csv"}>Download me</CSVLink>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onSubmitDialog}>Generate</Button>
      </DialogActions>

    </Dialog>
  )
}
