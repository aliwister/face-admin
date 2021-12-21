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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link, useParams} from "react-router-dom";
import EditShipment from "./EditShipment";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import { useShipmentQuery } from 'codegen/generated/_graphql';

const MERCHANTS = gql`
query merchants {
  merchants {
    id
    name
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
  let { slug, action } = useParams();
  console.log(action);
  const { data:dp, loading:lp, error:ep, refetch:rp } = useShipmentQuery({variables: {id: slug}, fetchPolicy: "network-only",context: { clientName: "adminLink" }});
  const { data:merchants, loading:merhcnatsLoading} = useQuery(MERCHANTS,{fetchPolicy: "network-only", context: { clientName: "shopLink" }});

  const alert = useAlert();
  const classes = useStyles();

  if (lp || merhcnatsLoading)
    return <div>Loading</div>

  return (
    <Grid container xs={12} spacing={1}>
      <Grid item md={6}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb" className={classes.bread}>
          <Link color="inherit" to="/">Home</Link>
          <Link color="inherit" to="/shipments">Shipments</Link>
          <Typography color="textPrimary">Shipment {dp.shipment.id} - {dp.shipment.shipmentStatus}
            {(dp.shipment.shipmentStatus === "ACCEPTED") && <Link to="EDIT"> <EditIcon/></Link>}
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={6}>

      </Grid>
      <Grid item xs={12}>

        <EditShipment shipment={dp.shipment} merchants={merchants} refreshShipment={rp} action={action}/>
      </Grid>
    </Grid>
  );
}
