import React from "react";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {Paper, TableContainer} from "@material-ui/core";
import {Tablelate} from "components/Table/Tabelate";
import {Styles} from "../ShipQueue";
import {Tracking} from "../../../components/Tracking/Tracking";

export function ShipmentList({data}) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Incoming Shipments',
        columns: [
          {
            Header: 'ID',
            accessor: (row) => (<Link to={`shipment-details/${row.id}/RECEIVE`}>{row.id}</Link>)
          },
          {
            Header: 'Date Added',
            accessor: 'createdDate',
          },
          {
            Header: 'Tracking',
            accessor: (row) => (<Tracking trackingNum={row.trackingNum} label ={row.trackingNum} carrier={row.shipmentMethod} />)
          },
          {
            Header: 'Carrier',
            accessor: 'shipmentMethod',
          }
        ],
      },
    ],
    []
  )
  return (
    <>
      <Grid container xs={12} md={12} spacing={1}>
        <TableContainer component={Paper}>
          <Styles>
            <Tablelate columns={columns} data={data.shipmentList}/>
          </Styles>
        </TableContainer>
      </Grid>
    </>
  );
}