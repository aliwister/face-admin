import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import uuidv4 from 'uuid/v4';
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
import Select from '../../components/Select/Select';
import { FormFields, FormLabel } from '../../components/FormFields/FormFields';

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import {MERCHANT_PRODUCTS} from "../Products/Products";

const options = [
  { value: 'Fruits & Vegetables', name: 'Fruits & Vegetables', id: '1' },
  { value: 'Meat & Fish', name: 'Meat & Fish', id: '2' },
  { value: 'Purse', name: 'Purse', id: '3' },
  { value: 'Hand bags', name: 'Hand bags', id: '4' },
  { value: 'Shoulder bags', name: 'Shoulder bags', id: '5' },
  { value: 'Wallet', name: 'Wallet', id: '6' },
  { value: 'Laptop bags', name: 'Laptop bags', id: '7' },
  { value: 'Women Dress', name: 'Women Dress', id: '8' },
  { value: 'Outer Wear', name: 'Outer Wear', id: '9' },
  { value: 'Pants', name: 'Pants', id: '10' },
];

const typeOptions = [
  { value: 'grocery', name: 'Grocery', id: '1' },
  { value: 'women-cloths', name: 'Women Cloths', id: '2' },
  { value: 'bags', name: 'Bags', id: '3' },
  { value: 'makeup', name: 'Makeup', id: '4' },
];

const GET_IMAGE_UPLOAD_URL = gql`
  mutation getImageUploadUrl($filename: String) {
    getImageUploadUrl(filename: $filename) {
      uploadUrl
      imageUrl
      status
    }
  }    
`;
export const CREATE_PRODUCT = gql`
  mutation createMerchantProduct($product: AddProductInput!) {
    createMerchantProduct(product: $product) {
      id
      slug
      name
      name_ar
      type
      unit
      price
      salePrice
      description
      description_ar
      features
      features_ar
      sku
      unit
      cost
      discountInPercent
      availability
      image
    }
  }
`;




type Props = any;

const AddProduct: React.FC<Props> = props => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const updateData = useDrawerState('data');
  console.log(updateData);
  const { register, handleSubmit, setValue } = useForm({defaultValues: updateData});
  const [type, setType] = useState([]);
  const [tag, setTag] = useState([]);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [description_ar, setDescriptionar] = useState('');

  React.useEffect(() => {
    register({ name: 'type' });
    register({ name: 'categories' });
    register({ name: 'image', required: true });
    register({ name: 'description' });
  }, [register]);

  React.useEffect(() => {
    if(updateData && updateData.description_ar)
      setDescriptionar(updateData.description_ar);
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

  const [createMerchantProduct] = useMutation(CREATE_PRODUCT, {
    context: { clientName: "shopLink" },
    update(cache, { data: { createMerchantProduct } }) {
      const { products } = cache.readQuery({
        query: MERCHANT_PRODUCTS,
      });

      cache.writeQuery({
        query: MERCHANT_PRODUCTS,
        data: {
          products: {
            __typename: products.__typename,
            items: [createMerchantProduct, ...products.items],
            hasMore: true,
            totalCount: products.items.length + 1,
          },
        },
      });
    },
  });
  const handleMultiChange = ({ value }) => {
    setValue('categories', value);
    setTag(value);
  };

  const handleTypeChange = ({ value }) => {
    setValue('type', value);
    setType(value);
  };
  const handleUploader = async files => {
    console.log(files);
    setFiles(files);
  };
  const onSubmit = async data => {
    const newProduct = {
      id: updateData?Number(updateData.id):null,
      sku: data.sku,
      name: data.name,
      name_ar: data.name_ar,
      brand: data.brand,
      brand_ar: data.brand_ar,
      type: data.type[0].value,
      description: data.description,
      description_ar: data.description_ar,
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
      //slug: data.name,
      //creation_date: new Date(),
    };
    if (!data.image && !files.length ) {
      alert("image is required");
      return;
    }
    if(files.length > 0)
      newProduct.image = await handleUpload();
    //setValue('image', "https://cdn.badals.com/"+files[0].path);

    console.log(newProduct);

    createMerchantProduct({
      variables: { product: newProduct },
    });
    closeDrawer();
  };

  const handleUpload = async () => {
    const [pendingImage] = files;
    console.log(pendingImage);
    const filename = pendingImage.path;
    const { data: { getImageUploadUrl },}: any = await getImageUrl({variables: {filename: filename, contentType: pendingImage.type}});

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", pendingImage.type);

    await fetch(getImageUploadUrl.uploadUrl, {
      method: 'put',
      headers: myHeaders,
      body: pendingImage,
      redirect: 'follow'
    }).then(function(data) {
      console.log(data);
    }).catch(function(err){
      console.log(err);
    });
    return getImageUploadUrl.imageUrl;
    ///console.log(res);
    //return { fields: {}, meta: { fileUrl: "https://badal-assets.s3-eu-west-1.amazonaws.com/"+name }, url: getImageUploadUrl.value }
  }

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Product</DrawerTitle>
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
                        inputRef={register({ required: true, maxLength: 20 })}
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
                        inputRef={register({ required: true, maxLength: 20 })}
                        name="brand"
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Features - List semicolon(;) separated</FormLabel>
                      <Input
                        inputRef={register({ required: true, maxLength: 800 })}
                        name="features"
                      />
                    </FormFields>
                  </Col>
                  <Col lg={6}>
                    <FormFields>
                      <FormLabel>Name(AR)</FormLabel>
                      <Input
                        inputRef={register({ required: true, maxLength: 20 })}
                        name="name_ar"
                      />
                    </FormFields>

                    <FormFields>
                      <FormLabel>Description(AR)</FormLabel>
                      <Textarea
                        value={description_ar}
                        onChange={handleDescriptionChangeAr}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Brand(AR)</FormLabel>
                      <Input
                        inputRef={register({ required: true, maxLength: 20 })}
                        name="brand_ar"
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Features(ar) - List semicolon(;) separated</FormLabel>
                      <Input
                        inputRef={register({ required: true, maxLength: 800 })}
                        name="features_ar"
                      />
                    </FormFields>
                  </Col>

                </Row>.
                <FormFields>
                  <FormLabel>UPC</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="upc"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>SKU</FormLabel>
                  <Input
                    type="text"
                    inputRef={register({ required: true })}
                    name="sku"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Unit</FormLabel>
                  <Input type="text" inputRef={register} name="unit" />
                </FormFields>

                <FormFields>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="price"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Sale Price</FormLabel>
                  <Input type="number" inputRef={register} name="salePrice" />
                </FormFields>

                <FormFields>
                  <FormLabel>Discount In Percent</FormLabel>
                  <Input
                    type="number"
                    inputRef={register}
                    name="discountInPercent"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Product Quantity</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="quantity"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Availability</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="availability"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Cost</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="cost"
                    step=".01"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Product Weight</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="weight"
                    step=".01"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Type</FormLabel>
                  <Select
                    options={typeOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Type"
                    value={type}
                    searchable={false}
                    onChange={handleTypeChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      OptionContent: {
                        style: ({ $theme, $selected }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $selected
                              ? $theme.colors.textDark
                              : $theme.colors.textNormal,
                          };
                        },
                      },
                      SingleValue: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Tag"
                    value={tag}
                    onChange={handleMultiChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                    multi
                  />
                </FormFields>
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
            Create Product
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddProduct;
