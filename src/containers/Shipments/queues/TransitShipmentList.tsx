import React, {useState} from "react";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {Paper, TableContainer} from "@material-ui/core";
import {Tablelate} from "components/Table/Tabelate";
import {Styles} from "../ShipQueue";
import Button from "@material-ui/core/Button";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import {useSetShipmentStatusMutation} from "../../../codegen/generated/_graphql";
import { useAlert } from "react-alert";
import {Tracking} from "../../../components/Tracking/Tracking";
export function TransitShipmentList({data, refetch}) {
  const [closeShipmentConfirmDialog, setClosedialog] = useState(false);
  const [shipmentId, setShipment] = useState(null);
  const [setStatusMutation] = useSetShipmentStatusMutation({ context: { clientName: "adminLink" }});
  const alert = useAlert();

  const handleCloseShipment = (id) => {
    setClosedialog(true);
    setShipment(id);
  }
  const closeShipment = async => {
    return setShipmentStatus('CLOSED');
  }
  const onCancel = () => setClosedialog(false);

  const setShipmentStatus = async (status) => {
    const {
      data: { setShipmentStatus },
    }: any = await setStatusMutation({
      variables: { id: shipmentId, status: status},
    });
    if(setShipmentStatus) {
      alert.success(setShipmentStatus.value);
      onCancel()
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
            accessor: (row) => (<Link to={`shipment-details/${row.id}/RECEIVE`}>{row.id}</Link>)
          },
          {
            Header: 'Date Added',
            accessor: 'createdDate',
          },
          {
            Header: 'Tracking',
            accessor: (row) => (<Tracking trackingNum={row.trackingNum} label ={row.trackingNum} />)
          },
          {
            Header: 'Name',
            accessor: 'shipmentMethod',
          },
          {
            Header: 'Carrier',
            accessor: 'carrier',
          },
          {
            Header: 'Action',
            accessor: (row) => (<Button variant="contained" color="secondary" onClick = {() => handleCloseShipment(row.id)}>Close</Button>)
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
      {closeShipmentConfirmDialog &&
      <ConfirmDialog title="Close Shipment?" open={closeShipmentConfirmDialog} cancel={onCancel} onConfirm={closeShipment}>
        Are you sure you want to close this shipment?
      </ConfirmDialog>}
    </>
  );
}