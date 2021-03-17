import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useAlert } from "react-alert";
import TextField from "@material-ui/core/TextField";
import ReceivePackage from "./Packages/ReceivePackage";
import CardHeader from "@material-ui/core/CardHeader";
import { SectionCard } from './Shipment.style';
import { ShipmentItems } from "./components/ShipmentItems";

import {CreatePkgDialog} from "./components/CreatePkgDialog";
import {PurchaseShipmentDetailsForm} from "./components/PurchaseShipmentDetailsForm";
import {CustomerShipmentDetailsForm} from "./components/CustomerShipmentDetailsForm";
import PrepPackage from "./Packages/PrepPackage";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import {ListItem} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import {SendToDetrackDialog} from "./components/SendToDetrackDialog";
import EditPackage from "./Packages/EditPackage";

import {adminAPI} from "../../api/config";
import { useShipmentItemDetailsQuery, usePkgItemDetailsQuery} from "../../codegen/generated/_graphql";
import AuditHistory from "../Orders/AuditHistory";

const ACCEPT_PACKAGE = gql`
  mutation acceptPackage($pkg: PackageInput) {
    acceptPackage(pkg: $pkg) {
      id
    }
  }
`;
const SAVE_SHIPMENT = gql`
  mutation saveShipment($shipment: ShipmentInput) {
    saveShipment(shipment: $shipment) {
      id
    }
  }
`;
const SEND_TO_DETRACK = gql`
  mutation sendToDetrack($shipmentId: Long, $orderId: Long, $name: String, $instructions: String, $date: String, $time: String, $assignTo: String) {
    sendToDetrack(shipmentId: $shipmentId, orderId: $orderId, name: $name, instructions: $instructions, date: $date, time: $time, assignTo: $assignTo) {
      value
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
	textField: {
		fontSize: '23px',
		marginBottom: theme.spacing(1),
	},
}));

function reducer(state, action) {
  console.log(action, state);
  switch (action.type) {
    case 'ADD_PACKAGE_START':
      return {
        ...state,
        pkgDialog: true
      }
    case 'ADD_PACKAGE_CANCEL':
      return {
        ...state,
        pkgDialog: false
      }
    case 'ADD_PACKAGE_END':
      return {
        ...state,
        pkgDialog: false,
        selectedPkgIndex: -1,
        pkg: null
        //pkg: action.payload
      }
    case 'SELECT_PACKAGE':
      return {
        ...state,
        pkg: {
          ...action.payload.pkg
        },
        selectedPkgIndex: action.payload.index,
        selectedPkgId: action.payload.selectedPkgId
      }
    case 'SELECT_ACCEPT_ITEM_START':
      return {
        ...state,
        item: action.payload,
        acceptItemDialog: true
      }
    case 'SELECT_ADD_ITEM_START':
      return {
        ...state,
        item: action.payload,
        addItemDialog: true
      }
    case 'SELECT_ADD_ITEM_END':
      return {
        ...state,
        item: null,
        addItemDialog: false
      }
/*    case 'ACCEPT_ITEM_START':
      return {
        ...state,
        acceptItemDialog: true,
      }*/
    case 'SELECT_ACCEPT_ITEM_CANCEL':
      return {
        ...state,
        acceptItemDialog: false,
        item: null
      }
    case 'ISSUE_ITEM_START':
      return {
        ...state,
        issueItemDialog: true,
        acceptItemDialog: false
      }
    case 'ISSUE_ITEM_END':
      return {
        ...state,
        issueItemDialog: false,
        item: null
      }
    case 'ISSUE_ITEM_CANCEL':
      return {
        ...state,
        issueItemDialog: false,
      }
    case 'PREP_ITEM_START':
      return {
        ...state,
        item: action.payload,
        prepItemDialog: true,
      }

    case 'PREP_ITEM_END':
      return {
        ...state,
        prepItemDialog: false,
        item: null
      }
    case 'PREP_ITEM_CANCEL':
      return {
        ...state,
        prepItemDialog: false,
      }
    case 'PRINT_LABEL_START':
      return {
        ...state,
        issueItemDialog: false,
        printLabelDialog: true,
        label: action.payload.id + '-' + action.payload.shipmentId,
      }
    case 'PRINT_LABEL_CANCEL':
      return {
        ...state,
        printLabelDialog: false,
      }
    case 'SEND_TO_DETRACK_START':
      return {
        ...state,
        sendDetrackDialog: true,
      }
    case 'SEND_TO_DETRACK_CANCEL':
    case 'SEND_TO_DETRACK_END':
      return {
        ...state,
        sendDetrackDialog: false
      }
    case 'CLOSE_SHIPMENT_START':
      return {
        ...state,
        item: action.payload,
        closeShipmentConfirmDialog: true,
      }
    case 'CANCEL_SHIPMENT_START':
      return {
        ...state,
        item: action.payload,
        cancelShipmentConfirmDialog: true,
      }
    case 'REMOVE_ITEM_FROM_SHIPMENT_START':
      console.log('here');
      return {
        ...state,
        item: action.payload,
        removeItemConfirmDialog: true,
        context: 'SHIPMENT'
      }
    case 'REMOVE_ITEM_FROM_PKG_START':
      console.log('here');
      return {
        ...state,
        item: action.payload,
        removeItemConfirmDialog: true,
        context: 'PKG'
      }
    case 'REMOVE_ITEM_END':
      console.log('here');
      return {
        ...state,
        removeItemConfirmDialog: false,
      }
    case 'CLOSE_CANCEL_SHIPMENT_CANCEL':

      return {
        ...state,
        item: action.payload,
        cancelShipmentConfirmDialog: false,
        closeShipmentConfirmDialog: false,
        removeItemConfirmDialog: false,
      }
    default:
      return state;
  }
}

export default function EditShipment({shipment, merchants, refreshShipment, action}) {
  const [acceptPackageMutation] = useMutation(ACCEPT_PACKAGE,{ context: { clientName: "adminLink" }});
  const [saveShipmentMutation] = useMutation(SAVE_SHIPMENT,{ context: { clientName: "adminLink" }});
  const [sendDetrackMutation]  = useMutation(SEND_TO_DETRACK,{ context: { clientName: "adminLink" }});



  const alert = useAlert();
  const classes = useStyles();

  const INITIAL_STATE = {
    error: null,
    shipment: shipment,
    pkg: null,
    pkgDialog: false,
    acceptItemDialog: false,
    issueItemDialog: false,
    prepItemDialog: false,
    printLabelDialog: false,
    item: null,
    selectedPkgIndex: -1,
    selectedPkgId: -1,
    sendDetrackDialog: false
  };
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { data, loading, error, refetch } = useShipmentItemDetailsQuery({variables: {id: shipment.id}, fetchPolicy: "network-only",context: { clientName: "adminLink" }});
  const { data:dp, loading:lp, error:ep, refetch:rp } = usePkgItemDetailsQuery({variables: {id: state.selectedPkgId}, fetchPolicy: "network-only",context: { clientName: "adminLink" }, skip: state.selectedPkgIndex < 0});

  const handleAcceptPackage = async (data) => {
	  console.log(data);
	  let dto = {
		  ...data,
      packageType: data.packageType.value,
		  shipmentId: shipment.id
	  }
    const {
      data: { acceptPackage },
    }: any = await acceptPackageMutation({
      variables: { pkg: dto },
    });
    if(acceptPackage)  {
      alert.success("Package added successfully");
      refreshShipment({id:shipment.id});
      dispatch({type:'ADD_PACKAGE_END'})
    }
  }
  const handleDetrackSubmit = async (data) => {
	  console.log(data);
	  let dto = {
      orderId: shipment.reference,
      name: shipment.customerFirstName + " " + shipment.customerLastName,
      instructions: shipment.handlingInstructions,
      date: shipment.estimated_ship_date,
      time: 'morning',
      assignTo: data.assignTo? data.assignTo.value: null,
		  shipmentId: shipment.id
	  }
    const {
      data: { sendToDetrack },
    }: any = await sendDetrackMutation({
      variables: { ...dto },
    });
    if(sendToDetrack)  {
      alert.success(sendToDetrack.value);
      //window.open(process.env.ADMIN_APP_API+'/import/detrack-label?id='+sendToDetrack.results.do, '_blank', 'noopener,noreferrer')

      adminAPI.get(`/import/detrack-label?id=${shipment.id + "-" + shipment.reference}`)
        .then(response => {
//Create a Blob from the PDF Stream
          const file = new Blob(
            [response.data],
            {type: 'application/pdf'});
//Build a URL from the file
          const fileURL = URL.createObjectURL(file);
//Open the URL on new Window
          window.open(fileURL);
        })
        .catch(error => {
          console.log(error);
        });


      refreshShipment({id:shipment.id})
      dispatch({type:'SEND_TO_DETRACK_END'})
    }
  }
  const handleListItemClick = (event, index) => {
    dispatch({type: 'SELECT_PACKAGE', payload: {index: index, selectedPkgId: shipment.pkgs[index].id, pkg: shipment.pkgs[index]}})
  };
  const handleClose = () => dispatch({type: 'ADD_PACKAGE_CANCEL'});
  const handleAcceptPackageDialog = () => dispatch({type: 'ADD_PACKAGE_START'});
  const handleSaveShipment = async data => {
    console.log(data);
    // @ts-ignore
    const dto = {
      ...data,
      shipmentStatus: 'PROCESSING',
      merchantId: data.merchant.id,
      partyId: data.party.id,
    };
    delete dto['merchant'];
    delete dto['party'];

    const {
      data: { saveShipment },
    }: any = await saveShipmentMutation({
      variables: { shipment: dto },
    });
    if(saveShipment)  {
      alert.success("Shipment "+saveShipment.id+" saved successfully");
      refreshShipment({id:shipment.id})
    }
  }


  const handleDetrackStart = () => dispatch({type:'SEND_TO_DETRACK_START'});
  const handleDetrackCancel = () => dispatch({type:'SEND_TO_DETRACK_CANCEL'});

  const handleRemoveFromShipment = (item) => dispatch({type: 'REMOVE_ITEM_FROM_SHIPMENT_START', payload: item})
  const handleRemoveFromPkg = (item) => dispatch({type: 'REMOVE_ITEM_FROM_PKG_START', payload: item})

  return (
	  <Grid container xs={12} md={12} spacing={1}>
		  <Grid item md={4}>
        <SendToDetrackDialog onSubmit={handleDetrackSubmit} onClose={handleDetrackCancel} open={state.sendDetrackDialog} />
        {(shipment.shipmentType === 'PURCHASE' || shipment.shipmentType === 'TRANSIT') &&
          <PurchaseShipmentDetailsForm merchants={merchants.merchants} shipment={state.shipment} onSubmit={handleSaveShipment}/>
        }
        {(shipment.shipmentType === 'CUSTOMER') &&
          <CustomerShipmentDetailsForm shipment={state.shipment} onSubmit={handleSaveShipment}/>
        }
        <SectionCard>
          <Button color="primary" variant="contained" onClick={handleDetrackStart}>Send To Detrack</Button>
        </SectionCard>
        <SectionCard>
          <CardHeader subheader="Packages"
            action={<Button variant="contained" color="primary" size="small" onClick={handleAcceptPackageDialog}>Add Package</Button>}
          />
          <List>
            {shipment.pkgs && shipment.pkgs.map((a,i) =>
              <ListItem button
                        selected={state.selectedPkgIndex === i}
                        onClick={(event) => handleListItemClick(event, i)}>
                <ListItemText
                  primary={`${a.packageType} ${a.id}`}
                  secondary= {`${a.length} x ${a.width} x ${a.height}, ${a.weight}`}
                />
              </ListItem>
            )}
          </List>
        </SectionCard>
      </Grid>
      <Grid item md={8}>
        {data &&
        <ShipmentItems state={data.shipmentItemDetails} dispatch={dispatch} label={"Shipment Items"}
                       handleDeleteItem={handleRemoveFromShipment}/>
        }
        {state.pkg && dp &&
        <ShipmentItems state={dp.pkgItemDetails} dispatch={dispatch} label={"Package Items"} handleDeleteItem={handleRemoveFromPkg}/>
        }
        {/*shipment.shipmentType === 'PURCHASE'*/}
        {(action == 'RECEIVE' ) &&
          <ReceivePackage state={state} dispatch={dispatch}/>
        }
        {(action == 'PREP' ) &&
          <PrepPackage state={state} dispatch={dispatch} refreshShipment={refetch}/>
        }
        {(action == 'EDIT' ) &&
          <EditPackage state={state} dispatch={dispatch} refreshShipment={refetch}/>
        }
      </Grid>
      <CreatePkgDialog onSubmit={handleAcceptPackage} handleClose={handleClose} open={state.pkgDialog} />
      <Grid item md={12}>
        {state.shipment && <AuditHistory id={state.shipment.id} type={"shipment"}/>}
      </Grid>
	  </Grid>

  );
}
