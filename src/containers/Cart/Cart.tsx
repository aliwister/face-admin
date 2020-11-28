import React, {useEffect, useReducer, useState} from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import {
  Grid,
} from '../../components/FlexBox/FlexBox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm, useFieldArray } from "react-hook-form";

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
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

import DeleteIcon from '@material-ui/icons/Delete';

import {Alert} from "@material-ui/lab";
import {useFindByKeywordQuery, useHashtagsQuery, useCustomerQuery} from "../../codegen/generated/_graphql";
import {SearchResults} from "./SearchResults";
import TableForm from "../OrderForm/TableForm";

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
  const [cart, setCart] = useState({items:[], })
  const { data, error, refetch, fetchMore } = useFindByKeywordQuery(
    {
      variables: {
        keyword: "dkny"
      },
      context: { clientName: "shopLink" }
    });
  const { data:customer, refetch:refetchCustomer } = useCustomerQuery(
    {
      variables: {
        mobile: "96897072655"
      },
      context: { clientName: "shopLink" }
    });
  const { register, control, handleSubmit, watch } = useForm();
  const { fields, append, remove} = useFieldArray(
    {
      control,
      name: "items"
    }
  );

  const add = ({ref,title, url, cost, sku, salePrice, image}) => {
    console.log(ref);
    append(
      {
        name: title,
        description: title,
        ref: ref,
        productId: ref,
        url: url,
        cost: cost,
        price: salePrice,
        sku: sku,
        quantity: 1,
        pid: "",
        image: image,
      });

  }

  function removeItem(index) {
    console.log(index);
    console.log(fields);
    remove(index);
  }

  const [secureKey, setSecureKey] = useState('');
  const [create, setCreate] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [mobile, setMobile] = useState('');
  const [keyword, setKeyword] = useState('');
  const [total, setTotal] = useState();
  const [subtotal, setSubtotal] = useState();
/*  const [customer, setCustomer] = useState();*/

  const alert = useAlert();
  const classes = useStyles();
/*  const onSubmit = data => {
    console.log(data);
    let newItems =
        [...items,
          {...data}
        ];
    setItems(newItems);
  }*/

  const onSubmit = async (data) => {
    //console.log(data);
    const items = data.items.map(({pid, sku, url, productId, description, price, quantity, ref, cost, image}) => ({
      productId: Number(ref),
      ref: ref,
      sku,
      name: description,
      quantity,
      price,
      cost,
      image
    }));
    const addresses = customer.customer.addresses.map(({id, alias, line1, line2, city, mobile, __typename}) => ({
      id,
      alias,
      line1,
      line2,
      city,
      mobile
    }));


    let cart = {
      name:  customer.customer.firstname + " " + customer.customer.lastname,
      email: customer.customer.email,
      phone: customer.customer.mobile,
      //customerId: customer.customer.id,
      items,
      addresses: addresses,
      currency: data.currency.value,
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


  function findCustomer() {
    refetchCustomer({mobile: mobile});
  }

  function findProduct() {
    refetch({keyword: keyword})
  }

  return (

      <Grid item xs={12} md={12}>
        <h1>Cart</h1>


{/*        <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}/>
        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField id="outlined-basic" label="Phone" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />*/}
        <TextField id="outlined-basic" label="Customer Phone number" variant="outlined" value={mobile} onChange={(e) => setMobile(e.target.value)}/>
        {customer && customer.customer &&
        <>
          <TextField id="outlined-basic" label="Name" variant="outlined"
                     value={customer.customer.firstname + " " + customer.customer.lastname}
                     onChange={(e) => setName(e.target.value)}/>
          <TextField id="outlined-basic" label="Email" variant="outlined" value={customer.customer.email}
                     onChange={(e) => setEmail(e.target.value)}/>
        </>
        }
        <span>{customer && customer.customer.firstname}</span>
        <Button variant="contained" color="secondary" size="large" onClick={findCustomer}>
          Find
        </Button>

        {secureKey &&
        <Alert severity="success">https://checkout.badals.com/checkout/start?token={secureKey}</Alert>

        }

        <Typography variant="h6">Cart Items</Typography>
        <TextField id="outlined-basic" label="Product Name" variant="outlined" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
        <Button variant="contained" color="secondary" size="large" onClick={findProduct}>
          Find
        </Button>
        <div>
          {data && <SearchResults data={data.findByKeyword} add={add} />}
        </div>
        <Typography variant="h6">Cart Items</Typography>
        <TableForm register={register} onSubmit={handleSubmit(onSubmit)} fields={fields} remove={removeItem} watch={watch} order={cart} control={control}/>
        <br/>
{/*        <Button variant="contained" color="primary" size="large" onClick={onSaveCart}>
          Save Cart
        </Button>*/}
        {/*<Paper>
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
          <form>
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

          </form>

        </Paper>*/}
    </Grid>
  );
}
