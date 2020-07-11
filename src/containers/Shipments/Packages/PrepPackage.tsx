import React from 'react';
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
import {PrepQueue} from "../components/PrepQueue";
import {PreptemDialog} from "../components/PrepItemDialog";
const PREP_ITEM = gql`
  mutation prepItem($dto: PackagingContentInput) {
    prepItem(dto: $dto) {
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

const PREP_QUEUE = gql`
query prepQueue($shipmentId: Long) {
  prepQueue(shipmentId: $shipmentId) {
    id
    description
    quantity
    image
    unpacked
    productId
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

export default function PrepPackage({state, dispatch, refreshShipment}) {
  const [prepItemMutation] = useMutation(PREP_ITEM,{ context: { clientName: "adminLink" }});
  const { data, loading, error, refetch } = useQuery(PREP_QUEUE, {variables: {shipmentId: state.shipment.id}, context: { clientName: "adminLink" }});

  const alert = useAlert();
  const classes = useStyles();

  const handlePrepItem = async (data) => {
    console.log('handlin prep',data);
    let dto = {
      ...data
    }
    const {
      data: { prepItem },
    }: any = await prepItemMutation({
      variables: { dto },
    });
    if(prepItem)  {
      alert.success(prepItem.value);
      refreshShipment();
      refetch();
      dispatch({type: 'PREP_ITEM_END'})
    }
  }
  const handleProcess = (item) => {
    dispatch({type: 'PREP_ITEM_START', payload:item})
  };

  const handlePrepClose = () => dispatch({type: 'PREP_ITEM_CANCEL'})

  return (
    <>
      <SectionCard>
        <CardHeader
          subheader="Prepare"
        />
        {data && <PrepQueue
          queue={data.prepQueue}
          classes={classes}
          handleProcess={handleProcess}
        />}
      </SectionCard>
      {state.prepItemDialog && state.pkg &&
      <PreptemDialog item={state.item} open={state.prepItemDialog} onClose={handlePrepClose} onSubmit={handlePrepItem} pkg={state.pkg}/>
      }
    </>
  );
}
