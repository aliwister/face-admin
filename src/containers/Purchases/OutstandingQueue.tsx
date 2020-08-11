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
import Image from "../../components/Image/Image";
const SHIP_Q = gql`
query outstandingQueue {
  outstandingQueue {
   id
   description
   quantity
   allocated
   price
   weight
   image
   sku
   orderId
   orderItemId
   productId
   wait
  }
}
`;

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



export default function OutstandingQueue() {
  const { data, loading, error, refetch } = useQuery(SHIP_Q, { context: { clientName: "adminLink" }});

  const columns = React.useMemo(
    () => [
      {
        Header: 'Ship Queue',
        columns: [
          {
            Header: 'Order Id',
            accessor: (row) => (<Link to={`order-details/${row.orderId}`} target={"_blank"}>{row.id}</Link>)
          },
          {
            Header: 'Image',
            accessor: (row) => (<Image url={row.image} className="product-image" style={{maxWidth: '70px'}} />)
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Quantity',
            accessor: 'quantity',
          },
          {
            Header: 'Price',
            accessor: 'price',
          },
          {
            Header: 'Allocated',
            accessor: 'allocated',
          },
          {
            Header: 'Wait',
            accessor: 'wait',
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
            <Tablelate columns={columns} data={data.outstandingQueue} />
          </Styles>
        </TableContainer>
      </Grid>
    </>
  );
}