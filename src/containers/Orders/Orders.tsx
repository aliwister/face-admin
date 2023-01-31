import React, {useEffect, useReducer, useState} from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Checkbox from '../../components/CheckBox/CheckBox';
import { useAlert } from "react-alert";
import {
  OrderInfoPaper
} from './Orders.style';
import NoResult from '../../components/NoResult/NoResult';
import { Link } from 'react-router-dom';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import  Select from "react-select";
import {ORDER_STATES} from "./components/Constants";
import {useForm} from "react-hook-form";
import TimeAgo from 'react-timeago';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {useOrdersAQuery} from "../../codegen/generated/_graphql-shop";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

function reducer(state, action) {
  console.log(action, state);
  switch (action.type) {
    case 'PROCESSING':
      return {
        ...state,
        tab: 'PROCESSING',
        search: "",
        isAsc: false,
        balance: false
      }
    case 'UNPAID_COMPLETE':
      return {
        ...state,
        //status: [ORDER_STATES[7]],
        status: [ORDER_STATES[4]],
        tab: 'UNPAID_COMPLETE',
        search: "",
        balance: true,
        isAsc: true,
      }
    case 'ALL_UNPAID':
      return {
        ...state,
        status: [ORDER_STATES[4]],
        tab: 'ALL_UNPAID',
        search: "",
        balance: true,
        isAsc: false,
      }
    case 'SEARCH_STATUS':
      return {
        ...state,
        status: action.payload
      }
    case 'SEARCH_KEYWORD':
      return {
        ...state,
        tab: 'SEARCH',
        search: action.payload
      }
    case 'TOGGLE_BALANCE':
      return {
        ...state,
        balance: action.payload
      }
    case 'SET_BALANCE':
      return {
        ...state,
        balance: true,
        minBal: action.payload
      }
    default:
      return state;
  }
}

export default function Orders() {
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState([ORDER_STATES[4]]);
  const [limit, setLimit] = useState([]);
  const [search, setSearch] = useState("");
  const alert = useAlert();
  const classes = useStyles();

  const INITIAL_STATE = {
    balance: false,
    status: [ORDER_STATES[4]],
    tab: 'PROCESSING',
    search: "",
    isAsc: false,
    minBal: "0"
  };
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {}
  });

  const arrayToObject = (array,prop) =>
    array.map(t => t[prop]);



  const { data, error, refetch, fetchMore } = useOrdersAQuery({
    variables: {
      state: arrayToObject(status, 'value'),
      limit: 15,
      searchText: "",
      balance: state.balance,
      isAsc: false,
      minBal: "0"
    },
    fetchPolicy: "cache-and-network",
    context: { clientName: "shopLink" }
  });

  async function doRefetch() {
    await refetch({ state: arrayToObject(state.status, 'value'), limit:10, searchText: state.search, balance: state.balance, isAsc: state.isAsc, minBal: state.minBal });

  }

  useEffect(() => {
    doRefetch()
  }, [state]);

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function handleStatus(value) {
    if (value && value.length) {
      dispatch({type: 'SEARCH_STATUS', payload: value})
    }
  }
  function handleSearch(data) {
    const searchText = data.search;
    if (searchText && searchText.length)
      dispatch({type: 'SEARCH_KEYWORD', payload: searchText})
  }

  function loadMore() {
    fetchMore({
      variables: {
        offset: data.ordersA.items.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          ordersA: {
            // @ts-ignore
            __typename: prev.ordersA.__typename,
            // @ts-ignore
            items: [...prev.ordersA.items, ...fetchMoreResult.ordersA.items],
            // @ts-ignore
            hasMore: fetchMoreResult.ordersA.hasMore,
          },
        });
      },
    });
  }

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.ordersA.items.map(order => order.id);
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch({type: newValue})

  };
  const handleBalanceCheckbox = (event: React.SyntheticEvent, newValue: string) => {
    console.log("handleBalanceCheckbox", state.balance, !state.balance);
    dispatch({type: 'TOGGLE_BALANCE', payload: !state.balance})
  };

  return (
    <Grid container spacing={1}>
      <Grid item  md={12} >
        <Tabs value={state.tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Processing" {...a11yProps(0)} value="PROCESSING" />
          <Tab label="Unpaid Complete" {...a11yProps(1)} value="UNPAID_COMPLETE" />
          <Tab label="All Unpaid" {...a11yProps(2)} value="ALL_UNPAID" />
          <Tab label="Search" {...a11yProps(3)} value="SEARCH" />
        </Tabs>
      </Grid>
      <Grid item  md={5} >

        <Select
          value={state.status}
          onChange={handleStatus}
          options={ORDER_STATES}
          isMulti={true}
        />

        <form onSubmit={handleSubmit(handleSearch)}>
          <TextField name="search" inputRef={register({required: true, minLength: 2, maxLength: 12})} style={{width:'320px'}}></TextField>
          <Button size="medium" variant="contained" color="primary" type="submit" >Go</Button>
        </form>
          <span><Checkbox
            checked={state.balance}
            onChange={handleBalanceCheckbox}
            inputProps={{ 'aria-label': 'controlled' }}
            overrides={{
              Checkmark: {
                style: {
                  borderWidth: '2px',
                  borderRadius: '4px',
                },
              },
            }}
          >Balance Only</Checkbox>{state.balance && <TextField name="minBal" type="number" label="Min Balance" onChange={(event) => dispatch({type: 'SET_BALANCE', payload: event.target.value})}></TextField>} </span>

      </Grid>
      <Grid  item  md={4} >
      </Grid>
      <Grid item  md={3} style={{textAlign: 'right'}}>
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
                <TableCell align="right">Order Total</TableCell>
                <TableCell align="center">Balance</TableCell>
                <TableCell align="center">Paid Via</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {data?.ordersA?.items?.map(row => (
                  <TableRow key={row.id}>
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
                      <Link to={`order-details/${row.reference}`}>{row.id}</Link>
                    </TableCell>
                    <TableCell align="left">{row.reference}</TableCell>

                    <TableCell align="left">{row?.deliveryAddress?.firstName} {row?.deliveryAddress?.lastName}</TableCell>
                    <TableCell align="right">{row.total} <sup>OMR</sup> </TableCell>
                    <TableCell align="right">{row.balance}</TableCell>

                    <TableCell align="center">{row.paymentMethod}</TableCell>
                    <TableCell align="right"> <TimeAgo date={row.createdDate} /></TableCell>
                    <TableCell align="right">
                      {row.orderState}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </TableContainer>
        {data?.ordersA?.hasMore && (
          <Button onClick={loadMore}>Load More</Button>
        )}
      </Grid>
    </Grid>
  );
}
