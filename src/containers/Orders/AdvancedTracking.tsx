import React, { useState } from 'react';
import {Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {OrderInfoPaper} from "./Orders.style";
import Typography from "@material-ui/core/Typography";

import {useAdvancedTrackingQuery} from "../../codegen/generated/_graphql";
import Image from "../../components/Image/Image";
import {Link} from "react-router-dom";
import {Tracking} from "../../components/Tracking/Tracking";
import Button from "@material-ui/core/Button";
import {DateDialog} from "../Shipments/components/DateDialog";
import {Tablelate} from "../../components/Table/Tabelate";
import {Styles} from "../Shipments/components/ShipQueueTable";
import {MerchantURL} from "../../components/MerchantURL/MerchantURL";
import {create} from "domain";
import {CreateShipmentDialog} from "../Shipments/components/CreateShipmentDialog";
import Checkbox from "@material-ui/core/Checkbox";

function ShipmentInfo({data}) {
  return (

      <TableCell>
        <Link to={`/shipment-details/${data.id}/EDIT`} target={"_blank"}>{data.id}</Link> ({data.status}{data.to && <span> to {data.to}</span>}) <Tracking trackingNum={data.trackingNum} label ={data.shipmentMethod + " " +data.trackingNum} carrier={data.shipmentMethod} />
      </TableCell>


  )
}

//const
export default function AdvancedTracking({id, showAll, queueName="", createShipmentFlag=false}) {
  const [selectedRows, setSelectedRows] = React.useState({});
  const [create, setCreate] = React.useState(false);
  const { data, loading, error, refetch } = useAdvancedTrackingQuery({
    variables: {
      showAll: showAll,
      ref: id,
      queueName: queueName
    },
    context: { clientName: "adminLink" }
  });

  const onCreateShipment = () => {
    setCreate(true);
  }

  const getContent = () => {
    var indexArr = Object.keys(selectedRows);
    //const s = data.advancedTracking.filter(e => ~checkedId.indexOf(e.id)).map(({__typename, id, ...props}) => ({...props, from: id}));
    var resultArr = indexArr.map(i => data.advancedTracking[i]).map(({__typename, delivered, customerShipments, id, transitShipments, purchaseShipments, merchant, merchantId, orderDate, invoiceDate, purchaseDate, reference, sku, url, po, quantity, pid, ...props}) => ({...props, quantity, purchaseShipments: {shipmentItemId: null, purchaseItemId: pid, quantity: quantity, purchaseId: po}}));
    console.log(resultArr)
    return resultArr;
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Ship Queue',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Image',
            accessor: (row) => (<Image url={row.image} className="product-image" style={{maxWidth: '70px'}} />)
          },
          {
            Header: 'Description',
            accessor: (row) => (<MerchantURL merchantId={row.merchantId} sku={row.sku} url={row.url} name={row.description}/>)
          },
          {
            Header: 'Quantity',
            accessor: 'quantity',
          },
          {
            Header: 'Delivered',
            accessor: 'delivered',
          },
          {
            Header: 'Ref',
            accessor: (row) => (<Link to={`/order-details/${row.reference}`} target={"_blank"}>{row.reference}</Link>)
          },
          {
            Header: 'PO',
            accessor: (row) => (<Link to={`/purchase-details/${row.po}`} target={"_blank"}>{row.po}({row.merchant})</Link>)
          },
          {
            Header: 'Order Date',
            accessor: 'orderDate',
          },
          {
            Header: 'Invoice Date',
            accessor: 'invoiceDate',
          },
          {
            Header: 'Purchase Date',
            accessor: 'purchaseDate',
          },
          {
            Header: 'Transit Tracking',
            accessor: (row) => (row.transitShipments && row.transitShipments.map( s => ( <ShipmentInfo data={s}/>)))
          },
          {
            Header: 'Purchase Tracking',
            accessor: (row) => (row.purchaseShipments && row.purchaseShipments.map( s => ( <ShipmentInfo data={s}/>)))
          },
          {
            Header: 'Customer Tracking',
            accessor: (row) => (row.customerShipments && row.customerShipments.map( s => ( <ShipmentInfo data={s}/>)))
          },
        ],
      },
    ],
    []
  )
  if(loading)
    return <></>

  if(!(data && data.advancedTracking))
    return <></>

  return (
    <>
      {createShipmentFlag && <CreateShipmentDialog defaults={
        {
          shipmentType: {value: 'TRANSIT', label: 'TRANSIT'},
          shipmentMethod: {value: 'UPS', label: 'UPS'},
          shipmentStatus: {value: 'IN_TRANSIT', label: 'IN_TRANSIT'},
          to: {id: 6, name: 'Access USA'},
          merchant: {id: 1, name: 'Amazon'},
          pkgCount: 1,
          handlingInstructions: 'manually added'
        }
      } getContent={getContent} />}
      <button className="action" onClick={()=>getContent()}>Get Content</button>
      <TableContainer component={Paper}>
        <Styles>
          <Tablelate columns={columns} data={data.advancedTracking } setSelectedRows={setSelectedRows} />
        </Styles>
      </TableContainer>
    </>
  );
}
