import React, {useEffect, useReducer, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TitleTextField} from '../Orders/Orders.style';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import { useAlert } from "react-alert";
import {
  Grid,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  TableCell,
  Typography,
  TableBody } from '@material-ui/core';
import Image from "../../components/Image/Image";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
const CREATE_PURCHASE = gql`
  mutation createPurchase($dto: PurchaseInput) {
    createPurchase(dto: $dto) {
      id
    }
  }
`;
const UPDATE_PURCHASE = gql`
  mutation updatePurchase($dto: PurchaseInput, $items: [PurchaseItemInput]) {
    updatePurchase(dto: $dto, items: $items) {
      id
    }
  }
`;
const PURCHASE_QUEUE = gql`
query purchaseQueue {
  purchaseQueue {
    id
    productName
    quantity
    price
    image
    sku
    cost
    orderId
    productId
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
const PURCHASE = gql`
query purchase($id: Long) {
  purchase(id: $id) {
    id
    items {
      id
      sequence
      price
      quantity
      description
      orderItemId
    }
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
  quantityField: {
    width: '5ch',
  },

}));


function reducer(state, action) {
  //alert(action.type);
  //console.log(action);
  switch (action.type) {
    case 'UPDATE_MERCHANT':
      return {
        ...state,
        merchant: {...action.payload}
      }
    case 'UPDATE_DELIVERY_TOTAL':
      return {
        ...state,
        deliveryTotal: action.payload
      }
    case 'UPDATE_DISCOUNT_TOTAL':
      return {
        ...state,
        discountTotal: action.payload
      }
    case 'UPDATE_TAXES_TOTAL':
      return {
        ...state,
        taxesTotal: action.payload
    }
    case 'UPDATE_SHIPPING_INSTRUCTIONS':
      return {
        ...state,
        shippingInstructions: action.payload
    }
    case 'UPDATE_REF':
      return {
        ...state,
        ref: action.payload
    }
    case 'ADD_ITEM':
      return {
        ...state,
        purchaseItems: [
          ...state.purchaseItems,
          action.payload
        ]
      }

    case 'REMOVE_ITEM':
      const orderIdToRemove = action.payload;
      const remId = _.findIndex(state.purchaseItems, ['orderItemId', orderIdToRemove])
      return  {
        ...state,
        purchaseItems: [...state.purchaseItems.slice(0, remId), ...state.purchaseItems.slice(remId + 1)]
      };

    case 'UPDATE_PRICE':
    case 'UPDATE_QUANTITY':
    case 'UPDATE_DESCRIPTION':
      let orderIdToUpdate = action.payload.oid;
      let newItems;
      if(_.findIndex(state.purchaseItems, ['orderItemId', orderIdToUpdate]) > -1) {
        //console.log(action.payload.description);
        newItems = Object.assign([], state.purchaseItems.map(item => {
          if (item.orderItemId === orderIdToUpdate) {
            //console.log('here');
            if(action.type==='UPDATE_PRICE') item.price = action.payload.price;
            if(action.type==='UPDATE_QUANTITY') item.quantity = action.payload.quantity;
            if(action.type==='UPDATE_DESCRIPTION') item.description = action.payload.description;
          }
          //console.log('item',item);
          return item;
        }));
      }
      else {
        return state;
      }
      //console.log(newItems);
      return {
        ...state,
        purchaseItems: newItems
      };

    default:
      return state;
  }

}


