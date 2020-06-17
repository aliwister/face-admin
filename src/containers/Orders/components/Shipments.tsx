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
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));
export const Shipments = ({shipments}) =>{
  const classes = useStyles();
  if(!shipments)
    return (<div>Loading</div>)

  return (
    <Grid container>
      {shipments.track && shipments.track.map(s => (
        <Grid item xs={12} md={6}>
          <Card variant="outlined" style={{width:'100%'}}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                شحنة رقم    {s.id}
              </Typography>
              <Typography variant="h4">
                {s.shipment.status}
              </Typography>

              <ExpansionPanel>
                <ExpansionPanelSummary>
                  <Typography className={classes.heading}>Shipment Content</Typography>
                  <Typography className={classes.secondaryHeading}>What's in it</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <TableBody>
                    {s.shipment.content && s.shipment.content.map(row => (

                      <TableRow key={row.sequence}>
                        <TableCell align="left">
                          <a href={`http://www.badals.com/product/${row.productId}`} target="_blank">
                            <img src={row.image} className="product-image" style={{maxWidth: '70px'}} />
                          </a>
                        </TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell align="center">{row.quantity}</TableCell>
                      </TableRow>

                    ))}
                  </TableBody>

                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary>
                  <Typography className={classes.heading}>Shipment Progress</Typography>
                  <Typography className={classes.secondaryHeading}>Where is it?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <TableBody>
                    {s.shipment.progress && s.shipment.progress.map(row => (

                      <TableRow key={row.sequence}>
                        <TableCell align="left">
                          {row.createdDate}
                        </TableCell>
                        <TableCell align="center">{row.shipmentEventDescription} {row.details}</TableCell>
                      </TableRow>

                    ))}
                  </TableBody>

                </ExpansionPanelDetails>
              </ExpansionPanel>
            </CardContent>

          </Card>
        </Grid>
      ))}
    </Grid>
  )
}