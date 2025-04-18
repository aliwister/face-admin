import {SectionCard} from "../Shipment.style";
import CardHeader from "@material-ui/core/CardHeader";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

export const ShipmentItems = ({state, dispatch, label, handleDeleteItem}) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
        <Typography>{label}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Seq</TableCell>
              <TableCell align="left">
Description              </TableCell>
              <TableCell align="right">
Qty
              </TableCell>
              <TableCell align="right">
Product
              </TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state && state.map((a,b) => (
              <TableRow>
                <TableCell><Link to={`/purchase-details/${a.po}`} target={"_blank"}>{a.id}</Link></TableCell>
                <TableCell>{a.sequence}</TableCell>
                <TableCell>{a.description}</TableCell>
                <TableCell>{a.quantity}</TableCell>
                <TableCell>{a.productId ?
                  <a href={`http://www.badals.com/product/${a.productId}`} target="_blank">

                  {a.productId}
                  </a>:
                  <span>{a.productId}</span>
                }</TableCell>
                <TableCell><Button variant="contained" color="secondary" onClick = {() => handleDeleteItem(a)}>X</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}