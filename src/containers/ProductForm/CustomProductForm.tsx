import React, {useState, useCallback, useContext} from 'react';
import { useForm } from 'react-hook-form';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Scrollbars } from 'react-custom-scrollbars';
import {DrawerContext} from '../../context/DrawerContext';
import Uploader from '../../components/Uploader/Uploader';
import Button, { KIND } from '../../components/Button/Button';
import DrawerBox from '../../components/DrawerBox/DrawerBox';
import { Row, Col } from '../../components/FlexBox/FlexBox';
import Input from '../../components/Input/Input';
import { Textarea } from '../../components/Textarea/Textarea';
import { FormFields, FormLabel } from '../../components/FormFields/FormFields';
import { useAlert } from "react-alert";
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import {OPTIONS, TYPE_OPTIONS} from "../Products/components/Constants";
import green from "@material-ui/core/colors/green";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CircularProgress} from "@material-ui/core";
import {MerchantLookup} from "../../components/Merchant/MerchantsLookup";
import {watch} from "fs";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";


const GET_IMAGE_UPLOAD_URL = gql`
  mutation getAdminImageUploadUrl($filename: String, $merchant: String) {
    getAdminImageUploadUrl(filename: $filename, merchant: $merchant) {
      uploadUrl
      imageUrl
      status
    }
  }    
`;
export const CREATE_PRODUCT = gql`
  mutation createProduct($product: AddProductInput!, $isSaveES: Boolean, $currentMerchantId: Long) {
    createProduct(product: $product, isSaveES: $isSaveES, currentMerchantId: $currentMerchantId) {
      ref
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
  },
}));

type Props = any;

const AddProduct: React.FC<Props> = props => {
  const {drawerDispatch: dispatch, drawerState} = useContext(DrawerContext);
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);

  const openDrawer = useCallback(
    () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'STUB_PRODUCT_FORM' }),
    [dispatch]
  );

  const updateData = drawerState['data'];
  //console.log(updateData);
  const { watch, register, handleSubmit, setValue } = useForm({
    defaultValues: {
/*      name: 'Name',
      upc: '123',
      sku: 'sku',
      brand: 'brand',
      cost: 11,
      shipping: 0,
      features: ['feature1'],
      weight: 3,
      sale_price: 111,*/
      availability: 200,
      upc: '0',
    }
    // defaultValues: updateData
    //
  });
  const [type, setType] = useState([]);
  const [tag, setTag] = useState([]);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [description_ar, setDescriptionar] = useState('');
  const [price, setPrice] = useState(1);
  const [to, setTo] = useState('usa');
  const [salePrice, setSaleprice] = useState(0);
  const [buttonlabel, setButtonlabel] = useState("Create Product");
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [merchant, setMerchant] = useState(null);
  const [currency, setCurrency] = useState('usd');

  const alert = useAlert();

  React.useEffect(() => {
    register({ name: 'type' });
    register({ name: 'categories' });
    register({ name: 'image', required: true });
    register({ name: 'description' });
  }, [register]);

  React.useEffect(() => {
    if(updateData && updateData.description_ar) {
      setDescription(updateData.description);
      setDescriptionar(updateData.description_ar);
      setButtonlabel("Update Product");
    }
    if(updateData && updateData.shopIds) {
      console.log(updateData.shopIds);
      return;
      updateData.shopIds.each(i =>
        handleMultiChange(OPTIONS[i+1])
      );
    }
  },[updateData]);

  const handleDescriptionChange = e => {
    const value = e.target.value;
    setValue('description', value);
    setDescription(value);
  };
  const handleDescriptionChangeAr = e => {
    const value = e.target.value;
    setValue('description_ar', value);
    setDescriptionar(value);
  };

  const [getImageUrl] = useMutation(GET_IMAGE_UPLOAD_URL, { context: { clientName: "shopLink" }});

  const [createProductMutation] = useMutation(CREATE_PRODUCT, {
    context: { clientName: "shopLink" },
  });
  const handleMultiChange = ({ value }) => {
    //console.log(value);
    setValue('categories', value);
    setTag(value);
  };

  const handleTypeChange = ({ value }) => {
    console.log(value);
    setValue('type', value);
    setType(value);
  };
  const handleUploader = async files => {
    //console.log(files);
    setFiles(files);
  };

  const arrayToObject = (array,prop) =>
    array.map(t => t[prop]);

  const onSubmit = async data => {
    alert.info("CUSTOM");

    if(!merchant) {
      alert.error("Must select merchant");
      return;
    }

    setLoading(true);


    const newProduct = {
      merchantId: merchant.id,
      id: updateData?Number(updateData.id):null,
      url: data.url,
      sku: data.sku,
      name: data.name,
      name_ar: data.name_ar,
      brand: data.brand,
      brand_ar: data.brand_ar,
      //shopIds: arrayToObject(tag,'id'),
      description: description,
      description_ar: description_ar,
      features: data.features,
      features_ar: data.features_ar,
      image: data.image && data.image.length !== 0 ? data.image : '',
      upc: data.upc,
      cost: data.cost,
      weight: data.weight,
      availability: data.availability,
      price: Number(data.price),
      unit: data.unit,
      salePrice: Number(data.salePrice),
      //discountInPercent: Number(data.discountInPercent),
      quantity: Number(data.quantity),
      dial: data.dial,
      //browseNode: arrayToObject(type,'value')[0],
      //slug: data.name,
      //creation_date: new Date(),
    };
    if (!data.image && !files.length ) {
      alert.error("image is required");
      setLoading(false);
      return;
    }
    if(files.length > 0)
      newProduct.image = await handleUpload();
    //setValue('image', "https://cdn.badals.com/"+files[0].path);

    console.log(newProduct);

    const {
      data: {createProduct}
    }:  any = await
      createProductMutation({
      variables: { product: newProduct, isSaveES: false, currentMerchantId: merchant.id },
    });

    console.log(createProduct);
    closeDrawer();
    setLoading(false);
    alert.success("Product saved successfully");
    alert.success("https://www.badals.com/product/"+createProduct.ref)
  };

  const handleUpload = async () => {
    if(!merchant)
      return alert.error("Please select merchant first");
    const [pendingImage] = files;
    //console.log(pendingImage);
    const filename = pendingImage.path;
    const { data: { getAdminImageUploadUrl },}: any = await getImageUrl({variables: {filename: filename, merchant: merchant.name, contentType: pendingImage.type}});

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", pendingImage.type);

    await fetch(getAdminImageUploadUrl.uploadUrl, {
      method: 'put',
      headers: myHeaders,
      body: pendingImage,
      redirect: 'follow'
    }).then(function(data) {
      console.log(data);
    }).catch(function(err){
      console.log(err);
    });
    return getAdminImageUploadUrl.imageUrl;
    ///console.log(res);
    //return { fields: {}, meta: { fileUrl: "https://badal-assets.s3-eu-west-1.amazonaws.com/"+name }, url: getImageUploadUrl.value }
  }

  function calculatePrice(e) {
    e.preventDefault();
    if(!watch('weight'))
      return alert.error("Enter weight first");
    if(!watch('cost'))
      return alert.error("Enter cost first");
    if(!watch('shipping'))
      return alert.error("Enter shipping first");

    let cost = watch('cost');
    let shipping = watch('shipping');
    let weight = watch('weight');
    alert.success(weight);
    const conversion = {'aed': .105,'usd': .386,'gbp': .55,'omr': 1};

    let priceInOmr = (Number(cost) + Number(shipping) + Number(weight))* conversion[currency] * 1.07;
    alert.success(priceInOmr);
    switch(to) {
      case 'uk':
        priceInOmr += Number(weight)*6 + 3;
        break;
      case 'usa':
        //setCurrency('usd');
        let weightInLbs = Number(weight) * 2.2;
        let weightMult = 5;
        if(weightInLbs > 20)
          weightMult = 4;

        priceInOmr *= 1.05; // Add customs
        priceInOmr += weightInLbs*weightMult*conversion['usd'] + 2;
        break;
      case 'oman':
        priceInOmr += 5;
        if(priceInOmr > 300)
          priceInOmr += 15;
        //setCurrency('USD');
        break;
      case 'uae':
        priceInOmr += Number(weight) + 3;
        break;
    }


    setValue('salePrice', Math.round(10*priceInOmr) / 10.0 );
    return false;
  }

  const handleTo = (event) => {
    setTo(event.target.value);
    switch(to) {
      case 'uk':
        setCurrency('gbp');
        break;
      case 'usa':
        setCurrency('usd');
        break;
      case 'oman':
        setCurrency('omr');
        break;
      case 'uae':
        setCurrency('aed');
        break;
    }
  };
  const handleCurrency = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Product</DrawerTitle>
        <button onClick = {openDrawer}>Stub Only</button>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <Scrollbars
          autoHide
          renderView={props => (
            <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
          )}
          renderTrackHorizontal={props => (
            <div
              {...props}
              style={{ display: 'none' }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>Upload your Product image here</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: '100%',
                      height: 'auto',
                      padding: '30px',
                      borderRadius: '3px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  },
                }}
              >

                  <Uploader onChange={handleUploader} handleUpload={handleUpload } />


              </DrawerBox>
              <DrawerBox>
                <FormFields>
                  <MerchantLookup setMerchant={setMerchant} selected={merchant}/>
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your Product description and necessary information from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <Row>

                  <Col lg={6}>

                    <FormFields>
                      <FormLabel>Name</FormLabel>
                      <Input
                        inputRef={register({ required: true, maxLength: 100 })}
                        name="name"
                      />
                    </FormFields>

                    <FormFields>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        value={description}
                        onChange={handleDescriptionChange}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Brand</FormLabel>
                      <Input
                        inputRef={register()}
                        name="brand"
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Features - List semicolon(;) separated</FormLabel>
                      <Input
                        inputRef={register()}
                        name="features"
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>URL</FormLabel>
                      <Input
                        inputRef={register()}
                        name="url"
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Speed Dial (Must start with *)</FormLabel>
                      <Input
                        inputRef={register({pattern: /\*.+/ })}
                        name="dial"
                      />
                    </FormFields>
                  </Col>
                  <Col lg={6}>
                    <FormFields>
                      <FormLabel>UPC</FormLabel>
                      <Input
                        type="number"
                        inputRef={register()}
                        name="upc"
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>SKU/ASIN</FormLabel>
                      <Input
                        type="text"
                        inputRef={register({ required: true })}
                        name="sku"
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Product Cost ({currency})</FormLabel>
                      <Input
                        inputRef={register}
                        name="cost"
                        pattern="^\d*(\.\d{0,2})?$"
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Shipping to {to} ({currency})</FormLabel>
                      <Input
                        inputRef={register}
                        name="shipping"
                        pattern="^\d*(\.\d{0,2})?$"
                      />
                    </FormFields>

                    <FormFields>
                      <FormLabel>Weight (KG)</FormLabel>
                      <Input
                        inputRef={register()}
                        name="weight"
                        pattern="^\d*(\.\d{0,2})?$"
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Ship To</FormLabel>
                      <Select
                        value={to}
                        onChange={handleTo}
                      >
                        <MenuItem value="oman">Oman</MenuItem>
                        <MenuItem value="usa">USA</MenuItem>
                        <MenuItem value="uae">UAE</MenuItem>
                        <MenuItem value="ukvatfree">UK VAT FREE</MenuItem>
                        <MenuItem value="uk">UK</MenuItem>
                        <MenuItem value="china">China</MenuItem>
                      </Select>
                      <Select
                        value={currency}
                        onChange={handleCurrency}
                      >
                        <MenuItem value="usd">$</MenuItem>
                        <MenuItem value="gbp">GBP</MenuItem>
                        <MenuItem value="aed">AED</MenuItem>
                        <MenuItem value="omr">OMR</MenuItem>
                      </Select>
                    </FormFields>
                    <FormFields>
                      <FormLabel>Price (OMR)</FormLabel><button onClick={calculatePrice}>Calculate</button>
                      <Input
                        inputRef={register({ required: true })}
                        name="salePrice"
                        pattern="^\d*(\.\d{0,2})?$"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Availability (Hours) = {Number(watch('availability'))/8} Days</FormLabel>
                      <Input
                        type="number"
                        inputRef={register({ required: true })}
                        name="availability"
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Quantity</FormLabel>
                      <Input
                        type="number"
                        inputRef={register({ required: true })}
                        name="quantity"
                      />
                    </FormFields>

                  </Col>

                </Row>.

              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            {loading ? <CircularProgress size={24} className={classes.buttonProgress} />:buttonlabel}
          </Button>

        </ButtonGroup>
      </Form>
    </>
  );
};
export default AddProduct;