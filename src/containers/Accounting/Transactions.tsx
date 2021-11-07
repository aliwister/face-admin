import React, { useState } from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import Moment from 'react-moment';


import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import Checkbox from '../../components/CheckBox/CheckBox';
import { useAlert } from "react-alert";
import {
  OrderInfoPaper
} from '../Orders/Orders.style';
import NoResult from '../../components/NoResult/NoResult';
import { Link } from 'react-router-dom';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import {
  SetAccountingCodeComponent,
  useSetAccountingCodeMutation,
  useSetProcessedDateMutation, useSetSettlementDateMutation,
  useTransactionsQuery,
  useUpdateFromDetrackMutation
} from "../../codegen/generated/_graphql";

import  Select from "react-select";
import {PAYMENT_METHODS} from "./Constants";
import TextField from "@material-ui/core/TextField";
import {SetProcessedDateDialog} from "./components/SetProcessedDateDialog";
import {SetSettlementDateDialog} from "./components/SetSettlementDateDialog";
import {SetCodingDialog} from "./components/SetCodingDialog";
import {ExportBmbCsvDialog} from "./components/ExportBmbCsvDialog";
import {ExportXeroCsvDialog} from "./components/ExportXeroCsvDialog";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));



const statusSelectOptions = [
  { value: 'delivered', label: 'Delivered' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'failed', label: 'Failed' },
];
const limitSelectOptions = [
  { value: 7, label: 'Last 7 orders' },
  { value: 15, label: 'Last 15 orders' },
  { value: 30, label: 'Last 30 orders' },
];

export default function Transactions() {
  const [checkedId, setCheckedId] = useState([]);
  const [processed, setProcessed] = useState(false);
  const [settlement, setSettlement] = useState(false);
  const [coding, setCoding] = useState(false);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState([{value: 'checkoutcom', label: 'checkoutcom'}]);
  const [limit, setLimit] = useState(15);
  const [search, setSearch] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [amount, setAmount] = useState(null);
  const [total, setTotal] = useState(0);
  const [bmbcsv, setBmbcsv] = useState(false);
  const [xerocsv, setXerocsv] = useState(false);
  const [unsettledonly, setUnsettledonly] = useState(false);

  const alert = useAlert();
  const classes = useStyles();

  const arrayToObject = (array,prop) =>
    array.map(t => t[prop]);

  const [setProcessedDateMutation] = useSetProcessedDateMutation({ context: { clientName: "shopLink" }});
  const [setSettlementDateMutation] = useSetSettlementDateMutation({ context: { clientName: "shopLink" }});
  const [setAccountingCodeMutation] = useSetAccountingCodeMutation({ context: { clientName: "shopLink" }});

  const { data, error, refetch, fetchMore } = useTransactionsQuery(
    {
      variables: {
        paymentMethods: arrayToObject(status, 'value'),
        limit: limit,
        offset: 0,
        maxAmount: amount,
        from: from,
        to: to,
        accountCode: null,
        unsettledOnly: unsettledonly
      },
      fetchPolicy: "network-only",
      context: { clientName: "shopLink" }
  });
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function handleStatus(value) {
    console.log(value);
    setStatus(value);
    refresh();
  }

  function refresh() {
    if (status && status.length) {
      refetch({
        paymentMethods: arrayToObject(status, 'value'),
        maxAmount: null,
        limit: limit,
        offset: 0,
        from: from,
        to: to,
        unsettledOnly: unsettledonly
      });
    } else {
      refetch({
        paymentMethods: [],
        limit: 15,
        offset: 0,
        maxAmount:null,
      });
    }
  }



  function loadMore() {
    setLimit(limit+15);
    fetchMore({
      variables: {
        offset: data.transactions.items.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          transactions: {
            // @ts-ignore
            __typename: prev.transactions.__typename,
            // @ts-ignore
            items: [...prev.transactions.items, ...fetchMoreResult.transactions.items],
            // @ts-ignore
            hasMore: fetchMoreResult.transactions.hasMore,
          },
        });
      },
    });
  }

