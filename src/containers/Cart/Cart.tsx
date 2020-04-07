import React, {useEffect, useReducer, useState} from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import {
  Grid,
} from '../../components/FlexBox/FlexBox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import { useAlert } from "react-alert";
import {
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
import {useForm} from "react-hook-form";
import {Alert} from "@material-ui/lab";
const CREATE_PURCHASE = gql`
  mutation createPurchase($dto: PurchaseInput) {
    createPurchase(dto: $dto) {
      id
    }
  }
`;
const CREATE_CART = gql`
  mutation createCart($cart: CheckoutCartInput) {
    createCart(cart: $cart) {
      id
      phone
      email
      secureKey
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

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Cart() {
  const [createCartMutation] = useMutation(CREATE_CART, { context: { clientName: "shopLink" }});
  const [po, setPO] = useState(0);
  const [items, setItems] = useState([]);
  const [secureKey, setSecureKey] = useState('');
  const [create, setCreate] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [total, setTotal] = useState();
  const [subtotal, setSubtotal] = useState();
  const { register, handleSubmit, errors } = useForm();

  const { data:merchants, loading:merhcnatsLoading} = useQuery(MERCHANTS, { context: { clientName: "shopLink" }});
  const alert = useAlert();
  const classes = useStyles();

  const calcSubtotal = () => items.reduce((sum,p) => sum + p.quantity * p.price, 0);
  const onSubmit = data => {
    console.log(data);
    let newItems =
        [...items,
          {...data}
        ];
    setItems(newItems);
  }

  const onSaveCart = async () => {
    let cart = {
      name: name,
      email: email,
      phone: phone,
      items: [
          ...items
      ]
    };
    const {
      data: { createCart },
    }: any = await createCartMutation({
      variables: { cart},
    });
    if(createCart) {
      alert.success("Cart saved successfully");
      setCreate(true);
      setSecureKey(createCart.secureKey);
    }
  }

  if(merhcnatsLoading)
    return <div>Loading</div>


  return (

      <Grid item xs={12} md={12}>
        <Heading>Cart</Heading>

        {/*<TextField id="outlined-basic" label="Ref" variant="outlined" value={cart.id} onChange={(e) => handleUpdate('UPDATE_REF', e.target.value)}/>*/}

        <Autocomplete
            id="combo-box-demo"
            //value={merchant}
            options={merchants.merchants}
            getOptionLabel={(option: any) => option.name}
            // defaultValue={[merchants.merchants[merchantId]]}
            style={{ width: 300 }}
            //onChange={(event, value) => handleUpdate('UPDATE_MERCHANT',value)}
            renderInput={params => <TextField {...params} label="Combo box" variant="outlined" />}
        />
        <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}/>
        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField id="outlined-basic" label="Phone" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
        {secureKey &&
        <Alert severity="success">https://checkout.badals.com/checkout/start?token={secureKey}</Alert>

        }
        <Button variant="contained" color="primary" size="large" onClick={onSaveCart}>
          Save Purchase
        </Button>
        <Typography variant="h6">Cart Items</Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items && items.map(q => (
                  <TableRow key={q.title}>
                    <TableCell align="right">{q.image}</TableCell>
                    <TableCell align="right">{q.url}</TableCell>
                    <TableCell align="right">{q.title}</TableCell>
                    <TableCell align="right">{q.cost}</TableCell>
                    <TableCell align="right">{q.price}</TableCell>
                    <TableCell align="right">
                      <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                          //onClick={()=>handleRemove(q)}
                      >
                      </Button>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          <TextField id="outlined-basic" label="Subtotal" variant="outlined" value={subtotal} disabled/>
         <TextField id="outlined-basic" label="Total" variant="outlined" value={total} disabled/>
        </TableContainer>
        <br/>
        <Paper>
          <Typography variant="subtitle1">Add New Cart Item</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="url" placeholder="Image URL" name="image" ref={register({required: true})} />
            <input type="url" placeholder="URL" name="url" ref={register({required: true})} />
            <input type="text" placeholder="Title" name="name" ref={register} />
            <input type="number" placeholder="Cost" name="cost" step="any"  ref={register} />
            <input type="number" placeholder="Price" name="price" step="any"  ref={register} />
            <input type="number" placeholder="Quantity" name="quantity" ref={register} />

            <input type="submit" />
          </form>
          {/*<form>
            <div>
              <TextField variant="filled" placeholder="Image URL" name="Image URL" value={image} onChange={(e) => setImage(e.target.value)}/>
            </div>
            <div>
              <TextField variant="filled" placeholder="URL" name="URL" value={url} onChange={(e) => setUrl(e.target.value)}/>
            </div>
            <div>
              <TextField variant="filled" placeholder="Cost" name="Cost" value={cost} onChange={(e) => setCost(e.target.value)}/>
            </div>
            <div>
              <TextField variant="filled" placeholder="Title" name="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
              <TextField variant="filled" placeholder="Price" name="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>

          </form>*/}

        </Paper>
    </Grid>
  );
}
