import React, {useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { useAlert } from "react-alert";

import TextField from "@material-ui/core/TextField";
import {useForm} from "react-hook-form";

import {SortQueue} from "./components/SortQueue";
import {SectionCard} from "./Shipment.style";
import CardHeader from "@material-ui/core/CardHeader";
import { AcceptItemDialog } from "./components/AcceptItemDialog";
import { IssueItemDialog } from "./components/IssueItemDialog";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table, TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import ReactToPrint from "react-to-print";
import Grid from "@material-ui/core/Grid";
import {InventoryList} from "./components/InventoryList";
import {OutstandingQueue} from "./components/OutstandingQueue";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "react-reveal/Fade";
import {CreateShipmentDialog} from "./components/CreateShipmentDialog";
import {AddTrackingDialog} from "./components/AddTrackingDialog";


const MERCHANTS = gql`
query merchants {
  merchants {
    id
    name
  }
}
`;
const TRACKING_EVENTS = gql`
query trackingEvents {
  trackingEvents {
    id
    name
  }
}
`;

const CREATE_SHIPMENT = gql`
  mutation createShipment($shipment : ShipmentInput, $shipmentItems : [ShipmentItemInput], $trackingNums: [String]) {
    createShipment(shipment: $shipment, shipmentItems: $shipmentItems, trackingNums: $trackingNums) {
      id
      reference
    }
  }
`;
const ADD_TRACKING_EVENT = gql`
  mutation addTrackingEvent($trackingNums: [String], $shipmentStatus: ShipmentStatus, $trackingEvent: Int, $details: String) {
    addTrackingEvent(trackingNums: $trackingNums, shipmentStatus: $shipmentStatus, trackingEvent: $trackingEvent, details: $details) {
      value
    }
  }
`;
const SHIPMENT_ITEMS = gql`
query shipmentItemsByTrackingNums($trackingNums: [String]) {
  shipmentItemsByTrackingNums(trackingNums: $trackingNums) {
    id
    sequence
    quantity
    description
    purchaseShipments {
      purchaseItemId
      quantity
    }
    productId
  }
}
`;
const SHIPMENT_ITEMS_COUNT = gql`
query shipmentItemsCountByTrackingNums($trackingNums: [String]) {
  shipmentItemsCountByTrackingNums(trackingNums: $trackingNums) {
    trackingNum
    total
    processed
    status
  }
}
`;

const INVENTORY = gql`
query inventory {
  inventory {
        productId
    title
    sku
    received
    issued
    quantityOnHand    
    image
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
  titleField: {
    width: '25ch',
    size: 'small'
  },
}));

export default function ImportQueue() {
  const [createShipmentMutation] = useMutation(CREATE_SHIPMENT,{ context: { clientName: "adminLink" }});
  const [addTrackingEventMutation] = useMutation(ADD_TRACKING_EVENT,{ context: { clientName: "adminLink" }});
  const { data, loading, error, refetch } = useQuery(SHIPMENT_ITEMS, { context: { clientName: "adminLink" }});
  const { data: cntdata, loading: cntloading, error: cnterror, refetch: cntrefetch } = useQuery(SHIPMENT_ITEMS_COUNT, { context: { clientName: "adminLink" }});
  const { data: dataInventory, loading: loadingInventory, error: errorInventory, refetch: refetchInventory } = useQuery(INVENTORY, { context: { clientName: "adminLink" }});
  const { data:merchants, loading:merhcnatsLoading} = useQuery(MERCHANTS, {context: { clientName: "shopLink" }});
  const { data:events, loading:eLoading} = useQuery(TRACKING_EVENTS, {context: { clientName: "adminLink" }});
  const { register, handleSubmit, errors } = useForm();


  const [createShipmentDialog, setCreate] = useState(false);
  const [addTrackingDialog, setAdd] = useState(false);
  const [printLabelDialog, setPrintlabeldialog] = useState(false);
  const [label, setLabel] = useState('');
  const [item, setItem] = useState(-1);
  const [selected, setSelected] = useState([]);
  const [checkedId, setCheckedId] = useState([]);
  const [trackingNums, setTrackingnums] = useState("");

  const alert = useAlert();
  const classes = useStyles();
  const labelRef = useRef();

  const onCreateShipment = async (formData) => {
    console.log('handling issue',formData);
    const s = data.shipmentItemsByTrackingNums.filter(e => ~checkedId.indexOf(e.id)).map(({__typename, id, ...props}) => ({...props, from: id}));
    console.log(s);
    const trackingNumsSplit = trackingNums.split(/\r?\n/);
    let dto = {
       shipment: {
         reference: formData.reference,
         trackingNum: formData.trackingNum,
         shipmentStatus: 'PROCESSING',
         merchantId: formData.merchant.id,
         shipmentType: formData.shipmentType.value,
         shipmentMethod: formData.shipmentMethod.value
       },
       shipmentItems: s,
       trackingNums: trackingNumsSplit
      //description: state.item.description
    }
    const {
      data: { createShipment },
    }: any = await createShipmentMutation({
      variables: { ...dto },
    });
    if(createShipment)  {
      alert.success(createShipment.id);
    }
  }

  const addTrackingEvent = async (formData) => {
    console.log('handling issue',formData);
    const s = data.shipmentItemsByTrackingNums.filter(e => ~checkedId.indexOf(e.id)).map(({__typename, id, ...props}) => ({...props, from: id}));
    console.log(s);
    const trackingNumsSplit = trackingNums.split(/\r?\n/);
    let dto = {
       shipmentStatus: formData.shipmentStatus.value,
       trackingEvent: formData.trackingEvent.id,
       details: formData.details,
       trackingNums: trackingNumsSplit
      //description: state.item.description
    }
    const {
      data: { addTrackingEvent },
    }: any = await addTrackingEventMutation({
      variables: { ...dto },
    });
    if(addTrackingEvent)  {
      alert.success(addTrackingEvent.value);
    }
  }



  const handleCreate = (item) => {
    setCreate(true);
  };

  function handleSelectAll(event) {
    data.shipmentItemsByTrackingNums.forEach(x => setCheckedId(prevState => [...prevState, x.id]))
  }

  function handleCheckbox(event) {

    let value = event.target.value;
    console.log('handleCheckbox',value)

    if (!checkedId.includes(value)) {
      setCheckedId(prevState => [...prevState, value]);
    } else {
      setCheckedId(prevState => prevState.filter(id => id !== value));
    }
  }

  const handleRefetch = async x => {
    refetch({keyword: x.keyword});
  }
  const onClose = () => {
    setCreate(false)
    setPrintlabeldialog(false)
    setAdd(false)
  }
 // const handleAcceptClose = () => dispatch({type: 'SELECT_ACCEPT_ITEM_CANCEL'})
 // const handleIssueClose = () => dispatch({type: 'ISSUE_ITEM_CANCEL'})


  const onSubmit = e => {
    //console.log(data);
    //const trackingNums =  data["trackingNums"];
    console.log(trackingNums.split(/\r?\n/));
    refetch({trackingNums: trackingNums.split(/\r?\n/)});
    cntrefetch({trackingNums: trackingNums.split(/\r?\n/)});
    return false;
  }

  if(loadingInventory)
    return <></>

  function handleChange(event) {
    setTrackingnums(event.target.value)
  }

  function handleOpenAddTrackingEventDialog() {
    setAdd(true)
  }

  return (
    <>
      <Grid container xs={12} md={12} spacing={1}>
        <Grid item md={4}>

          <textarea name="trackingNums" onChange={handleChange}  value={trackingNums} rows={20} cols={40}/>
          <Button variant="contained" color="secondary" size="small" onClick={onSubmit} >Parse</Button>
          <Button variant="contained" color="secondary" size="small"  onClick={handleOpenAddTrackingEventDialog}>
            Add Tracking Event
          </Button>
        </Grid>
        <Grid item md={4}>
          <Table  size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Tracking #</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Processed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cntdata && cntdata.shipmentItemsCountByTrackingNums && cntdata.shipmentItemsCountByTrackingNums.map((item,b) => (
                <TableRow>
                  <TableCell>{item.trackingNum}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell>{item.processed}</TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>

      </Grid>
      <Dialog open={printLabelDialog} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Prep Item</DialogTitle>
        <DialogContent>
          <ReactToPrint
            trigger={() => <button>Print label!</button>}
            content={() => labelRef.current}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <span ref={labelRef}>{label}</span>
      <SectionCard>
        <CardHeader
          subheader="Items"
/*          action={
            <form onSubmit={hs3(handleRefetch)}>
              <TextField name="keyword" inputRef={r3({required: true})}/>
              <Button variant="contained" color="secondary" size="small" type="submit" >
                Search
              </Button>
            </form>
          }*/
        />
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                onClick={handleSelectAll}
                />
              </TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Seq</TableCell>
              <TableCell align="left">
                Description              </TableCell>
              <TableCell >
                Qty
              </TableCell>
              <TableCell >
                Product
              </TableCell>
              <TableCell align="right">PId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.shipmentItemsByTrackingNums && data.shipmentItemsByTrackingNums.map((item,b) => (
              <TableRow>
                <TableCell>
                  <Checkbox
                    name={item.id}
                    checked={checkedId.includes(item.id)}
                    onChange={handleCheckbox}
                    value={item.id}
                  />
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.sequence}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.productId ?
                  <a href={`http://www.badals.com/product/${item.productId}`} target="_blank">
                    {item.productId}
                  </a>:
                  <span>{item.productId}</span>
                }</TableCell>
                <TableCell>
                  {item.purchaseShipments && item.purchaseShipments.map((p) => (
                    <div> {p.purchaseItemId} </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
      <Button variant="contained" color="secondary" size="small"  disabled={checkedId.length < 1} onClick={handleCreate}>
        Create Shipment
      </Button>

      {merchants && <CreateShipmentDialog onSubmit={onCreateShipment} merchants={merchants} show={createShipmentDialog} onClose={onClose}/>}
      {events    && <AddTrackingDialog    onSubmit={addTrackingEvent} events={events}       show={addTrackingDialog}    onClose={onClose}/>}
    </>
  );
}