/*  function handleLimit({ value }) {
    setLimit(value);
    if (value.length) {
      refetch({
        status: status.length ? [status[0].value] : [],
        limit: value[0].value,
        searchText: ""
      });
    } else {
      refetch({ status: [], limit:10, searchText:"" });
    }
  }*/

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.transactions.items.map(order => order.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }
  function handleCheckbox(event) {
    let value = event.target.name;
    alert.success(value);
    let nextState = checkedId;
    if (!checkedId.includes(value)) {
      nextState = [...checkedId, value]
    } else {
      nextState = checkedId.filter(id => id !== value);
    }
    setCheckedId(nextState);
    let x = 0;
    if(nextState.length > 0) {
      x = data.transactions.items.filter(a => nextState.includes(a.id)).map(item => item.amount).reduce((prev, next) => prev + next);
      setTotal(Math.round(Math.abs(x)*10)/10.0);
    }

  }

  async function handleSetSettlement(ids, formData) {

    const {
      data: { setSettlementDate },
    }: any = await setSettlementDateMutation({
      variables: { paymentIds: ids.map((i) => Number(i)), date: formData['date']},
    });
    if(setSettlementDate) {
      alert.success(setSettlementDate.value);
      refetch();
      onClose();
    }
  }

  async function handleSetProcessed(ids, formData) {

    const {
      data: { setProcessedDate },
    }: any = await setProcessedDateMutation({
      variables: { paymentIds: ids.map((i) => Number(i)), date: formData['date']},
    });
    if(setProcessedDate) {
      alert.success(setProcessedDate.value);
      refetch();
      onClose();
    }
  }

  async function handleSetCoding(ids, formData) {
    const {
      data: { setAccountingCode },
    }: any = await setAccountingCodeMutation({
      variables: { paymentIds: ids.map((i) => Number(i)), code: formData['code']},
    });
    if(setAccountingCode) {
      alert.success(setAccountingCode.value);
      refetch();
      onClose();
    }
  }

  function onSetSettlement() {
    console.log(checkedId);
    setSettlement(true);
  }

  function onSetProcessed() {
    setProcessed(true);
  }

  function onSetCoding() {
    setCoding(true);
  }

  function onExportBmb() {
    setBmbcsv(true);
  }
  function onExportXero() {
    setXerocsv(true);
  }

  function onClose() {
    setProcessed(false);
    setSettlement(false);
    setCoding(false);
    setBmbcsv(false);
    setXerocsv(false);
  }

  function handleFrom(event) {
    setFrom(event.target.value)
    return refresh();
  }

  function handleTo(event) {
    setTo(event.target.value)
    return refresh();
  }

  function handleMaxAmount(event) {
    setAmount(""+event.target.value)
    return refresh();
  }

  return (
    <Grid container spacing={1}>
      <Grid item  md={4} >
        <Select
          value={status}
          onChange={handleStatus}
          options={PAYMENT_METHODS}
          isMulti={true}
        />

      </Grid>

      <Grid  item  md={5} >
        <TextField
          id="date"
          label="From"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleFrom}
        />
        <TextField
          id="date"
          label="To"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleTo}
        />
        <TextField
          id="maxAmount"
          label="Max Amount"
          type="number"
          inputProps={{step: 0.1}}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleMaxAmount}
        />
        <Checkbox
          checked={unsettledonly}
          onChange={() => setUnsettledonly(!unsettledonly)}
          overrides={{
            Checkmark: {
              style: {
                borderWidth: '2px',
                borderRadius: '4px',
              },
            },
          }}
        >Unsettled Only</Checkbox>
      </Grid>
      <Grid item  md={3} style={{textAlign: 'right'}}>
        <Button variant="contained" color="primary" onClick={onSetSettlement} >
          Set Settlement Date
        </Button>
        <Button variant="contained" color="primary" onClick={onSetProcessed} >
          Set Processed Date
        </Button>
        <Button variant="contained" color="primary" onClick={onSetCoding} >
          Set Account
        </Button>
        <Button variant="contained" color="primary" onClick={onExportBmb} >
          Export BMB CSV
        </Button>
        <Button variant="contained" color="primary" onClick={onExportXero} >
          Export Xero CSV
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>{checkedId.length} selected</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>

                <TableCell></TableCell>
                <TableCell>{total}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>ID</TableCell>
                <TableCell align="left">Ref</TableCell>
                <TableCell align="left">Created Date</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Payment Method</TableCell>
                <TableCell align="center">Auth Code</TableCell>
                <TableCell align="center">Processed Date</TableCell>
                <TableCell align="center">Settlement Date</TableCell>
                <TableCell align="left">Customer Name</TableCell>
              </TableRow>
            </TableHead>
            {data && data.transactions.items.length && (
              <TableBody>

                {data.transactions.items.map(row => (
                  <TableRow key={row.orderId}>
                    <TableCell align="right"><Checkbox
                      name={row.id}
                      checked={checkedId.includes(row.id)}
                      onChange={handleCheckbox}
                      overrides={{
                        Checkmark: {
                          style: {
                            borderWidth: '2px',
                            borderRadius: '4px',
                          },
                        },
                      }}
                    /></TableCell>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">
                      {row.invoiceNum  ?
                        <>{row.invoiceNum}</>:
                        <Link to={`order-details/${row.orderReference}`} target={"_blank"}>{row.orderReference}</Link>

                      }
                      </TableCell>

                    <TableCell align="left"><Moment format='Do MMM YYYY'>{row.createdDate}</Moment></TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="left">{row.paymentMethod}</TableCell>
                    <TableCell align="center">{row.authCode}</TableCell>

                    <TableCell align="center">{row.processedDate}</TableCell>
                    <TableCell align="center"><Moment format='Do MMM YYYY'>{row.settlementDate}</Moment></TableCell>
                    <TableCell align="left">
                      {row.customer}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {data && data.transactions && data.transactions.hasMore && (
          <Button onClick={loadMore}>Load More</Button>
        )}
        <SetProcessedDateDialog item={checkedId} open={processed} onClose={onClose} onSubmit={handleSetProcessed} title={"Set Processed Date"}/>
        <SetSettlementDateDialog item={checkedId} open={settlement} onClose={onClose} onSubmit={handleSetSettlement} title={"Set Processed Date"}/>
        <SetCodingDialog item={checkedId} open={coding} onClose={onClose} onSubmit={handleSetCoding} title={"Set Processed Date"}/>
        {data && <ExportBmbCsvDialog  checked={checkedId} items={data.transactions.items} open={bmbcsv}  onClose={onClose} total={Math.round(Math.abs(total)*10)/10.0} title={"Generate BMB CSV"}/>}
        {data && <ExportXeroCsvDialog checked={checkedId} items={data.transactions.items} open={xerocsv} onClose={onClose} total={Math.round(Math.abs(total)*10)/10.0} title={"Generate Xero CSV"}/>}
      </Grid>
    </Grid>
  );
}
