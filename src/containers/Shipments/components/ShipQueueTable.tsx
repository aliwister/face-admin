import React, {useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';

import {
  Paper,
  TableContainer,
} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

import {Link} from "react-router-dom";
import styled from 'styled-components'
import {Tablelate} from "components/Table/Tabelate";

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



export default function ShipQueueTable({ data, loading}) {
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
        ],
      },
    ],
    []
  )

  if(loading)
    return <></>

  return (
    <>

        <TableContainer component={Paper}>
          <Styles>
            <Tablelate columns={columns} data={data} />
          </Styles>
        </TableContainer>
    </>
  );
}
