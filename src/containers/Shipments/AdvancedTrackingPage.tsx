import React, { useState } from 'react';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';

import Checkbox from '../../components/CheckBox/CheckBox';
import { useAlert } from "react-alert";
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";

import {useForm} from "react-hook-form";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";

import useTheme from "@material-ui/core/styles/useTheme";

import {CreateShipmentDialog} from "./components/CreateShipmentDialog";
import {StatusMultiSelect} from "./components/StatusMultiSelect";
import {AcceptShipmentDialog} from "./components/AcceptShipmentDialog";
import {IncomingShipments} from "./queues/IncomingShipments";
import {CustomerShipmentList} from "./queues/CustomerShipmentList";
import {TransitShipmentList} from "./queues/TransitShipmentList";
import {TabPanel} from "../../components/TabPanel/TabPanel";
import {ImportAmazonCsvDialog} from "./components/ImportAmazonCsvDialog";
import AdvancedTracking from "../Orders/AdvancedTracking";

export default function AdvancedTrackingPage() {

  const [status, setStatus] = useState(['PENDING','PROCESSING']);

  const [tab, setTab] = React.useState(0);
  const alert = useAlert();

  function handleStatus(event) {
    setStatus(event.target.value);

  }

   function refetch(x) {

   }

   const handleChange = (event, newValue) => {
    if(tab != newValue) {
      setTab(newValue);

      console.log(newValue)
      if(newValue == 0) {
        refetch({
            viewName: "INCOMING"
          });
      }
      else if (newValue == 1) {
        refetch({
          viewName: "ALL_PURCHASE"
        });
      }
      else if (newValue == 2) {
        refetch({
          viewName: "UNCLOSED_TRANSIT"
        });
      }
      else if (newValue == 3) {
        refetch({
          viewName: "CANCELLED_TRANSIT"
        });
      }
      else if (newValue ==4) {
        refetch({
          viewName: "ALL_TRANSIT"
        });
      }
      else if (newValue == 5) {
        refetch({
          viewName: "CUSTOMER_SCHEDULED"
        });
      }
      else if (newValue == 6) {
        refetch({
          viewName: "CUSTOMER_FAILED"
        });
      }
    }

  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item  md={3} >
          <StatusMultiSelect handleStatus={handleStatus} status={status} />
        </Grid>
        <Grid item  md={2} >
        </Grid>
        <Grid  item  md={2} >
        </Grid>
        <Grid item  md={5} style={{textAlign: 'right'}}>

          <Link to="import-queue">
            <Button variant="contained" color="secondary">
              Import
            </Button>
          </Link>
          <Link to="inventory">
            <Button variant="contained" color="secondary">
              Inventory
            </Button></Link>
          <Link to="ship-queue">
            <Button variant="contained" color="primary">
              ShipQ
            </Button></Link>
        </Grid>

        <Grid item xs={12}>
          <AppBar position="static">
            <Tabs value={tab} onChange={handleChange}>
              <Tab label="Incoming"  />
              <Tab label="All Purchase"  />
              <Tab label="Unclosed"  />
              <Tab label="Cancelled Transit"  />
              <Tab label="All Transit"  />
              <Tab label="Customer Scheduled"  />
              <Tab label="Customer Failed"  />
            </Tabs>
          </AppBar>

          <TabPanel value={tab} index={0}>
            <AdvancedTracking id={null} showAll={false} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
          </TabPanel>
          <TabPanel value={tab} index={2}>
          </TabPanel>
          <TabPanel value={tab} index={3}>
          </TabPanel>
          <TabPanel value={tab} index={4}>
          </TabPanel>
          <TabPanel value={tab} index={5}>
          </TabPanel>
          <TabPanel value={tab} index={6}>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
}
