import React, { useState } from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import { useAlert } from "react-alert";
import Moment from 'react-moment';
import {
  Grid,
  Row as Rows,
  Col as Column,
} from '../../components/FlexBox/FlexBox';
import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import { Link, useParams  } from 'react-router-dom';
import {
  OrderInfoPaper
} from './Orders.style';
import NoResult from '../../components/NoResult/NoResult';
import StickerCard from "../../components/Widgets/StickerCard/StickerCard";
import {CartIconBig, CoinIcon} from "../../components/AllSvgIcon";
import Image from '../../components/Image/Image';
import Button from "../../components/Button/Button";
import Payment from "./Payment";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Checkbox from "@material-ui/core/Checkbox";
import {EditOrderDialog} from "./EditOrderDialog";
import TableFooter from "@material-ui/core/TableFooter";

const GET_ORDER = gql`
  query orderA($id: ID) {
    orderA(id: $id) {
      id
      reference
      createdDate
      invoiceDate
      total
      invoiceDate
      paymentMethod
      subtotal
      orderState
      deliveryTotal
      discountsTotal
      deliveryDate
      customer {
        id
        firstname
        lastname
      }
      deliveryAddress {
          firstName
          lastName
          line1
          line1
          city
      }
      orderItems {
        id
        sequence
        productSku
        productUrl
        productName
        price
        quantity
        image
        lineTotal
      }
    }
  }
`;
const SEND_PAYMENT_SMS = gql`
mutation sendPaymentSms($id: ID, $mobile: String) {
  sendPaymentSms(id:$id, mobile:$mobile) {
    value
  }
}
`;
const EDIT_ORDER = gql`
mutation editOrder($id: ID, $orderItems: [OrderItemInput]) {
  editOrder(id:$id, orderItems:$orderItems) {
    id
  }
}
`;
const SEND_VOLTAGE_EMAIL = gql`
mutation sendProductLevelEmail($orderId: ID, $orderItems: [Long], $template: String) {
  sendProductLevelEmail(orderId:$orderId, orderItems:$orderItems, template: $template) {
    value
  }
}
`;

type CustomThemeT = { red400: string; textNormal: string; colors: any };
const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();



const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  '@media only screen and (min-width: 768px)': {
    alignItems: 'center',
  },
}));

const statusSelectOptions = [
  { value: 'delivered', label: 'Delivered' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'failed', label: 'Failed' },
];

