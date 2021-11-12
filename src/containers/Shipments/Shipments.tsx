import React, { useState } from 'react';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';


import { Link } from 'react-router-dom';
import {
  Grid
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";


import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";


import {CreateShipmentDialog} from "./components/CreateShipmentDialog";
import {StatusMultiSelect} from "./components/StatusMultiSelect";
import {AcceptShipmentDialog} from "./components/AcceptShipmentDialog";
import {IncomingShipments} from "./queues/IncomingShipments";
import {CustomerShipmentList} from "./queues/CustomerShipmentList";
import {TransitShipmentList} from "./queues/TransitShipmentList";
import {TabPanel} from "../../components/TabPanel/TabPanel";
import {ImportAmazonCsvDialog} from "./components/ImportAmazonCsvDialog";

const SHIPMENT_QUEUE = gql`
  query shipmentList($viewName: ShipmentListView) {
    shipmentList(viewName: $viewName) {
      id
      createdDate
      trackingNum
      shipmentMethod
      pkgCount
      arrivedPkgs
      status
      sender
      receiver
    }
  }
`;

const SHIPMENTS = gql`
  query shipments($status: [ShipmentStatus], $type: ShipmentType) {
      shipments(status: $status, type:$type) {
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
        customerFirstName
        customerLastName
        merchantName
      }

  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },

}));



export default function Shipments() {
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(['PENDING','PROCESSING']);
  const [limit, setLimit] = useState([]);
  const [search, setSearch] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [acceptdialog, setAcceptdialog] = React.useState(false);
  const [createdialog, setCreatedialog] = React.useState(false);
  const [importcsvdialog, openImportcsvdialog] = React.useState(false);

  const { data, error, refetch } = useQuery(SHIPMENT_QUEUE, {
    variables: {
      viewName: 'INCOMING'
    },
    context: { clientName: "adminLink" }
  });

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function handleStatus(event) {
    setStatus(event.target.value);
    /*
    if (value.length) {
      refetch({
        status: value,
        type: 'CUSTOMER'
      });
    } else {
      refetch({ status: 'PENDING', type: 'CUSTOMER'});
    }*/
  }

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.orders.map(order => order.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }
  function handleCheckbox(event) {
    const { name } = event.currentTarget;
    if (!checkedId.includes(name)) {
      setCheckedId(prevState => [...prevState, name]);
    } else {
      setCheckedId(prevState => prevState.filter(id => id !== name));
    }
  }


  const handleClose = () => {
    setAcceptdialog(false);
    setCreatedialog(false);
    openImportcsvdialog(false);
  };

  const onSubmit = data => console.log(data);



  function handleAcceptButton() {
    setAcceptdialog(true);
  }

  function handleImportCsvButton() {
    openImportcsvdialog(true);
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

      <AcceptShipmentDialog show={acceptdialog} onClose={handleClose} />
      <ImportAmazonCsvDialog show={importcsvdialog} onClose={handleClose} />
      <Grid container spacing={1}>
        <Grid item  md={3} >
          <StatusMultiSelect handleStatus={handleStatus} status={status} />
        </Grid>
        <Grid item  md={2} >
        </Grid>
        <Grid  item  md={2} >
        </Grid>
        <Grid item  md={5} style={{textAlign: 'right'}}>
          <CreateShipmentDialog  defaults={{}} forward={true}/>
          <Button variant="contained" color="primary" onClick={handleAcceptButton} >
            Accept
          </Button>
{/*          <Button variant="contained" color="primary" onClick={handlePrepareButton} >
            Prepare
          </Button>*/}
          <Button variant="contained" color="primary" onClick={handleImportCsvButton} >
            Import CSV
          </Button>

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
            {data && <IncomingShipments data={data}/>}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            {data && <IncomingShipments data={data}/>}
          </TabPanel>
          <TabPanel value={tab} index={2}>
            {data && <TransitShipmentList data={data} refetch={refetch}/>}
          </TabPanel>
          <TabPanel value={tab} index={3}>
            {data && <TransitShipmentList data={data} refetch={refetch}/>}
          </TabPanel>
          <TabPanel value={tab} index={4}>
            {data && <TransitShipmentList data={data} refetch={refetch}/>}
          </TabPanel>
          <TabPanel value={tab} index={5}>
            {data && <CustomerShipmentList data={data}  refetch={refetch}/>}
          </TabPanel>
          <TabPanel value={tab} index={6}>
            {data && <CustomerShipmentList data={data} refetch={refetch}/>}
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
}
