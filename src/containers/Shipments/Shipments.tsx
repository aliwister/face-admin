import React, { useState } from 'react';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';

import Checkbox from '../../components/CheckBox/CheckBox';
import { useAlert } from "react-alert";
import { Link } from 'react-router-dom';
import {
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

import {useForm} from "react-hook-form";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";

import useTheme from "@material-ui/core/styles/useTheme";

import {CreateShipmentDialog} from "./components/CreateShipmentDialog";
import {StatusMultiSelect} from "./components/StatusMultiSelect";

const SHIPMENTS = gql`
  query shipments($status: [ShipmentStatus], $type: ShipmentType) {
      shipments(status: $status, type:$type) {
        id
        actualShipCost
        latestCancelDate
        handlingInstructions
        reference
        trackingNum
        trackingLink
        shipmentMethod
        shipmentType
        shipmentStatus
        customerId
        merchantId
        customerFirstName
        customerLastName
        merchantName
        progressTotal
        progressDone
        progressTodo
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
const ACCEPT_SHIPMENT = gql`
  mutation acceptShipment($shipment: ShipmentInput) {
    acceptShipment(shipment: $shipment) {
      id
    }
  }
`;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
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

export default function Shipments() {
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(['PENDING','PROCESSING']);
  const [limit, setLimit] = useState([]);
  const [search, setSearch] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [acceptnewdialog, setAcceptnewdialog] = React.useState(false);
  const [merchant, setMerchant] = React.useState({id:0});
  const alert = useAlert();
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();
  const { data:merchants, loading:merhcnatsLoading} = useQuery(MERCHANTS, {context: { clientName: "shopLink" }});
  const [acceptShipmentMutation] = useMutation(ACCEPT_SHIPMENT,{context: { clientName: "adminLink" }});


  const { data, error, refetch } = useQuery(SHIPMENTS, {
    variables: {
      status: status,
      type: 'CUSTOMER'
    },
    fetchPolicy: "network-only",
    context: { clientName: "adminLink" }
  });

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function handleStatus(event) {
    setStatus(event.target.value);
    /*
    if (value.length) {
      refetch({
        status: value,
        type: 'CUSTOMER'
      });
    } else {
      refetch({ status: 'PENDING', type: 'CUSTOMER'});
    }*/
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


  const handleClose = () => {
    setAcceptnewdialog(false);
  };

  if(merhcnatsLoading) {
    return <div>Loading</div>
  }
  const onSubmit = data => console.log(data);

  const handleSubmitNewShipment = async data => {
    console.log(data);
    // @ts-ignore
    const dto = {
      ...data,
      shipmentStatus: 'PROCESSING',
      merchantId: data.merchant.id,
      shipmentType: data.shipmentType.value,
      shipmentMethod: data.shipmentMethod.value
    };
    console.log(dto);
    delete dto['merchant'];
    const {
      data: { acceptShipment },
    }: any = await acceptShipmentMutation({
      variables: { shipment: dto },
    });
    if(acceptShipment)  {
      alert.success(acceptShipment.id);
      history.push('/shipment-details/'+acceptShipment.id);
    }
  }

  function handleAcceptNewButton() {
    setAcceptnewdialog(true);
  }

  function handlePrepareButton() {
  }

  const handleChange = (event, newValue) => {
    if(tab != newValue) {
      setTab(newValue);
      if(newValue == 0) {
        refetch({
            status: status,
            type: 'CUSTOMER'
          });
      }
      if (newValue == 1) {
        refetch({
          status: status,
          type: 'PURCHASE'
        });
      }
    }

  };

  return (
    <>
      <CreateShipmentDialog show={acceptnewdialog} onClose={handleClose} onSubmit={handleSubmitNewShipment} merchants={merchants} />
      <Grid container spacing={1}>
        <Grid item  md={3} >
          <StatusMultiSelect handleStatus={handleStatus} status={status} />
        </Grid>
        <Grid item  md={2} >
        </Grid>
        <Grid  item  md={4} >
        </Grid>
        <Grid item  md={3} style={{textAlign: 'right'}}>
          <Button variant="contained" color="primary" onClick={handleAcceptNewButton} >
            Accept New
          </Button>
          <Button variant="contained" color="primary" onClick={handlePrepareButton} >
            Prepare
          </Button>
          <Link to="inventory">Inventory</Link>
        </Grid>

        <Grid item xs={12}>
          <AppBar position="static">
            <Tabs value={tab} onChange={handleChange}>
              <Tab label="Customer Shipments"  />
              <Tab label="Purchase Shipments"  />
              <Tab label="Other"  />
            </Tabs>
          </AppBar>

          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="center">Ref</TableCell>
                  <TableCell align="center">To</TableCell>
                  <TableCell align="center">Shipment Method</TableCell>
                  <TableCell align="center">Progress</TableCell>
                </TableRow>
              </TableHead>
              {data && data.shipments.length && (
                <TableBody>
                  {data.shipments.map(row => (
                    <TableRow key={row.orderId}>
                      <TableCell align="right">
                        <Checkbox
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
                        />
                      </TableCell>
                      <TableCell component="th" scope="row"><Link to={`shipment-details/${row.id}`}>{row.id}</Link></TableCell>
                      <TableCell align="left">{row.customerFirstName} {row.customerLastName}</TableCell>
                      <TableCell align="left">{row.shipmentType}</TableCell>
                      <TableCell align="right">{row.shipmentStatus}</TableCell>
                      <TableCell align="center">{row.reference}</TableCell>
                      <TableCell align="right">{row.city}</TableCell>
                      <TableCell align="right">{row.shipmentMethod}</TableCell>
                      <TableCell align="right">{Math.round(100*row.progressTodo/((row.progressTotal+0) - (row.progressDone+0)))} %</TableCell>
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
