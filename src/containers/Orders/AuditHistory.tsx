import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { useAlert } from "react-alert";
import Paper from "@material-ui/core/Paper";
import {OrderInfoPaper} from "./Orders.style";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Image from "../../components/Image/Image";
import TableFooter from "@material-ui/core/TableFooter";
import {errorHandler} from "../../api/config";
import Typography from "@material-ui/core/Typography";
import {PaymentFormDialog} from "./components/PaymentFormDialog";
import {RefundFormDialog} from "./components/RefundFormDialog";
import {useOrderActionsQuery, useOrderAQuery} from "../../codegen/generated/_graphql";

//const
export default function AuditHistory({id}) {
  const { data, loading, error, refetch } = useOrderActionsQuery({
    variables: {
      orderId: id
    },
    fetchPolicy: "network-only",
    context: { clientName: "shopLink" }
  });

  return (
    <>
        <OrderInfoPaper>
          <Typography variant="caption">Audit History</Typography>
          <Table  size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>User</TableCell>
              </TableRow>
            </TableHead>
            {data && data.orderActions && (
              <TableBody>
                {data.orderActions.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.createdDate.substr(0,20)}</TableCell>
                    <TableCell align="left">{row.action}</TableCell>
                    <TableCell align="left">{row.state}</TableCell>
                    <TableCell align="left">{row.comment}</TableCell>
                    <TableCell align="left">{row.createdBy}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            )}
          </Table>

        </OrderInfoPaper>

    </>
  );
}
