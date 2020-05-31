import React, {useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { useTable, useSortBy, usePagination } from 'react-table'

import {

  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow
} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

import {Link} from "react-router-dom";
import styled from 'styled-components'
const SHIP_Q = gql`
query shipQueue {
  shipQueue {
    id
    fullName 
    reference
    total
    done
    todo
    carrier
  }
}
`;

const Styles = styled.div`
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

function Tablelate({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case


  return (
    <>
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {/* Add a sort direction indicator */}
                <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  )
                })}
              </tr>
            )}
        )}
        </tbody>
      </table>
      <br />
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"First"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {"Last"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default function ShipQueue() {
  const { data, loading, error, refetch } = useQuery(SHIP_Q, { context: { clientName: "adminLink" }});

  const columns = React.useMemo(
    () => [
      {
        Header: 'Ship Queue',
        columns: [
          {
            Header: 'ID',
            accessor: (row) => (<Link to={`shipment-details/${row.id}`}>{row.id}</Link>)
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
      <Grid container xs={12} md={12} spacing={1}>
        <TableContainer component={Paper}>

          <Styles>
            <Tablelate columns={columns} data={data.shipQueue} />
          </Styles>


{/*
          <Table  size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Ref</TableCell>
                <TableCell align="left">Name</TableCell>

                <TableCell align="center">To</TableCell>

                <TableCell align="center">Carrier</TableCell>
                <TableCell align="center">Progress</TableCell>
              </TableRow>
            </TableHead>
            {data && data.shipQueue.length && (
              <TableBody>
                {data.shipQueue.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row"><Link to={`shipment-details/${row.id}`}>{row.id}</Link></TableCell>
                    <TableCell align="left">{row.reference}</TableCell>
                    <TableCell align="left">{row.fullName}</TableCell>
                    <TableCell align="right">{row.shipmentStatus}</TableCell>
                    <TableCell align="right">{row.carrier}</TableCell>
                    <TableCell align="right">{Math.round(100*row.todo/((row.total+0) - (row.done+0)))} %</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>*/}
        </TableContainer>
      </Grid>
     </>
  );
}
