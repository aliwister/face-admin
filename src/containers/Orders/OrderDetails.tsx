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
import TableFooter from "@material-ui/core/TableFooter";
import {ActionReasonDialog} from "./components/ActionReasonDialog";
import {useAddDiscountMutation, useGetAdminFileMutation, useOrderAQuery} from "../../codegen/generated/_graphql";
import LaunchIcon from '@material-ui/icons/Launch';
import {Shipments} from "./components/Shipments";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import badalsAPI, {flowAPI} from "../../api/config";
import {DiscountDialog} from "./components/DiscountDialog";
import {EditOrderDialog} from "./components/EditOrderDialog";
import {ReturnDialog} from "./components/ReturnDialog";
import {MerchantURL} from "../../components/MerchantURL/MerchantURL";
import AuditHistory from "./AuditHistory";
import {WorkItems} from "../Dashboard/WorkItems";
import AdvancedTracking from "./AdvancedTracking";




const SEND_PAYMENT_SMS = gql`
mutation sendPaymentSms($id: ID, $mobile: String) {
  sendPaymentSms(id:$id, mobile:$mobile) {
    value
  }
}
`;

const EDIT_ORDER = gql`
mutation editOrder($id: ID, $orderItems: [OrderItemInput], $reason: String) {
  editOrder(id:$id, orderItems:$orderItems, reason: $reason) {
    id
  }
}
`;
const CANCEL_ORDER = gql`
mutation cancelOrder($id: ID, $reason: String) {
  cancelOrder(id:$id, reason:$reason) {
    id
  }
}
`;
const CLOSE_ORDER = gql`
mutation closeOrder($id: ID, $reason: String) {
  closeOrder(id:$id, reason:$reason) {
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

const SEND_ORDER_EMAIL = gql`
mutation sendOrderLevelEmail($id:ID, $template:String) {
    sendOrderLevelEmail(id: $id, template: $template) {
        value
    } 
}
`;
const SHIPMENTS = gql`
query track ($ref: String) {
  track(ref: $ref) {
    id
    shipment {
      status
      trackingNum
      carrier
      type
      date
      content {
        description
        image
        quantity
      }
      progress {
        shipmentEventId
        shipmentEventDescription
        status
        createdDate
        eventDate
        details
      }
      docs {
        id
        fileKey
      }
    }
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


export default function OrderDetails(props) {
  let { slug } = useParams();
  console.log(slug);
  const [sendOrderLevelEmailMutation] = useMutation(SEND_ORDER_EMAIL,{context: { clientName: "shopLink" }});
  const [sendPaymentSmsMutation] = useMutation(SEND_PAYMENT_SMS, { context: { clientName: "shopLink" }});
  const [sendVoltageEmailMutation] = useMutation(SEND_VOLTAGE_EMAIL, { context: { clientName: "shopLink" }});
  const [editOrderMutation] = useMutation(EDIT_ORDER, { context: { clientName: "shopLink" }});
  const [cancelOrderMutation] = useMutation(CANCEL_ORDER, { context: { clientName: "shopLink" }});
  const [closeOrderMutation] = useMutation(CLOSE_ORDER, { context: { clientName: "shopLink" }});
  const [getAdminFileMutation] = useGetAdminFileMutation({ context: { clientName: "shopLink" }});
  const [addDiscountMutation] = useAddDiscountMutation({context : {clientName: "shopLink"}});
  const { data:orderData, loading, error, refetch } = useOrderAQuery({
    variables: {
      id: slug
    },
    fetchPolicy: "network-only",
    context: { clientName: "shopLink" }
  });
  const { data:dShip, loading:lShip, error:eError, refetch:eRef } = useQuery(SHIPMENTS, {
    variables: {
      ref: slug
    },
    context: { clientName: "adminLink" }
  });
  const [contactbutton,setContactbutton] = useState(true);
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [editdialog, setEditdialog] = useState(false);
  const [returndialog, setReturndialog] = useState(false);
  const [canceldialog, setCanceldialog] = useState(false);
  const [closedialog, setClosedialog] = useState(false);
  const [discount, setDiscountdialog] = useState(false);
  const [b2,setB2] = useState(true);
  const alert = useAlert();

  const onSendSms = async data => {

    setContactbutton(false);
    const {
      data: { sendPaymentSms },
    }: any = await sendPaymentSmsMutation({
      variables: {id: orderData.orderA.id}
    });
    if(sendPaymentSms)  {
      alert.success(sendPaymentSms.value);
    }
  }

  const onReturnRequest = async formData => {

    console.log(formData);


    formData.orderItems.filter(function(el) { return el.quantity > 0 }).forEach(function(a,b) {
      let externalId = `${slug}-${a.sequence}`;
      let testData = {
        "type": "returnWorkflow",
        "externalId": externalId,
        "businessKey": slug,
        "activate": true,
        "stateVariables": {
          "orderId":slug,
          "requestData": {
            reason: formData.reason.value,
            instructions: formData.instructions,
            onUs: formData.onUs,
            toVendor: formData.toVendor,
            replacement: formData.replacement,
            sequence: a.sequence,
            productName: a.productName,
            productId: a.productId,
            sku: a.productSku,
            quantity: a.quantity,
            ticketUrl: formData.ticketUrl,
            po: a.po
          }
        }
      };
      flowAPI.put("/workflow-instance", testData)
        .then(res => {
          alert.success(res.statusText);
        });
    });
  }

  const onAddDiscount = async formData => {
    const {
      data: { addDiscount },
    }: any = await addDiscountMutation({
      variables: {id: orderData.orderA.id, amount: formData.amount, couponName: formData.couponName}
    });
    if(addDiscount)  {
      alert.success(addDiscount.id);
      await refetch();
    }
  }
  const onEditOrder = async formData => {
    const {
      data: { editOrder },
    }: any = await editOrderMutation({
      variables: {id: orderData.orderA.id, orderItems: [...formData.orderItems], reason: formData.reason}
    });
    if(editOrder)  {
      alert.success(editOrder.id);
      await refetch();
    }
  }
  const onCancelOrder = async formData => {
    const {
      data: { cancelOrder },
    }: any = await cancelOrderMutation({
      variables: {id: orderData.orderA.id, reason: formData.reason}
    });
    if(cancelOrder)  {
      alert.success(cancelOrder.id);
      setCanceldialog(false);
      await refetch();
    }
  }
  const onCloseOrder = async formData => {
    const {
      data: { closeOrder },
    }: any = await closeOrderMutation({
      variables: {id: orderData.orderA.id, reason: formData.reason}
    });
    if(closeOrder)  {
      alert.success(closeOrder.id);
      setClosedialog(false);
      await refetch();
    }
  }

  const onGetAdminFile = async fileKey => {
    const {
      data: { getAdminFile },
    }: any = await getAdminFileMutation({
      variables: {filename: fileKey}
    });
    if(getAdminFile)  {
      //alert.success(getAdminFile.uploadUrl);
      window.open(getAdminFile.uploadUrl, '_blank', 'noopener,noreferrer')
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
      variables: {orderId: orderData.orderA.id, orderItems: checkedId, template: 'VOLTAGE'}
    });
    if(sendProductLevelEmail)  {
      alert.success(sendProductLevelEmail.value);

      orderData.orderA.orderItems.filter(function(el) { return checkedId.includes(el.id) }).forEach(function(a,b) {
        let externalId = `${slug}-${a.sequence}-APP`;
        let testData = {
          "type": "approvalWorkflow",
          "externalId": externalId,
          "businessKey": slug,
          "activate": true,
          "stateVariables": {
            "requestData": {
              type: "VOLTAGE",
              sequence: a.sequence,
              productName: a.productName,
              productId: a.productId,
              sku: a.productSku,
              quantity: a.quantity,
            }
          }
        };
        flowAPI.put("/workflow-instance", testData)
          .then(res => {
            alert.success(res.statusText);
          });
      });

      //await refetch();
    }
  }
  const onSendOrderCreateEmail = async () => {
    setB2(false);
    const {
      data: { sendOrderLevelEmail },
    }: any = await sendOrderLevelEmailMutation({
      variables: {id: orderData.orderA.id, template: "NEW_ORDER"}
    });
    if(sendOrderLevelEmail)  {
      alert.success("Payment added");
    }
  }

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
  const onReturnStart = () => setReturndialog(true);
  const onCancelStart = () => setCanceldialog(true);
  const onAddDiscountStart = () => setDiscountdialog(true);
  const onCancelEdit = () => {setEditdialog(false); setCanceldialog(false); setClosedialog(false);setDiscountdialog(false); setReturndialog(false);}
  const onCloseStart = () => {setClosedialog(true);}

  return (
    <Grid fluid={true}>
      <EditOrderDialog onSubmit={onEditOrder} onClose={onCancelEdit} open={editdialog} orderItems={orderData.orderA.orderItems} />
      <ReturnDialog onSubmit={onReturnRequest} onClose={onCancelEdit} open={returndialog} orderItems={orderData.orderA.orderItems} />
      <ActionReasonDialog onSubmit={onCancelOrder} onClose={onCancelEdit} open={canceldialog} title={"Cancel Order"}/>
      <ActionReasonDialog onSubmit={onCloseOrder} onClose={onCancelEdit} open={closedialog} title={"Close Order"} />
      <DiscountDialog onSubmit={onAddDiscount} onClose={onCancelEdit} open={discount} title={"Discount Order"} />
      <Row>
        <Col lg={6} sm={6} xs={12} className='mb-30'>
          <OrderInfoPaper>
            <Typography variant="caption">Basic Info</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={<Link to={`${orderData.orderA.reference}`}> {orderData.orderA.reference} </Link>}
                  secondary= {`Order ${orderData.orderA.id} from cart ${orderData.orderA.cartId}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${orderData.orderA.customer.firstname} ${orderData.orderA.customer.lastname} / ${orderData.orderA.customer.id}`}
                  secondary= 'Customer'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${orderData.orderA.createdDate} ${orderData.orderA.orderState}`}
                  secondary= 'Status'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${orderData.orderA.customer.email}`}
                  secondary= 'Email'
                  />
              </ListItem>
            </List>
          </OrderInfoPaper>
        </Col>
        <Col lg={6} sm={6} xs={12} className='mb-30'>
          <OrderInfoPaper>
            <Typography variant="caption">Delivery Info</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`${orderData.orderA.deliveryAddress.firstName} ${orderData.orderA.deliveryAddress.lastName}`}
                  secondary= 'Name'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${orderData.orderA.deliveryAddress.line1} ${orderData.orderA.deliveryAddress.line2}`}
                  secondary= 'Address'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={orderData.orderA.deliveryAddress.city}
                  secondary= 'City'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={orderData.orderA.deliveryAddress.mobile}
                  secondary= 'Phone'
                />
              </ListItem>
            </List>
          </OrderInfoPaper>
        </Col>
        <Col lg={4} sm={4} xs={12} className='mb-30'>
          <OrderInfoPaper>
            <Typography variant="caption">Totals</Typography>
            <Table  size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row">
                  </TableCell>
                  <TableCell align="left">Subtotal</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">OMR {orderData.orderA.subtotal}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                  </TableCell>
                  <TableCell align="left">Delivery</TableCell>
                  <TableCell align="left">{orderData.orderA.carrier}</TableCell>
                  <TableCell align="left">OMR {orderData.orderA.deliveryTotal}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                {orderData.orderA.discountsTotal &&
                <TableRow>
                  <TableCell component="th" scope="row">
                  </TableCell>
                  <TableCell align="left">Discount</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">OMR {orderData.orderA.discountsTotal}</TableCell>
                  <TableCell align="right">{orderData.orderA.couponName}</TableCell>
                </TableRow>}
                <TableRow>
                  <TableCell component="th" scope="row">
                  </TableCell>
                  <TableCell align="left">Total</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">OMR {orderData.orderA.total}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </OrderInfoPaper>
        </Col>
        <Col lg={8} sm={8} xs={12} className='mb-30'>
          <Payment order={orderData.orderA} refetch={refetch}/>
        </Col>
      </Row>
      <Row>
        <Col lg={12} sm={12} xs={12} className='mb-30'>
          <Paper>
            <div>
              <ButtonGroup size="large" variant="contained" color="primary" aria-label="large outlined primary button group">
                <Button onClick={onSendSms} disabled={!contactbutton}>Send Payment SMS</Button>
                <Button onClick={onEditStart}>Edit Order</Button>
                <Button onClick={onAddDiscountStart}>Add Discount</Button>
                <Button onClick={onSendOrderCreateEmail} disabled={!b2} color="secondary">Send Order Confirmation</Button>
                <Button onClick={onReturnStart} color="secondary">Request Return</Button>
                <Button onClick={onCancelStart} color="secondary">Cancel Order</Button>
                <Button onClick={onCloseStart}>Close</Button>
              </ButtonGroup>
            </div>
          </Paper>
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
                  <TableCell align="center">PO</TableCell>
                </TableRow>
              </TableHead>
              {orderData && orderData.orderA.orderItems && (
                <TableBody>
                  {orderData.orderA.orderItems.map(row => (
                    <TableRow key={row.sequence}>
                      <TableCell align="left">
                        <Checkbox
                          name={row.id}
                          checked={checkedId.includes(row.id)}
                          onChange={handleCheckbox}
                          value={row.id}
                      />
                        {row.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.sequence}
                      </TableCell>
                      <TableCell align="left"><Image url={row.image} className="product-image" style={{maxWidth: '70px'}} /></TableCell>
                      <TableCell component="th" scope="row">
                        <MerchantURL merchantId={row.productMerchantId} sku={row.productSku} url={row.productUrl} name={row.productName}/>
                      </TableCell>
                      <TableCell align="center">{row.quantity}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="right">OMR {row.lineTotal}</TableCell>
                      <TableCell align="right">
                        {row.po &&
                        <Link to={`/purchase-details/${row.po}`}>{row.po}</Link>
                        }
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
      <Row>
        <Col md={12}>
          <Shipments shipments={dShip} onGetAdminFile={onGetAdminFile}/>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {orderData.orderA && <WorkItems businessKey={orderData.orderA.reference} showDone={true} showMine={false}/>}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {orderData.orderA && <AuditHistory id={orderData.orderA.id} type={"order"}/>}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {orderData.orderA && <AdvancedTracking id={orderData.orderA.reference} showAll={true}/>}
        </Col>
      </Row>

    </Grid>
  );
}