export default function OrderDetails(props) {
  let { slug } = useParams();
  console.log(slug);
  const [sendPaymentSmsMutation] = useMutation(SEND_PAYMENT_SMS, { context: { clientName: "shopLink" }});
  const [sendVoltageEmailMutation] = useMutation(SEND_VOLTAGE_EMAIL, { context: { clientName: "shopLink" }});
  const [editOrderMutation] = useMutation(EDIT_ORDER, { context: { clientName: "shopLink" }});
  const { data, loading, error, refetch } = useQuery(GET_ORDER, {
    variables: {
      id: slug
    },
    fetchPolicy: "network-only",
    context: { clientName: "shopLink" }
  });
  const [contactbutton,setContactbutton] = useState(true);
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [editdialog, setEditdialog] = useState(false);
  const alert = useAlert();

  const onSendSms = async data => {

    setContactbutton(false);
    const {
      data: { sendPaymentSms },
    }: any = await sendPaymentSmsMutation({
      variables: {id: data.orderA.id}
    });
    if(sendPaymentSms)  {
      alert.success(sendPaymentSms.value);
    }
  }

  const onEditOrder = async data => {
    const {
      data: { editOrder },
    }: any = await editOrderMutation({
      variables: {id: data.orderA.id, orderItems: [...data.orderItems]}
    });
    if(editOrder)  {
      alert.success(editOrder.id);
      await refetch();
    }
  }

  const sendVoltageEmail = async () => {
    if(checkedId.length < 1) {
      alert.error("Must select one or more products");
      return;
    }
    const {
      data: { sendProductLevelEmail },
    }: any = await sendVoltageEmailMutation({
      variables: {orderId: data.orderA.id, orderItems: checkedId, template: 'VOLTAGE'}
    });
    if(sendProductLevelEmail)  {
      alert.success(sendProductLevelEmail.value);
      await refetch();
    }


  }
  //const []

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  if (loading)
    return <div>Loading </div>

  function handleCheckbox(event) {

    let value = event.target.value;
    console.log('handleCheckbox',value)
    if (!checkedId.includes(value)) {
      setCheckedId(prevState => [...prevState, value]);
    } else {
      setCheckedId(prevState => prevState.filter(id => id !== value));
    }
  }
  const onEditStart = () => setEditdialog(true);
  const onCancelEdit = () => setEditdialog(false);

  return (
    <Grid fluid={true}>
      <EditOrderDialog onSubmit={onEditOrder} onClose={onCancelEdit} open={editdialog} orderItems={data.orderA.orderItems} />
      <Row>
        <Col lg={3} sm={6} xs={12} className='mb-30'>
          <OrderInfoPaper>
            <Typography variant="caption">Basic Info</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={data.orderA.reference}
                  secondary= 'Order'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${data.orderA.customer.firstname} ${data.orderA.customer.lastname} / ${data.orderA.customer.id}`}
                  secondary= 'Customer'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${data.orderA.orderState}`}
                  secondary= 'Status'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${data.orderA.currency} ${data.orderA.total}`}
                  secondary= 'Total'
                  />
              </ListItem>
            </List>
          </OrderInfoPaper>
        </Col>
        <Col lg={3} sm={6} xs={12} className='mb-30'>
          <OrderInfoPaper>
            <Typography variant="caption">Delivery Info</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`${data.orderA.deliveryAddress.firstName} ${data.orderA.deliveryAddress.lastName}`}
                  secondary= 'Name'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${data.orderA.deliveryAddress.line1} ${data.orderA.deliveryAddress.line2}`}
                  secondary= 'Address'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={data.orderA.deliveryAddress.city}
                  secondary= 'City'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={data.orderA.deliveryAddress.phone}
                  secondary= 'Phone'
                />
              </ListItem>
            </List>
          </OrderInfoPaper>
        </Col>
        <Col lg={3} sm={6} xs={12} className='mb-30'>
          <OrderInfoPaper>
            <Typography variant="caption">Actions</Typography>
            <div>
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
              <Button onClick={onSendSms} disabled={!contactbutton}>SMS Contact</Button>
              <Button onClick={onEditStart} >Edit order</Button>
              <Button>Cancel</Button>
            </ButtonGroup>
            </div>
          </OrderInfoPaper>
        </Col>
        <Col lg={3} sm={6} xs={12} className='mb-30'>
          <Payment orderId={data.orderA.id} orderRef={data.orderA.reference}/>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <TableContainer component={Paper}>
            <Table  size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Seq</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Line Total</TableCell>
                  <TableCell align="center">Sku</TableCell>
                </TableRow>
              </TableHead>
              {data && data.orderA.orderItems && (
                <TableBody>
                  {data.orderA.orderItems.map(row => (
                    <TableRow key={row.sequence}>
                      <TableCell align="right">
                        <Checkbox
                          name={row.id}
                          checked={checkedId.includes(row.id)}
                          onChange={handleCheckbox}
                          value={row.id}
                      />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.sequence}
                      </TableCell>
                      <TableCell align="left"><Image url={row.image} className="product-image" style={{maxWidth: '70px'}} /></TableCell>
                      <TableCell component="th" scope="row">
                      {row.productSku ?
                          <a href={`http://www.amazon.com/dp/${row.productSku}`} target="_blank">
                            {row.productName}
                          </a>:
                        <span>{row.productName}</span>
                      }
                        </TableCell>
                      <TableCell align="center">{row.quantity}</TableCell>

                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="right">OMR {row.lineTotal}</TableCell>
                      <TableCell align="right">
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              )}
              <TableFooter>
                <Button onClick={sendVoltageEmail}>Send Voltage Email</Button>
              </TableFooter>
            </Table>
          </TableContainer>

        </Col>
      </Row>
    </Grid>
  );
}
