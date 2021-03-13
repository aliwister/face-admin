import React, { useState } from 'react';
import {Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {OrderInfoPaper} from "./Orders.style";
import Typography from "@material-ui/core/Typography";

import {useAdvancedTrackingQuery} from "../../codegen/generated/_graphql";
import Image from "../../components/Image/Image";
import {Link} from "react-router-dom";
import {Tracking} from "../../components/Tracking/Tracking";

function ShipmentInfo({data}) {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/shipment-details/${data.id}/EDIT`} target={"_blank"}>{data.id}</Link>({data.status})
      </TableCell>
      <TableCell>
        <Tracking trackingNum={data.trackingNum} label ={data.shipmentMethod + " " +data.trackingNum} carrier={data.shipmentMethod} />
      </TableCell>

    </TableRow>

  )
}

//const
export default function AdvancedTracking({id, showAll}) {
  const { data, loading, error, refetch } = useAdvancedTrackingQuery({
    variables: {
      showAll: showAll,
      ref: id
    },
    context: { clientName: "adminLink" }
  });

  return (
    <>
        <OrderInfoPaper>
          <Typography variant="caption">Advanced Tracking</Typography>
          <Table  size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>image</TableCell>
                <TableCell>description</TableCell>

                <TableCell>quantity</TableCell>
                <TableCell>reference</TableCell>
                <TableCell>po</TableCell>
                <TableCell>orderDate</TableCell>
                <TableCell>invoiceDate</TableCell>
                <TableCell>purchaseDate</TableCell>
                <TableCell>Transit Tracking</TableCell>
                <TableCell>Purchase Tracking</TableCell>
                <TableCell>Customer Tracking</TableCell>
                <TableCell>delivered</TableCell>
              </TableRow>
            </TableHead>
            {data && data.advancedTracking && (
              <TableBody>
                {data.advancedTracking.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="left"><Image url={row.image} className="product-image" style={{maxWidth: '70px'}} /></TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell align="left"><Link to={`/order-details/${row.reference}`} target={"_blank"}>{row.reference}</Link></TableCell>
                    <TableCell align="right">
                      {row.po &&
                      <Link to={`/purchase-details/${row.po}`}>{row.po}</Link>
                      }
                    </TableCell>
                    <TableCell>{row.orderDate}</TableCell>
                    <TableCell>{row.invoiceDate}</TableCell>
                    <TableCell>{row.purchaseDate}</TableCell>
                    <TableCell>{row.purchaseShipments && row.purchaseShipments.map( s => ( <ShipmentInfo data={s}/>))}</TableCell>
                    <TableCell>{row.transitShipments && row.transitShipments.map( s => ( <ShipmentInfo data={s}/>))}</TableCell>
                    <TableCell>{row.customerShipments && row.customerShipments.map( s => ( <ShipmentInfo data={s}/>))}</TableCell>
                    <TableCell>{row.delivered}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            )}
          </Table>

        </OrderInfoPaper>

    </>
  );
}
