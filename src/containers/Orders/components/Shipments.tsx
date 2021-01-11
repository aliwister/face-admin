import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {Tracking} from "../../../components/Tracking/Tracking";

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
export const Shipments = ({shipments, onGetAdminFile}) =>{
  const classes = useStyles();
  if(!shipments)
    return (<div>Loading</div>)

  function handleDownload(fileKey: any) {
    console.log(fileKey);
    onGetAdminFile(fileKey);
  }

  return (
    <Grid container>
      {shipments.track && shipments.track.map(s => (
        <Grid item xs={12} md={6}>
          <Card variant="outlined" style={{width:'100%'}}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Shipment-
                <Link to={`/shipment-details/${s.id}/EDIT`}>{s.id}</Link><br/>
              </Typography>
              <Typography className={classes.heading}>
                <Tracking trackingNum = {s.shipment.trackingNum} label = {`Track ${s.shipment.carrier} ${s.shipment.trackingNum}`} carrier={s.shipment.carrier} />

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
                          {row.eventDate}
                        </TableCell>
                        <TableCell align="center">{row.shipmentEventDescription} {row.details}</TableCell>
                      </TableRow>

                    ))}
                  </TableBody>

                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary>
                  <Typography className={classes.heading}>Docs</Typography>
                  <Typography className={classes.secondaryHeading}>Shipment Files</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <TableBody>
                    {s.shipment.docs && s.shipment.docs.map(row => (

                      <TableRow key={row.id}>
                        <TableCell align="left">
                          {row.fileKey}
                        </TableCell>
                        <TableCell align="center"><Button color="secondary" variant="contained" onClick={()=>handleDownload(row.fileKey)}>Download</Button></TableCell>
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