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
import { AcceptItemDialog } from "../components/AcceptItemDialog";
import { IssueItemDialog } from "../components/IssueItemDialog";
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import ReactToPrint from "react-to-print";
import {PrepQueue} from "../components/PrepQueue";

const ACCEPT_ITEM = gql`
  mutation acceptItem($shipmentItemId: Long,  $packageId: Long, $accepted: BigDecimal, $rejected: BigDecimal) {
    acceptItem(shipmentItemId: $shipmentItemId,  packageId: $packageId, accepted: $accepted, rejected: $rejected) {
      value
    }
  }
`;
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
    orderId
    preallocated
  }
}`;
const PREP_QUEUE = gql`
query prepQueue($shipmentId: Long, $keyword: String ="") {
  prepQueue(shipmentId: $shipmentId, keyword: $keyword) {
    id
    description
    quantity
    image
    unpacked
    productId
    orderItemId
    orderId
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

export default function ReceivePackage({state, dispatch}) {
  const [acceptItemMutation] = useMutation(ACCEPT_ITEM,{ context: { clientName: "adminLink" }});
  const [issueItemMutation] = useMutation(ISSUE_ITEM,{ context: { clientName: "adminLink" }});
  //const { data, loading, error, refetch } = useQuery(SORT_QUEUE, { context: { clientName: "adminLink" }});
  const { data, loading, error, refetch } = useQuery(PREP_QUEUE, {variables: {shipmentId: state.shipment.id, keyword: ""}, context: { clientName: "adminLink" }});

  const { register:r3, handleSubmit:hs3, errors:e3 } = useForm();

  const alert = useAlert();
  const classes = useStyles();
  const labelRef = useRef();

  const handleAcceptItem = async (formData) => {
    console.log('handlin accept',formData);
    if(!state.pkg)
      return alert.error("SELECT PKG First");
    let dto = {
      accepted: formData.accepted,
      rejected: formData.rejected,
      shipmentItemId: state.item.id,
      packageId: state.pkg.id,
    }
    const {
      data: { acceptItem },
    }: any = await acceptItemMutation({
      variables: { ...dto },
    });
    if(acceptItem)  {
      alert.success(acceptItem.value);
      refetch();
      dispatch({type:'ISSUE_ITEM_START'});
    }
  }

  const handleIssueItem = async (data) => {
    console.log('handling issue',data);
    if(!state.item.orderItemId )
      return alert.error("No order id associated with this item. You can allocate in inventory");
    let dto = {
      ...data,
      productId: state.item.productId,
      description: state.item.description
    }
    const {
      data: { issueItem },
    }: any = await issueItemMutation({
      variables: { ...dto },
    });
    if(issueItem)  {
      alert.success(issueItem.id);
      //dispatch({type:'ISSUE_ITEM_END'});
      dispatch({type:'PRINT_LABEL_START', payload:issueItem});
    }
  }

  const handleProcess = (item) => {
    dispatch({type: 'SELECT_ACCEPT_ITEM_START', payload:item})
  };

  const handleRefetch = async x => {
    refetch({shipmentId: state.shipment.id, keyword: x.keyword});
  }
  const onClose = () => dispatch({type: 'PRINT_LABEL_CANCEL'})
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
              <Button variant="contained" color="secondary" size="small" type="submit" disabled={!state.pkg}>
                Search
              </Button>
            </form>
          }
        />
        {data && <PrepQueue
            queue={data.prepQueue}
            classes={classes}
            handleProcess={handleProcess}
        />}
      </SectionCard>
      {state.acceptItemDialog &&
      <AcceptItemDialog item={state.item} open={state.acceptItemDialog} onClose={handleAcceptClose} onSubmit={handleAcceptItem}/>
      }
      {state.issueItemDialog &&
      <IssueItemDialog item={state.item} open={state.issueItemDialog} onClose={handleIssueClose} onSubmit={handleIssueItem} productId={state.item.productId} description={state.item.productName} />
      }
    </>
  );
}
