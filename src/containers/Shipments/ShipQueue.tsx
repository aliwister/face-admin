import React, {useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { useAlert } from "react-alert";

import TextField from "@material-ui/core/TextField";
import {useForm} from "react-hook-form";

import {SortQueue} from "./components/SortQueue";
import {SectionCard} from "./Shipment.style";
import CardHeader from "@material-ui/core/CardHeader";
import { AcceptItemDialog } from "./components/AcceptItemDialog";
import { IssueItemDialog } from "./components/IssueItemDialog";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import ReactToPrint from "react-to-print";
import Grid from "@material-ui/core/Grid";
import {InventoryList} from "./components/InventoryList";
import {OutstandingQueue} from "./components/OutstandingQueue";
import Checkbox from "../../components/CheckBox/CheckBox";
import {Link} from "react-router-dom";

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

export default function ShipQueue() {
  const { data, loading, error, refetch } = useQuery(SHIP_Q, { context: { clientName: "adminLink" }});
  if(loading)
    return <></>

  return (
     <>
      <Grid container xs={12} md={12} spacing={1}>
        <TableContainer component={Paper}>
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
          </Table>
        </TableContainer>
      </Grid>
     </>
  );
}
