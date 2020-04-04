import React from 'react';
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

const ACCEPT_ITEM = gql`
  mutation acceptItem($shipmentId: Long, $pkgId: Long, $purchaseItemId: Long, $productId: Long, $merchantId: Long, $description: String, $quantity: BigDecimal, $accepted: BigDecimal, $rejected: BigDecimal) {
    acceptItem(shipmentId: $shipmentId,  pkgId: $pkgId,  purchaseItemId: $purchaseItemId,  productId: $productId,  merchantId: $merchantId,  description: $description,  quantity: $quantity,  accepted: $accepted,  rejected: $rejected) {
      value
    }
  }
`;
const ISSUE_ITEM = gql`
  mutation issueItem($orderItemId : Long, $productId : Long, $description : String, $quantity : BigDecimal) {
    issueItem(orderItemId: $orderItemId, productId: $productId, description: $description, quantity: $quantity) {
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

export default function EditInPackage({state, dispatch}) {
  const [acceptItemMutation] = useMutation(ACCEPT_ITEM,{ context: { clientName: "adminLink" }});
  const [issueItemMutation] = useMutation(ISSUE_ITEM,{ context: { clientName: "adminLink" }});
  const { data, loading, error, refetch } = useQuery(SORT_QUEUE, { context: { clientName: "adminLink" }});
  const { register:r3, handleSubmit:hs3, errors:e3 } = useForm();

  const alert = useAlert();
  const classes = useStyles();

  const handleAcceptItem = async (data) => {
    console.log('handlin accept',data);
    let dto = {
      ...data,
      shipmentId: state.shipment.id,
      pkgId: 1,
      purchaseItemId: state.item.id,
      description: state.item.description,
      quantity: Number(state.item.accepted) + Number(state.item.rejected),
    }
    const {
      data: { acceptItem },
    }: any = await acceptItemMutation({
      variables: { ...dto },
    });
    if(acceptItem)  {
      alert.success(acceptItem.value);
      dispatch({type:'ISSUE_ITEM_START'});
    }
  }

  const handleIssueItem = async (data) => {
    console.log('handling issue',data);
    let dto = {
      ...data,
      description: state.item.description
    }
    const {
      data: { issueItem },
    }: any = await issueItemMutation({
      variables: { ...dto },
    });
    if(issueItem)  {
      alert.success(issueItem.value);
      dispatch({type:'ISSUE_ITEM_END'});
    }
  }

  const handleProcess = (item) => {
    dispatch({type: 'SELECT_ACCEPT_ITEM_START', payload:item})
  };

  const handleRefetch = async x => {
    refetch({keyword: x.keyword});
  }

  const handleAcceptClose = () => dispatch({type: 'SELECT_ACCEPT_ITEM_CANCEL'})
  const handleIssueClose = () => dispatch({type: 'ISSUE_ITEM_CANCEL'})

  return (
    <>
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
        <SortQueue
            data={data}
            classes={classes}
            handleProcess={handleProcess}
        />
      </SectionCard>
      {state.acceptItemDialog &&
      <AcceptItemDialog item={state.item} open={state.acceptItemDialog} onClose={handleAcceptClose} onSubmit={handleAcceptItem}/>
      }
      {state.issueItemDialog &&
      <IssueItemDialog item={state.item} open={state.issueItemDialog} onClose={handleIssueClose} onSubmit={handleIssueItem} />
      }
    </>
  );
}