export default function PurchaseForm({purchase}) {
  const [updatePurchaseMutation] = useMutation(UPDATE_PURCHASE,{ context: { clientName: "shopLink" }});
  const [po, setPO] = useState(0);
  const [items, setItems] = useState([]);
  const [create, setCreate] = useState(true);
  const [update, setUpdate] = useState(false);
  const [pqButton, setPQButton] = useState([]);

  const [total, setTotal] = useState(purchase.total);
  const [subtotal, setSubtotal] = useState(purchase.subtotal);


  const { data, loading, error, refetch } = useQuery(PURCHASE_QUEUE, {fetchPolicy: "network-only", context: { clientName: "shopLink" }});
  const { data:merchants, loading:merhcnatsLoading} = useQuery(MERCHANTS,{fetchPolicy: "network-only", context: { clientName: "shopLink" }});
  const [state, dispatch] = useReducer(reducer, purchase);
  //console.log(state);
  // console.log(merchants);
  useEffect(()=>{
    setSubtotal(calcSubtotal());
    setTotal(calcSubtotal() + Number(state.deliveryTotal) + Number(state.taxesTotal) - Number(state.discountTotal));
  },[state]);

  const alert = useAlert();
  const classes = useStyles();

  const calcSubtotal = () => state.purchaseItems.reduce((sum,p) => sum + p.quantity * p.price, 0);

  const savePurchase = async () => {
    //console.log(state);
    const dto = {...state, merchantId: state.merchantObj.id};
    delete dto.purchaseItems;
    delete dto.invoiceDate;
    delete dto.merchantObj;
    delete dto.__typename;

    const purchaseItems = state.purchaseItems.map(({id, orderItemId, price, quantity, description, sequence, productId}) => ({
      id,
      orderItemId,
      price,
      quantity,
      description,
      sequence,
      productId
    }));
    //console.log(dto);
    //console.log(purchaseItems);

    const {
      data: { updatePurchase },
    }: any = await updatePurchaseMutation({
      variables: { dto, items: purchaseItems },
    });
    if(updatePurchase)  {
      alert.success("Purchase saved successfully");
      //setPO(createPurchase.id);
      setCreate(true);
      dispatch(updatePurchase);
      //setItems(updatePurchase.items);
    }
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  if(loading || merhcnatsLoading) {
    return <div>Loading</div>
  }

  function handleChangeQuantity(q: any, newValue) {
    dispatch({type: 'UPDATE_QUANTITY', payload: {oid: q.orderItemId, quantity: newValue }})
  }

  function handleChangePrice(q: any, newValue) {
    dispatch({type: 'UPDATE_PRICE', payload: {oid: q.orderItemId, price: newValue }})
  }

  function handleChangeDescription(q: any, newValue) {
    dispatch({type: 'UPDATE_DESCRIPTION', payload: {oid: q.orderItemId, description: newValue }})
  }

  function handleAdd(q) {
    dispatch({type: 'ADD_ITEM', payload: {

        sequence:state.purchaseItems.length+1,
        price: q.cost,
        quantity: q.quantity,
        description: q.productName,
        orderItemId: q.id,
        productId: q.productId
      }});
  }

  function handleRemove(q) {
    dispatch({type: 'REMOVE_ITEM', payload: q.orderItemId});
  }

  function handleUpdate(type: string, payload: string) {
    dispatch({type: type, payload: payload});
  }

  const merchantsx =  [{name:"ali", id:1},{name:"mas",id:2}];
  // @ts-ignore
  // @ts-ignore
  return (
      <Grid container xs={12} md={12}>

        <Grid item md={4}>
          <Autocomplete
              id="combo-box-demo"
              value={state.merchantObj}
              options={merchants.merchants}
              getOptionLabel={(option: any) => option.name}
              defaultValue={[merchants.merchants[state.merchantId]]}
              style={{ width: 300 }}
              onChange={(event, value) => handleUpdate('UPDATE_MERCHANT',value)}
              renderInput={params => <TextField size="small" {...params} label="Merchant" variant="outlined" />}
          />
        </Grid>
        <Grid item md={3}>
          <TextField size="small" id="outlined-basic" label="Shipping Instructions" variant="outlined" value={state.shippingInstructions}   onChange={(e) => handleUpdate('UPDATE_SHIPPING_INSTRUCTIONS', e.target.value)}/>

        </Grid>
        <Grid item md={2}>
          <TextField size="small" id="outlined-basic" label="Ref" variant="outlined" value={state.id} onChange={(e) => handleUpdate('UPDATE_REF', e.target.value)}/>
        </Grid>
        <Grid item md={3} style={{textAlign:'right'}}>
          <Button variant="contained" color="primary" size="large" onClick={savePurchase}>
            Save
          </Button>
        </Grid>




        <Grid item md={12}>
          <Paper>
        <Typography variant="h6">Purchase Items</Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">

                </TableCell>
                <TableCell align="right">

                </TableCell>
                <TableCell align="right">

                </TableCell>
                <TableCell align="right">Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.purchaseItems && state.purchaseItems.map(q => (
                  <TableRow key={q.orderItemId}>
                    <TableCell align="right">{q.sequence}</TableCell>
                    <TableCell component="th" scope="row">
                      <TextField  size="small" variant="filled" className={classes.titleField} placeholder="Description" name="Description" value={q.description} onChange={(e) => handleChangeDescription(q, e.target.value)}/>
                    </TableCell>
                    <TableCell align="right"><TextField size="small" variant="filled" placeholder="Amount" name="Amount" value={q.quantity} onChange={(e) => handleChangeQuantity(q, e.target.value)}/></TableCell>
                    <TableCell align="right"><TextField size="small" variant="filled" placeholder="Price" name="Price" value={q.price} onChange={(e) => handleChangePrice(q, e.target.value)}/></TableCell>
                    <TableCell align="right">
                      <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                          onClick={()=>handleRemove(q)}
                      >
                      </Button>
                    </TableCell>

                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

            <TextField size="small" id="outlined-basic" label="Subtotal" variant="outlined" value={subtotal} disabled/>
            <TextField size="small" id="outlined-basic" label="Delivery" variant="outlined" value={state.deliveryTotal}  onChange={(e) => handleUpdate('UPDATE_DELIVERY_TOTAL', e.target.value)}/>
            <TextField size="small" id="outlined-basic" label="Taxes" variant="outlined" value={state.taxesTotal}  onChange={(e) => handleUpdate('UPDATE_TAXES_TOTAL', e.target.value)}/>
            <TextField size="small" id="outlined-basic" label="Discount" variant="outlined" value={state.discountTotal}  onChange={(e) => handleUpdate('UPDATE_DISCOUNT_TOTAL', e.target.value)}/>
            <TextField size="small" id="outlined-basic" label="Total" variant="outlined" value={total} disabled/>
          </Paper>

        </Grid>
        <Typography variant="h6">PurchaseQueue</Typography>
        <Button variant="contained" color="secondary" onClick={()=>{refetch({})}}>
          Refresh
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={savePurchase}>
          Save
        </Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Link</TableCell>
                <TableCell align="right">Order</TableCell>
              </TableRow>
            </TableHead>
            {data && <TableBody>
              {data.purchaseQueue.map(q => (
                  <TableRow key={q.id}>
                    <TableCell align="right">{q.id}</TableCell>
                    <TableCell align="right"><Image url={q.image} className="product-image" style={{maxWidth: '70px'}} /></TableCell>
                    {q.sku ?
                        <TableCell component="th" scope="row">
                          <a href={`http://www.amazon.com/dp/${q.sku}`} target="_blank">
                            {q.productName}
                          </a>
                        </TableCell> : <TableCell component="th" scope="row">
                          {q.productName}
                        </TableCell>
                    }
                    <TableCell align="right">{q.quantity}</TableCell>
                    <TableCell align="right">{q.price}</TableCell>
                    <TableCell align="right">
                      <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.button}
                          startIcon={<SaveIcon />}
                          onClick={()=>handleAdd(q)}
                      />
                    </TableCell>
                    <TableCell align="right"><Link to={`/order-details/${q.orderId}`}>{q.orderId}</Link></TableCell>
                  </TableRow>
              ))}
            </TableBody>}
          </Table>
        </TableContainer>
      </Grid>
  );
}
