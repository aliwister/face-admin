import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Scrollbars } from 'react-custom-scrollbars';
import {useDrawerDispatch, useDrawerState} from '../../context/DrawerContext';
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
import {MerchantProductsDocument, useCreateStubMutation} from "../../codegen/generated/_graphql";
import {MerchantLookup} from "../../components/Merchant/MerchantsLookup";
import {watch} from "fs";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AlertDialog from "./components/AlertDialog";


const GET_IMAGE_UPLOAD_URL = gql`
  mutation getAdminImageUploadUrl($filename: String, $merchant: String) {
    getAdminImageUploadUrl(filename: $filename, merchant: $merchant) {
      uploadUrl
      imageUrl
      status
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

const CreateStub: React.FC<Props> = props => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const updateData = useDrawerState('data');
  //console.log(updateData);
  const { watch, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      availability: 200,
      upc: '0',
    }
  });

  const [files, setFiles] = useState([]);
  const [producturl, setProducturl] = useState("");
  const [open, setOpen] = useState(false);

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


  const [getImageUrl] = useMutation(GET_IMAGE_UPLOAD_URL, { context: { clientName: "shopLink" }});
  const [createStubMutation] = useCreateStubMutation({
    context: { clientName: "shopLink" },
  });

  const handleUploader = async files => {
    //console.log(files);
    setFiles(files);
  };

  const arrayToObject = (array,prop) =>
    array.map(t => t[prop]);

  const onSubmit = async data => {
    alert.info("STUB");

    console.log(data);
    console.log(merchant);

    if(!merchant) {
      alert.error("Must select merchant");
      return;
    }

    setLoading(true);


    const newProduct = {
      merchantId: merchant.id,
      id: updateData?Number(updateData.id):null,
      image: data.image && data.image.length !== 0 ? data.image : '',
      availability: data.availability,
      price: Number(data.price),
      salePrice: Number(data.salePrice),
      quantity: Number(data.quantity),
      sku: data.sku,
      url: data.url,
      name: data.name,
      upc: data.upc,
      name_ar: null,
      brand: null,
      brand_ar: null,
      description: null,
      description_ar: null,
      features: null,
      features_ar: null,
      cost: null,
      weight: null,
      shopIds: null,
      browseNode: null,
      browseNode_ar: null,
      slug: null,
      type: null,
      unit: null,
      ref: null,
      discountInPercent: null,
      dial: null
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
      data: {createStub}
    }:  any = await
      createStubMutation({
      variables: { product: newProduct, isSaveES: true, currentMerchantId: merchant.id },
    });

    console.log(createStub);
    //closeDrawer();
    setLoading(false);
    alert.success("Product saved successfully");
    alert.success("https://www.badals.com/product/"+createStub.ref)
    setProducturl("https://www.badals.com/product/"+createStub.ref);
    setOpen(true);
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




  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Product</DrawerTitle>
      </DrawerTitleWrapper>
      <AlertDialog open={open} setOpen={setOpen} text={producturl}/>
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
                      <FormLabel>URL</FormLabel>
                      <Input
                        inputRef={register()}
                        name="url"
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Brand</FormLabel>
                      <Input
                        inputRef={register()}
                        name="brand"
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

export default CreateStub;
