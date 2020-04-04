import React, { useState } from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import Checkbox from '../../components/CheckBox/CheckBox';
import { useAlert } from "react-alert";
import {
  OrderInfoPaper
} from '../Orders/Orders.style';
import NoResult from '../../components/NoResult/NoResult';
import { Link } from 'react-router-dom';
import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {PURCHASEDETAILS} from "../../settings/constants";

const GET_ORDERS = gql`
  query purchases($state: [OrderState], $limit: Int, $searchText: String) {
    purchases(state: $state, limit: $limit, searchText: $searchText) {
      id
      currency
      invoiceDate
      subtotal
      deliveryTotal
      taxesTotal
      discountTotal
      total
      merchantObj {
        id
        name
      }
      purchaseItems {
        description
        price
        quantity
      }
    }
  }
`;
const MERCHANTS = gql`
query merchants {
  merchants {
    id
    name
  }
}
`;
const CREATE_PURCHASE = gql`
  mutation createPurchase($dto: PurchaseInput) {
    createPurchase(dto: $dto) {
      id
    }
  }
`;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

type CustomThemeT = { red400: string; textNormal: string; colors: any };
const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();

const Status = styled('div', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textDark,
  display: 'flex',
  alignItems: 'center',
  lineHeight: '1',
  textTransform: 'capitalize',

  ':before': {
    content: '""',
    width: '10px',
    height: '10px',
    display: 'inline-block',
    borderRadius: '10px',
    backgroundColor: $theme.borders.borderE6,
    marginRight: '10px',
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



export default function Purchases() {
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState([]);
  const [limit, setLimit] = useState([]);
  const [search, setSearch] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [merchant, setMerchant] = React.useState(false);
  const alert = useAlert();
  const classes = useStyles();
  const history = useHistory();
  const { data:merchants, loading:merhcnatsLoading} = useQuery(MERCHANTS, {context: { clientName: "shopLink" }});
  const [createPurchaseMutation] = useMutation(CREATE_PURCHASE);
  const [useCss, theme] = themedUseStyletron();
  const sent = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const failed = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });
  const processing = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.textNormal,
    },
  });
  const paid = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.blue400,
    },
  });

  alert.success('in purchases');
  const { data, error, refetch } = useQuery(GET_ORDERS, {
    variables: {
      status: [],
      limit: 10,
      searchText: "",
    },
    fetchPolicy: "network-only",
    context: { clientName: "shopLink" }
  });
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const handleCreatePurchase = async () => {
    // @ts-ignore
    const dto = {merchantId: merchant.id, currency: "omr"};
    const {
      data: { createPurchase },
    }: any = await createPurchaseMutation({
      variables: { dto: dto },
    });
    if(createPurchase)  {
      alert.success(createPurchase.id);
      history.push('/purchase-details/'+createPurchase.id);
    }
  }

  function handleStatus({ value }) {
    setStatus(value);
    if (value.length) {
      refetch({
        status: [value[0].value],
        limit: limit.length ? limit[0].value : null,
        searchText: "",
      });
    } else {
      refetch({ status: [], limit:10, searchText:"" });
    }
  }

  function handleLimit({ value }) {
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
  }
  function handleSearch(event) {
    const { value } = event.currentTarget;
    setSearch(value);
    refetch({ status: [], limit:10, searchText:value });
  }
  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.orders.map(order => order.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }
  function handleCheckbox(event) {
    const { name } = event.currentTarget;
    if (!checkedId.includes(name)) {
      setCheckedId(prevState => [...prevState, name]);
    } else {
      setCheckedId(prevState => prevState.filter(id => id !== name));
    }
  }

  function handleCreate() {

  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if(merhcnatsLoading) {
    return <div>Loading</div>
  }
  return (
      <>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Purchase</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select Merchant
            </DialogContentText>
            <Autocomplete
                id="combo-box-demo"
                options={merchants.merchants}
                getOptionLabel={(option: any) => option.name}
                style={{ width: 300 }}
                onChange={(event, value) => setMerchant(value)}
                renderInput={params => <TextField {...params} label="Merchant Name" variant="outlined" />}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreatePurchase} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      <Grid container spacing={1}>

            <Grid item  md={3} >
              <Select
                  options={statusSelectOptions}
                  labelKey='label'
                  valueKey='value'
                  placeholder='Status'
                  value={status}
                  searchable={false}
                  onChange={handleStatus}
              />
            </Grid>

            <Grid item  md={2} >
              <Select
                  options={limitSelectOptions}
                  labelKey='label'
                  valueKey='value'
                  value={limit}
                  placeholder='Order Limits'
                  searchable={false}
                  onChange={handleLimit}
              />
            </Grid>
            <Grid  item  md={4} >
              <Input
                  value={search}
                  placeholder='Ex: Search By Address'
                  onChange={handleSearch}
                  clearable
              />
            </Grid>

            <Grid item  md={3} style={{textAlign: 'right'}}>
              <Button variant="contained" color="primary" onClick={handleClickOpen} >
                New Purchase
              </Button>
            </Grid>

      <Grid item xs={12}>

            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell align="left">Ref</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="center">Payment</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                {data && data.purchases.length && (
                    <TableBody>

                      {data.purchases.map(row => (
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
                              <Link to={`purchase-details/${row.id}`}>{row.id}</Link>
                            </TableCell>
                            <TableCell align="left">{row.merchantObj.name}</TableCell>

                            <TableCell align="left">{row.deliveryTotal}</TableCell>
                            <TableCell align="right">{row.taxesTotal}</TableCell>

                            <TableCell align="center">OMR {row.total}</TableCell>
                            <TableCell align="right"><Moment format='Do MMM YYYY'>{row.createdDate}</Moment></TableCell>
                            <TableCell align="right">
                              <Status
                                  className={
                                    row.orderState === 'Delivered'
                                        ? sent
                                        : row.orderState === 'PAYMENT_ACCEPTED'
                                        ? paid
                                        : row.orderState === 'AWAITING_PAYMENT'
                                            ? processing
                                            : row.orderState === 'CANCELLED'
                                                ? failed
                                                : ''
                                  }
                              >
                                {row.orderState}
                              </Status>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                )}
              </Table>
            </TableContainer>
      </Grid>
      </Grid>
        </>
  );
}
