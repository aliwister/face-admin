import React, { useState } from 'react';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';

import Checkbox from '../../components/CheckBox/CheckBox';
import { useAlert } from "react-alert";
import { Link } from 'react-router-dom';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
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

const INCOMING_SHIPMENT_QUEUE = gql`
  query incomingShipmentQueue {
    incomingShipmentQueue {
      id
      createdDate
      trackingNum
      shipmentMethod
      pkgCount
      arrivedPkgs
      status
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
const MERCHANTS = gql`
query merchants {
  merchants {
    id
    name
  }
}
`;


const CREATE_SHIPMENT = gql`
  mutation createShipment($shipment: ShipmentInput) {
    createShipment(shipment: $shipment) {
      id
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
  const [merchant, setMerchant] = React.useState({id:0});
  const alert = useAlert();
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();
  const { data:merchants, loading:merhcnatsLoading} = useQuery(MERCHANTS, {context: { clientName: "shopLink" }});

  const [createShipmentMutation] = useMutation(CREATE_SHIPMENT,{context: { clientName: "adminLink" }});


/*  const { data, error, refetch } = useQuery(SHIPMENTS, {
    variables: {
      status: status,
      type: 'CUSTOMER'
    },
    fetchPolicy: "network-only",
    context: { clientName: "adminLink" }
  });  */

  const { data, error, refetch } = useQuery(INCOMING_SHIPMENT_QUEUE, {
/*    variables: {
      status: status,
      type: 'CUSTOMER'
    },*/
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
  };

  if(merhcnatsLoading) {
    return <div>Loading</div>
  }
  const onSubmit = data => console.log(data);

  const handleSubmitNewShipment = async data => {
    console.log(data);
    // @ts-ignore
    const dto = {
      ...data,
      shipmentStatus: 'PROCESSING',
      merchantId: data.merchant.id,
      shipmentType: data.shipmentType.value,
      shipmentMethod: data.shipmentMethod.value
    };
    console.log(dto);
    delete dto['merchant'];
    const {
      data: { createShipment },
    }: any = await createShipmentMutation({
      variables: { shipment: dto },
    });
    if(createShipment)  {
      alert.success(createShipment.id);
      history.push('/shipment-details/'+createShipment.id+'/EDIT');
    }
  }



  function handleAcceptButton() {
    setAcceptdialog(true);
  }

  function handleCreateButton() {
    setCreatedialog(true);
  }

  function handlePrepareButton() {
  }

  const handleChange = (event, newValue) => {
    if(tab != newValue) {
      setTab(newValue);
      if(newValue == 0) {
        refetch({
            status: status,
            type: 'CUSTOMER'
          });
      }
      if (newValue == 1) {
        refetch({
          status: status,
          type: 'PURCHASE'
        });
      }
    }

  };

  function handleUploader() {

  }
  function handleUpload() {

  }

  return (
    <>
      <CreateShipmentDialog show={createdialog} onClose={handleClose} onSubmit={handleSubmitNewShipment} merchants={merchants} />
      <AcceptShipmentDialog show={acceptdialog} onClose={handleClose} />
      <Grid container spacing={1}>
        <Grid item  md={3} >
          <StatusMultiSelect handleStatus={handleStatus} status={status} />
        </Grid>
        <Grid item  md={2} >
        </Grid>
        <Grid  item  md={2} >
        </Grid>
        <Grid item  md={5} style={{textAlign: 'right'}}>
          <Button variant="contained" color="primary" onClick={handleCreateButton} >
            Create
          </Button>
          <Button variant="contained" color="primary" onClick={handleAcceptButton} >
            Accept
          </Button>
          <Button variant="contained" color="primary" onClick={handlePrepareButton} >
            Prepare
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
              <Tab label="Customer"  />
              <Tab label="Purchase"  />
              <Tab label="Transit"  />
              <Tab label="Return"  />
            </Tabs>
          </AppBar>

          <TableContainer component={Paper}>
            {data && <IncomingShipments data={data}/>}
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
