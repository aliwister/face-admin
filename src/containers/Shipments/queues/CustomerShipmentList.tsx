import React from "react";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {Paper, TableContainer} from "@material-ui/core";
import {Tablelate} from "components/Table/Tabelate";
import {Styles} from "../ShipQueue";
import Button from "@material-ui/core/Button";
import {useUpdateFromDetrackMutation} from "../../../codegen/generated/_graphql";
import { useAlert } from "react-alert";
import {Tracking} from "../../../components/Tracking/Tracking";
export function CustomerShipmentList({data, refetch}) {


  const [updateFromDetrackMutation] = useUpdateFromDetrackMutation({ context: { clientName: "adminLink" }});
  const alert = useAlert();



  const handleUpdateFromDetrack = async (id) => {
    const {
      data: { updateFromDetrack },
    }: any = await updateFromDetrackMutation({
      variables: { id: id},
    });
    if(updateFromDetrack) {
      alert.success(updateFromDetrack.value);
      refetch();
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Customer Shipments',
        columns: [
          {
            Header: 'ID',
            accessor: (row) => (<Link to={`shipment-details/${row.id}/EDIT`}>{row.id}</Link>)
          },
          {
            Header: 'Date Added',
            accessor: 'createdDate',
          },
          {
            Header: 'Tracking',
            accessor: (row) => (<Tracking trackingNum={row.trackingNum} label ={row.trackingNum} carrier={row.shipmentMethod}/>)
          },
          {
            Header: 'Carrier',
            accessor: 'shipmentMethod',
          },
          {
            Header: 'Action',
            accessor: (row) => (<Button variant="contained" color="secondary" onClick = {() => handleUpdateFromDetrack(row.trackingNum)}>Update from Detrack</Button>)
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