import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import {OrderInfoPaper} from "../Orders.style";
import React from "react";
import {useForm} from "react-hook-form";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Checkbox from "@material-ui/core/Checkbox";
import Image from "../../../components/Image/Image";
import LaunchIcon from "@material-ui/icons/Launch";
import TableFooter from "@material-ui/core/TableFooter";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  textBox: {
    width: 200,
    margin: theme.spacing(1)
  }
}));

export const Shipments = ({shipments}) =>{
  if(!shipments)
    return (<div>Loading</div>)

  return (
    <div>
      {shipments.shipmentsByRef && shipments.shipmentsByRef.map(s => (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          {s.id} {s.shipmentStatus} {s.progressTotal} {s.progressDone} {s.progressTodo}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TableContainer component={Paper}>
            <TableBody>
            {s.shipmentItems && s.shipmentItems.map(row => (

              <TableRow key={row.sequence}>
                <TableCell align="left"><Image url={row.image} className="product-image" style={{maxWidth: '70px'}} /></TableCell>
                <TableCell component="th" scope="row">
                  {row.productId ?
                    <a href={`http://www.badals.com/product/${row.productId}`} target="_blank">

                      {row.description}
                    </a>:
                    <span>{row.description}</span>
                  }
                </TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
              </TableRow>

              ))}
            </TableBody>
          </TableContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      ))}
      </div>
  )
}