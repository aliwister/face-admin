import {SectionCard} from "../Shipment.style";
import CardHeader from "@material-ui/core/CardHeader";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const ShipmentItems = ({state, dispatch}) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
        <Typography>Content</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">

              </TableCell>
              <TableCell align="right">

              </TableCell>
              <TableCell align="right">

              </TableCell>
              <TableCell align="right">Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.shipment.shipmentItems && state.shipment.shipmentItems.map((a,b) => (
              <TableRow>
                <TableCell>{a.sequence}</TableCell>
                <TableCell>{a.description}</TableCell>
                <TableCell>{a.quantity}</TableCell>
                <TableCell>{a.productId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}