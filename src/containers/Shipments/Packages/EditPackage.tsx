import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { useAlert } from "react-alert";

import TextField from "@material-ui/core/TextField";
import {useForm} from "react-hook-form";

import {SortQueue} from "../components/SortQueue";
import {SectionCard} from "../Shipment.style";
import CardHeader from "@material-ui/core/CardHeader";

import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import ReactToPrint from "react-to-print";
import {AddItemDialog} from "../components/AddItemDialog";
import {useSetShipmentStatusMutation} from "../../../codegen/generated/_graphql";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";

const ADD_ITEM = gql`
  mutation addItem($shipmentId : Long, $productId : Long, $purchaseItemId: Long, $description : String, $quantity : BigDecimal) {
    addItem(shipmentId: $shipmentId, productId: $productId, purchaseItemId: $purchaseItemId, description: $description, quantity: $quantity) {
      value
    }
  }
`;

const REMOVE_ITEM = gql`
  mutation removeItem($shipmentItemId : Long) {
    removeItem(shipmentItemId: $shipmentItemId) {
      value
    }
  }
`;

const UNPACK_ITEM = gql`
  mutation unpackItem($shipmentItemId : Long) {
    unpackItem(shipmentItemId: $shipmentItemId) {
      value
    }
  }
`;

const SORT_QUEUE = gql`
query sortQueue($keyword: String) {
  sortQueue(keyword: $keyword) {
    id
    description
    quantity
    price
    image
    sku
    cost
    url
    productId
    merchantId
    orderItemId
    orderId
    preallocated
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

export default function EditPackage({state, dispatch, refreshShipment}) {
  const [addItemMutation] = useMutation(ADD_ITEM,{ context: { clientName: "adminLink" }});
  const [removeItemMutation] = useMutation(REMOVE_ITEM,{ context: { clientName: "adminLink" }});
  const [unpackItemMutation] = useMutation(UNPACK_ITEM,{ context: { clientName: "adminLink" }});
  const { data, loading, error, refetch } = useQuery(SORT_QUEUE, { context: { clientName: "adminLink" }});
  const { register:r3, handleSubmit:hs3, errors:e3 } = useForm();

  const [setStatusMutation] = useSetShipmentStatusMutation({ context: { clientName: "adminLink" }});

  const alert = useAlert();
  const classes = useStyles();
  const labelRef = useRef();

  const handleCloseShipment = () => dispatch({type: 'CLOSE_SHIPMENT_START', payload: state.shipment.id});
  const handleCancelShipment = () => dispatch({type: 'CANCEL_SHIPMENT_START', payload: state.shipment.id});

  const cancelShipment = async => {
    return setShipmentStatus('CANCELED');
  }

  const closeShipment = async => {
    return setShipmentStatus('CLOSED');
  }

  const setShipmentStatus = async (status) => {
    const {
      data: { setShipmentStatus },
    }: any = await setStatusMutation({
      variables: { id: state.shipment.id, status: status},
    });
    if(setShipmentStatus) {
      alert.success(setShipmentStatus.value);
      onCancel()
    }
  }


  const handleAddItem = async (formData) => {
    console.log('handlin accept',formData);
    let dto = {
      ...formData,
      shipmentId: state.shipment.id,
      //pkgId: state.pkg.id,
      purchaseItemId: state.item.id,
      description: state.item.description,
      quantity: formData.quantity
    }
    const {
      data: { addItem },
    }: any = await addItemMutation({
      variables: { ...dto },
    });
    if(addItem)  {
      alert.success(addItem.value);
      dispatch({type:'SELECT_ADD_ITEM_END'});
      refetch();
    }
  }

  const handleRemoveItem = async (data) => {
    if (state.context === 'PKG')
      return handleUnpackItem(data);
    let dto = {
      shipmentItemId: state.item
    }
    const {
      data: { removeItem },
    }: any = await removeItemMutation({
      variables: { ...dto },
    });
    if(removeItem)  {
      alert.success(removeItem.value);
      refreshShipment({id: state.shipment.id});
      dispatch({type:'REMOVE_ITEM_END'});
    }
  }
  const handleUnpackItem = async (data) => {
    let dto = {
      shipmentItemId: state.item
    }
    const {
      data: { unpackItem },
    }: any = await unpackItemMutation({
      variables: { ...dto },
    });
    if(unpackItem)  {
      alert.success(unpackItem.value);
      dispatch({type:'REMOVE_ITEM_END'});
      refetch();
    }
  }

  const handleProcess = (item) => {
    dispatch({type: 'SELECT_ADD_ITEM_START', payload:item})
  };

  const handleRefetch = async x => {
    refetch({keyword: x.keyword});
  }

  const onClose = () => dispatch({type: 'PRINT_LABEL_CANCEL'})
  const onCancel = () => dispatch({type: 'CLOSE_CANCEL_SHIPMENT_CANCEL'})
  const handleAcceptClose = () => dispatch({type: 'SELECT_ACCEPT_ITEM_CANCEL'})
  const handleIssueClose = () => dispatch({type: 'ISSUE_ITEM_CANCEL'})

  return (
    <>
      <Dialog open={state.printLabelDialog} onClose={onClose} aria-labelledby="form-dialog-title">
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

      <span ref={labelRef}>{state.label}</span>
      <SectionCard>
        <CardHeader
          subheader="Sort"
          action={
            <form onSubmit={hs3(handleRefetch)}>
              <TextField name="keyword" inputRef={r3({required: true})}/>
              <Button variant="contained" color="secondary" size="small" type="submit" >{/*disabled={!state.pkg}>*/}
                Search
              </Button>
            </form>
          }
        />
        {(state.shipment.shipmentType === 'PURCHASE' || state.shipment.shipmentType === 'TRANSIT') &&
        <SortQueue
          data={data}
          classes={classes}
          handleProcess={handleProcess}
        />}
      </SectionCard>
      <SectionCard>
        <CardHeader
          subheader="Actions"
          action={
            <>
              <Button variant="contained" color="secondary" onClick = {() => handleCloseShipment()}>Close</Button>
              <Button variant="contained" color="secondary" onClick = {() => handleCancelShipment()}>Cancel</Button>
            </>
          }/>
      </SectionCard>
      {state.addItemDialog &&
      <AddItemDialog item={state.item} open={state.addItemDialog} onClose={handleAcceptClose} onSubmit={handleAddItem}/>
      }

      <div>
        {state.closeShipmentConfirmDialog &&
        <ConfirmDialog title="Close Shipment?" open={state.closeShipmentConfirmDialog} cancel={onCancel} onConfirm={closeShipment}>
          Are you sure you want to close this shipment?
        </ConfirmDialog>}
        {state.cancelShipmentConfirmDialog &&
        <ConfirmDialog title="Cancel Shipment?" open={state.cancelShipmentConfirmDialog} cancel={onCancel} onConfirm={cancelShipment}>
          Are you sure you want to cancel this shipment?
        </ConfirmDialog>}
        {state.removeItemConfirmDialog &&
        <ConfirmDialog title="Remove Item?" open={state.removeItemConfirmDialog} cancel={onCancel} onConfirm={handleRemoveItem}>
          Are you sure you want to remove this item? (Note: if issued, will be unissued)
        </ConfirmDialog>}
      </div>

    </>
  );
}
