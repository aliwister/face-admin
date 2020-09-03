import React from "react";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {Paper, TableContainer} from "@material-ui/core";
import {Tablelate} from "components/Table/Tabelate";
import {Styles} from "../ShipQueue";

export function IncomingShipments({data}) {
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
          },{
            Header: 'From',
            accessor: 'sender',
          },
          {
            Header: 'Tracking',
            accessor: (row) => (<a href={`https://www.trackingmore.com/${row.shipmentMethod}-tracking.html?number=${row.trackingNum}`} target="_blank">{row.trackingNum}</a>)
          },
          {
            Header: 'Carrier',
            accessor: 'shipmentMethod',
          },
          {
            Header: 'Pkg Count',
            accessor: 'pkgCount',
          },
          {
            Header: 'Arrived Pkgs',
            accessor: 'arrivedPkgs',
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