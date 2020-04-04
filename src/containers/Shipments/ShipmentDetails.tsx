import React, {useReducer, useState} from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import { useAlert } from "react-alert";
import {
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  TableCell,
  Typography,
  TableBody } from '@material-ui/core';
import Image from "../../components/Image/Image";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link, useParams} from "react-router-dom";
import EditShipment from "./EditShipment";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";

const MERCHANTS = gql`
query merchants {
  merchants {
    id
    name
  }
}
`;

const SHIPMENT = gql`
query shipment($id: ID) {
  shipment(id: $id) {
      id
      actualShipCost
      latestCancelDate
      handlingInstructions
      reference
      trackingNum
      trackingLink
      shipmentMethod
      shipmentType
      shipmentStatus
      customerId
      merchantId
      pkgs {
        id
        packageType
        length
        width
        height
        weight
      }
      shipmentItems {
        id
        sequence
        quantity
        description
        shipmentId
        productId
      }
  }
}
`;
const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  bread: {
    marginBottom: theme.spacing(3),
  }
}));

export default function ShipmentDetails(props) {
  let { slug } = useParams();
  const { data:dp, loading:lp, error:ep, refetch:rp } = useQuery(SHIPMENT, {variables: {id: slug}, fetchPolicy: "network-only",context: { clientName: "adminLink" }});
  const { data:merchants, loading:merhcnatsLoading} = useQuery(MERCHANTS,{fetchPolicy: "network-only", context: { clientName: "shopLink" }});

  const alert = useAlert();
  const classes = useStyles();

  if (lp || merhcnatsLoading)
    return <div>Loading</div>

  console.log(dp);

  function sendToDetrack() {

  }

  return (

    <Grid container xs={12} spacing={1}>
      <Grid item md={6}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb" className={classes.bread}>
          <Link color="inherit" to="/">Home</Link>
          <Link color="inherit" to="/shipments">Shipments</Link>
          <Typography color="textPrimary">Shipment {dp.shipment.id}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={6}>
        <span style={{float: "right"}}><Button color="primary" variant="contained" onClick={sendToDetrack}>Send To Detrack</Button></span>
      </Grid>
      <Grid item xs={12}>
        <EditShipment shipment={dp.shipment} merchants={merchants} refreshShipment={rp}/>
      </Grid>
    </Grid>

  );
}
