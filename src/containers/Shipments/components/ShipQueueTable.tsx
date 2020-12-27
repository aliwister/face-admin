import React, {useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { useAlert } from "react-alert";
import {
  Paper,
  TableContainer,
} from "@material-ui/core";

import {DateDialog} from './DateDialog';
import {Link} from "react-router-dom";
import styled from 'styled-components'
import {Tablelate} from "components/Table/Tabelate";
import Button from "@material-ui/core/Button";
import {useSetProcessedDateMutation, useSetEstimatedShipDateMutation} from "../../../codegen/generated/_graphql";

export const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
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



export default function ShipQueueTable({ data, loading, refetch}) {
  const alert = useAlert();
  const [checkedId, setCheckedId] = useState(0);
  const [open, setOpen] = useState(false);
  const [setEstimatedShipDateMutation] = useSetEstimatedShipDateMutation({ context: { clientName: "adminLink" }});

  const onSetDate = (id) => {
    setCheckedId(id);
    setOpen(true);
  }

  const handleSetEstimatedDate = async (item, formData) => {
    const {
      data: { setEstimatedShipDate },
    }: any = await setEstimatedShipDateMutation({
      variables: { id: item, date: formData.date},
    });
    if(setEstimatedShipDate) {
      alert.success(setEstimatedShipDate.value);
      refetch();
      onClose();
    }
  }

  function onClose() {
    setOpen(false);
  }
  const columns = React.useMemo(
    () => [
      {
        Header: 'Ship Queue',
        columns: [
          {
            Header: 'ID',
            accessor: (row) => (<Link to={`/shipment-details/${row.id}/PREP`}>{row.id}</Link>)
          },
          {
            Header: 'Ref',
            accessor: 'reference',
          },
          {
            Header: 'Name',
            accessor: 'fullName',
          },          {
            Header: 'Carrier',
            accessor: 'carrier',
          },
          {
            Header: 'Progress',
            accessor: (row) => (Math.round(100*row.todo/((row.total+0) - (row.done+0))) + "%")
          },
          {
            Header: 'Set Date',
            accessor: (row) => (<>
              {row.estimatedShipDate}
            <Button variant="contained" color="primary" onClick={() => onSetDate(row.id)}>
              Set Estimate
            </Button>
            </>)
          },
        ],
      },
    ],
    []
  )

  if(loading)
    return <></>

  return (
    <>
      <DateDialog item={checkedId} open={open} onClose={onClose} onSubmit={handleSetEstimatedDate} title={"Set Estimated Date"}/>
        <TableContainer component={Paper}>
          <Styles>
            <Tablelate columns={columns} data={data} />
          </Styles>
        </TableContainer>
    </>
  );
}