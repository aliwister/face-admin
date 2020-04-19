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
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import ReactToPrint from "react-to-print";
import Grid from "@material-ui/core/Grid";
import {InventoryList} from "./components/InventoryList";


const ISSUE_ITEM = gql`
  mutation issueItem($orderItemId : Long, $productId : Long, $description : String, $quantity : BigDecimal) {
    issueItem(orderItemId: $orderItemId, productId: $productId, description: $description, quantity: $quantity) {
      id
      shipmentId
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

export default function Inventory() {
  const [issueItemMutation] = useMutation(ISSUE_ITEM,{ context: { clientName: "adminLink" }});
  const { data, loading, error, refetch } = useQuery(SORT_QUEUE, { context: { clientName: "adminLink" }});
  const { data: dataInventory, loading: loadingInventory, error: errorInventory, refetch: refetchInventory } = useQuery(INVENTORY, { context: { clientName: "adminLink" }});
  const { register:r3, handleSubmit:hs3, errors:e3 } = useForm();

  const [issueItemDialog, setIssueitemdialog] = useState(false);
  const [printLabelDialog, setPrintlabeldialog] = useState(false);
  const [label, setLabel] = useState('');
  const [item, setItem] = useState(-1)


  const alert = useAlert();
  const classes = useStyles();
  const labelRef = useRef();

  const handleIssueItem = async (data) => {
    console.log('handling issue',data);
    let dto = {
      ...data,
     // productId: state.item.productId,
      //description: state.item.description
    }
    const {
      data: { issueItem },
    }: any = await issueItemMutation({
      variables: { ...dto },
    });
    if(issueItem)  {
      alert.success(issueItem.id);
      //dispatch({type:'ISSUE_ITEM_END'});
      //dispatch({type:'PRINT_LABEL_START', payload:issueItem});
    }
  }

  const handleProcess = (item) => {
   // dispatch({type: 'SELECT_ACCEPT_ITEM_START', payload:item})
  };

  const handleRefetch = async x => {
    refetch({keyword: x.keyword});
  }
  const onClose = () => setIssueitemdialog(false)
 // const handleAcceptClose = () => dispatch({type: 'SELECT_ACCEPT_ITEM_CANCEL'})
 // const handleIssueClose = () => dispatch({type: 'ISSUE_ITEM_CANCEL'})

  if(loadingInventory)
    return <></>

  return (
    <>
      <Grid container xs={12} md={12} spacing={1}>
        <Grid item md={4}>

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
          subheader="Inventory"
/*          action={
            <form onSubmit={hs3(handleRefetch)}>
              <TextField name="keyword" inputRef={r3({required: true})}/>
              <Button variant="contained" color="secondary" size="small" type="submit" >
                Search
              </Button>
            </form>
          }*/
        />
        <InventoryList
          data={dataInventory}
          classes={classes}
          handleProcess={handleProcess}
          selected={item}
        />
      </SectionCard>


      <SectionCard>
        <CardHeader
          subheader="Sort"
          action={
            <form onSubmit={hs3(handleRefetch)}>
              <TextField name="keyword" inputRef={r3({required: true})}/>
              <Button variant="contained" color="secondary" size="small" type="submit" >
                Search
              </Button>
            </form>
          }
        />
        <SortQueue
          data={data}
          classes={classes}
          handleProcess={handleProcess}
        />
      </SectionCard>
{/*      {issueItemDialog &&
      <IssueItemDialog item={item} open={issueItemDialog} onClose={handleIssueClose} onSubmit={handleIssueItem} />
      }*/}
    </>
  );
}
