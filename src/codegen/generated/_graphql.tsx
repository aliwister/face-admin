import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Long type */
  Long: any;
  LocalDate: any;
  /** Built-in java.math.BigDecimal */
  BigDecimal: any;
  LocalDateTime: any;
  Date: any;
};

export type Action = {
   __typename?: 'Action';
  id: Maybe<Scalars['Long']>;
  action: Maybe<Scalars['String']>;
  object: Maybe<Scalars['String']>;
  objectId: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
  comment: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['Date']>;
  createdBy: Maybe<Scalars['String']>;
};

export type AddProductInput = {
  id: Maybe<Scalars['Long']>;
  sku: Maybe<Scalars['String']>;
  upc: Maybe<Scalars['String']>;
  price: Maybe<Scalars['BigDecimal']>;
  image: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  name_ar: Maybe<Scalars['String']>;
  brand: Maybe<Scalars['String']>;
  brand_ar: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  description_ar: Maybe<Scalars['String']>;
  features: Maybe<Scalars['String']>;
  features_ar: Maybe<Scalars['String']>;
  cost: Maybe<Scalars['BigDecimal']>;
  weight: Maybe<Scalars['BigDecimal']>;
  shopIds: Maybe<Array<Maybe<Scalars['Long']>>>;
  browseNode: Maybe<Scalars['String']>;
  browseNode_ar: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  unit: Maybe<Scalars['String']>;
  availability: Maybe<Scalars['Int']>;
  salePrice: Maybe<Scalars['BigDecimal']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  ref: Maybe<Scalars['String']>;
  discountInPercent: Maybe<Scalars['Int']>;
  merchantId: Maybe<Scalars['Int']>;
  url: Maybe<Scalars['String']>;
  dial: Maybe<Scalars['String']>;
};

export type Address = {
   __typename?: 'Address';
  id: Maybe<Scalars['ID']>;
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  line1: Maybe<Scalars['String']>;
  line2: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  mobile: Maybe<Scalars['String']>;
  alias: Maybe<Scalars['String']>;
  lng: Maybe<Scalars['String']>;
  lat: Maybe<Scalars['String']>;
  plusCode: Maybe<Scalars['String']>;
  country: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
};

export type AddressInput = {
  id: Maybe<Scalars['ID']>;
  line1: Maybe<Scalars['String']>;
  line2: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  country: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
  mobile: Maybe<Scalars['String']>;
  alias: Maybe<Scalars['String']>;
  lng: Maybe<Scalars['String']>;
  lat: Maybe<Scalars['String']>;
  plusCode: Maybe<Scalars['String']>;
};

export type AddressList = {
   __typename?: 'AddressList';
  addresses: Maybe<Array<Maybe<Address>>>;
  displayFormat: Maybe<Scalars['String']>;
};

export type AddressPojo = {
  id: Maybe<Scalars['ID']>;
  line1: Maybe<Scalars['String']>;
  line2: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  mobile: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  alias: Maybe<Scalars['String']>;
  country: Maybe<Scalars['String']>;
  lng: Maybe<Scalars['String']>;
  lat: Maybe<Scalars['String']>;
  plusCode: Maybe<Scalars['String']>;
};

export type AddressResponse = {
   __typename?: 'AddressResponse';
  address: Maybe<Address>;
  success: Maybe<Scalars['Boolean']>;
  message: Maybe<Scalars['String']>;
  code: Maybe<Scalars['String']>;
};

export enum AssetType {
  Logo = 'LOGO',
  Product = 'PRODUCT',
  Slider = 'SLIDER',
  Hashtag = 'HASHTAG',
  Brand = 'BRAND'
}

/**
 * enum Currency {
 *     OMR
 *     AED
 *     SAR
 *     KWD
 *     BHD
 *     QAR
 *     USD
 *     EUR
 * }
 */
export type Attribute = {
   __typename?: 'Attribute';
  name: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};

export type AttributeI18n = {
   __typename?: 'AttributeI18n';
  attributeList: Maybe<Array<Maybe<Attribute>>>;
  lang: Maybe<Scalars['String']>;
};

export type AttributeI18nInput = {
  attributeList: Maybe<Array<Maybe<AttributeInput>>>;
  lang: Maybe<Scalars['String']>;
};

export type AttributeInput = {
  name: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};


export type Cart = {
   __typename?: 'Cart';
  id: Scalars['ID'];
  secureKey: Maybe<Scalars['String']>;
  gift: Maybe<Scalars['Boolean']>;
  giftMessage: Maybe<Scalars['String']>;
  /** customer: Customer, */
  cartItems: Maybe<Array<Maybe<CartItem>>>;
  currency: Maybe<Scalars['String']>;
};

export type CartItem = {
   __typename?: 'CartItem';
  id: Maybe<Scalars['ID']>;
  productId: Maybe<Scalars['Long']>;
  quantity: Maybe<Scalars['Int']>;
  image: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  price: Maybe<Scalars['String']>;
  salePrice: Maybe<Scalars['String']>;
  listPrice: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  api: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  unit: Maybe<Scalars['String']>;
};

export type CartItemInput = {
  productId: Maybe<Scalars['Long']>;
  quantity: Maybe<Scalars['Int']>;
};

export type CartResponse = {
   __typename?: 'CartResponse';
  cart: Maybe<Cart>;
  success: Maybe<Scalars['Boolean']>;
  message: Maybe<Scalars['String']>;
};

export type Category = {
   __typename?: 'Category';
  id: Scalars['Int'];
  title: Scalars['String'];
  children: Array<Category>;
  /** type: String! */
  icon: Scalars['String'];
  slug: Scalars['String'];
};

export type Checkout = {
   __typename?: 'Checkout';
  id: Scalars['ID'];
  ref: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  secureKey: Maybe<Scalars['String']>;
  carrier: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<LineItem>>>;
  orderAdjustments: Maybe<Array<Maybe<OrderAdjustment>>>;
};

export type CheckoutInput = {
  id: Maybe<Scalars['ID']>;
  ref: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  secureKey: Maybe<Scalars['String']>;
  addresses: Maybe<Array<Maybe<AddressPojo>>>;
  carrier: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<LineItemInput>>>;
  allowPickup: Maybe<Scalars['Boolean']>;
  orderAdjustments: Maybe<Array<Maybe<OrderAdjustmentInput>>>;
};

export type CheckoutSession = {
   __typename?: 'CheckoutSession';
  redirectUrl: Maybe<Scalars['String']>;
  secureKey: Maybe<Scalars['String']>;
};

export type ChildProduct = {
   __typename?: 'ChildProduct';
  id: Maybe<Scalars['ID']>;
  slug: Maybe<Scalars['String']>;
  /** Must be Unique */
  image: Maybe<Scalars['String']>;
  /** Main image */
  sku: Maybe<Scalars['String']>;
  upc: Maybe<Scalars['String']>;
  isDirty: Maybe<Scalars['Boolean']>;
  /** Always false on the type */
  listPrice: Maybe<PriceList>;
  /** null For Parent */
  price: Maybe<PriceList>;
  /** null For Parent */
  cost: Maybe<Price>;
  /** null For Parent */
  weight: Maybe<Scalars['BigDecimal']>;
  availability: Maybe<Scalars['Int']>;
  /** In hours */
  quantity: Maybe<Scalars['BigDecimal']>;
  gallery: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Ordered */
  variationAttributes: Maybe<Array<Maybe<Attribute>>>;
  attributes: Maybe<Array<Maybe<AttributeI18n>>>;
  active: Maybe<Scalars['Boolean']>;
};

export type ChildProductInput = {
  id: Maybe<Scalars['ID']>;
  slug: Maybe<Scalars['String']>;
  /** Must be Unique */
  image: Maybe<Scalars['String']>;
  /** Main image */
  sku: Scalars['String'];
  upc: Maybe<Scalars['String']>;
  isDirty: Maybe<Scalars['Boolean']>;
  /** For new product doesn't matter */
  price: Maybe<PriceListInput>;
  listPrice: Maybe<PriceListInput>;
  cost: Maybe<PriceInput>;
  weight: Maybe<Scalars['BigDecimal']>;
  availability: Maybe<Scalars['Int']>;
  /** In hours */
  quantity: Maybe<Scalars['BigDecimal']>;
  discountInPercent: Maybe<Scalars['Int']>;
  gallery: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Ordered */
  variationAttributes: Maybe<Array<Maybe<AttributeInput>>>;
  attributes: Maybe<Array<Maybe<AttributeI18nInput>>>;
  active: Maybe<Scalars['Boolean']>;
};

export enum Condition {
  New = 'NEW',
  LikeNew = 'LIKE_NEW',
  VeryGood = 'VERY_GOOD',
  Good = 'GOOD',
  Fair = 'FAIR'
}

export type Currency = {
   __typename?: 'Currency';
  code: Maybe<Scalars['String']>;
};

export type Customer = {
   __typename?: 'Customer';
  id: Scalars['ID'];
  firstname: Maybe<Scalars['String']>;
  lastname: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  mobile: Maybe<Scalars['String']>;
  totalPoints: Maybe<Scalars['Long']>;
  spentPoints: Maybe<Scalars['Long']>;
  addresses: Maybe<Array<Maybe<Address>>>;
  allowPickup: Maybe<Scalars['Boolean']>;
  plusDiscount: Maybe<Scalars['Int']>;
  shipperMarkup: Maybe<Scalars['Int']>;
};


export type Gallery = {
   __typename?: 'Gallery';
  url: Scalars['String'];
};

export type Hashtag = {
   __typename?: 'Hashtag';
  id: Maybe<Scalars['ID']>;
  en: Maybe<Scalars['String']>;
  ar: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  position: Maybe<Scalars['Int']>;
  products: Maybe<ProductResponse>;
};

export type HashtagInput = {
  id: Maybe<Scalars['ID']>;
  en: Maybe<Scalars['String']>;
  ar: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  position: Maybe<Scalars['Int']>;
};

export type HashtagResponse = {
   __typename?: 'HashtagResponse';
  items: Array<Hashtag>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type I18String = {
   __typename?: 'I18String';
  lang: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};

export type I18StringInput = {
  lang: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};

export type Inventory = {
   __typename?: 'Inventory';
  productId: Maybe<Scalars['Long']>;
  title: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  received: Maybe<Scalars['BigDecimal']>;
  issued: Maybe<Scalars['BigDecimal']>;
  quantityOnHand: Maybe<Scalars['BigDecimal']>;
  image: Maybe<Scalars['String']>;
};

export type Item = {
   __typename?: 'Item';
  image: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Long']>;
};

export type ItemIssuance = {
   __typename?: 'ItemIssuance';
  id: Maybe<Scalars['ID']>;
  shipmentId: Maybe<Scalars['Long']>;
};

export type ItemTracking = {
   __typename?: 'ItemTracking';
  id: Maybe<Scalars['ID']>;
  pid: Maybe<Scalars['Int']>;
  productId: Maybe<Scalars['String']>;
  price: Maybe<Scalars['BigDecimal']>;
  description: Maybe<Scalars['String']>;
  image: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  reference: Maybe<Scalars['String']>;
  po: Maybe<Scalars['String']>;
  orderDate: Maybe<Scalars['String']>;
  invoiceDate: Maybe<Scalars['String']>;
  purchaseDate: Maybe<Scalars['String']>;
  merchant: Maybe<Scalars['String']>;
  merchantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  purchaseShipments: Maybe<Array<Maybe<ShipmentInfo>>>;
  transitShipments: Maybe<Array<Maybe<ShipmentInfo>>>;
  customerShipments: Maybe<Array<Maybe<ShipmentInfo>>>;
  delivered: Maybe<Scalars['String']>;
};

export type LineItem = {
   __typename?: 'LineItem';
  productId: Maybe<Scalars['Long']>;
  sku: Maybe<Scalars['String']>;
  image: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Float']>;
  price: Maybe<Scalars['Float']>;
  cost: Maybe<Scalars['Float']>;
  subTotal: Maybe<Scalars['Float']>;
  url: Maybe<Scalars['String']>;
  ref: Maybe<Scalars['String']>;
};

export type LineItemInput = {
  productId: Maybe<Scalars['Long']>;
  sku: Maybe<Scalars['String']>;
  image: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Float']>;
  price: Maybe<Scalars['Float']>;
  cost: Maybe<Scalars['Float']>;
  subTotal: Maybe<Scalars['Float']>;
  url: Maybe<Scalars['String']>;
  ref: Maybe<Scalars['String']>;
  weight: Maybe<Scalars['Float']>;
};




export type Merchant = {
   __typename?: 'Merchant';
  id: Maybe<Scalars['ID']>;
  name: Maybe<Scalars['String']>;
};

export type MerchantProduct = {
   __typename?: 'MerchantProduct';
  id: Maybe<Scalars['ID']>;
  sku: Maybe<Scalars['String']>;
  upc: Maybe<Scalars['String']>;
  ref: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  price: Maybe<Scalars['BigDecimal']>;
  image: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  name_ar: Maybe<Scalars['String']>;
  brand: Maybe<Scalars['String']>;
  brand_ar: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  description_ar: Maybe<Scalars['String']>;
  features: Maybe<Scalars['String']>;
  features_ar: Maybe<Scalars['String']>;
  cost: Maybe<Scalars['BigDecimal']>;
  weight: Maybe<Scalars['BigDecimal']>;
  type: Maybe<Scalars['String']>;
  unit: Maybe<Scalars['String']>;
  availability: Maybe<Scalars['Int']>;
  salePrice: Maybe<Scalars['BigDecimal']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  discountInPercent: Maybe<Scalars['Int']>;
  shopIds: Maybe<Array<Maybe<Scalars['Long']>>>;
  gallery: Maybe<Array<Maybe<Scalars['String']>>>;
  browseNode: Maybe<Scalars['String']>;
  browseNode_ar: Maybe<Scalars['String']>;
  active: Maybe<Scalars['Boolean']>;
};

export type Message = {
   __typename?: 'Message';
  value: Maybe<Scalars['String']>;
};

export type Meta = {
   __typename?: 'Meta';
  publisher: Scalars['String'];
  isbn: Scalars['String'];
  edition: Scalars['String'];
  country: Scalars['String'];
  languages: Array<Scalars['String']>;
  numberOfReader: Scalars['String'];
  numberOfPage: Scalars['String'];
  samplePDF: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  /**
   * acceptItem(shipmentId: Long,  pkgId: Long,  purchaseItemId: Long,  productId:
   * Long,  merchantId: Long,  description: String,  quantity: BigDecimal, 
   * accepted: BigDecimal,  rejected: BigDecimal): Message
   */
  acceptItem: Maybe<Message>;
  acceptPackage: Maybe<Pkg>;
  acceptShipment: Maybe<Shipment>;
  addDiscount: Maybe<Message>;
  addItem: Maybe<Message>;
  addPayment: Maybe<Payment>;
  addShipmentDoc: Maybe<Message>;
  addToElastic: Maybe<Message>;
  addToPricingQ: Maybe<Message>;
  addTrackingEvent: Maybe<Message>;
  assignRole: Maybe<Message>;
  cancelOrder: Maybe<Order>;
  cancelPurchase: Maybe<Purchase>;
  closeOrder: Maybe<Order>;
  closePurchase: Maybe<Purchase>;
  completePricingRequest: Maybe<Message>;
  completePricingRequestAndEmail: Maybe<Message>;
  completeUpload: Maybe<Message>;
  createHashtag: Maybe<Message>;
  createMerchantProduct: Maybe<Message>;
  createOrder: Maybe<Order>;
  createOverride: Maybe<Product>;
  createPlusCart: Maybe<Checkout>;
  createPosOrder: Maybe<Order>;
  createProduct: Maybe<MerchantProduct>;
  createPurchase: Maybe<Purchase>;
  /**
   * processAmazonShipments: Message
   * printCode(shipmentId: Long): Message
   * savePackage(pkgId: Long, shipmentItems: [Long]): Pkg
   * scheduleShipment(id: Long, deliveryDate: LocalDate, comments: String, assignTo: String): Message
   * unAccept(shipmentAcceptanceId: Long): Message
   * unIssue(itemIssuanceId: Long) : Message
   */
  createShipment: Maybe<Shipment>;
  createStub: Maybe<MerchantProduct>;
  createStubFromSearch: Maybe<Product>;
  createTenant: Maybe<Message>;
  createTenantCheckout: Maybe<CheckoutSession>;
  deleteAddress: Maybe<AddressResponse>;
  deleteProduct: Maybe<Message>;
  deleteTenantTag: Maybe<Message>;
  discountOrder: Maybe<Order>;
  editOrder: Maybe<Order>;
  getAdminFile: Maybe<PresignedUrl>;
  getAdminImageUploadUrl: Maybe<PresignedUrl>;
  getImageUploadUrl: Maybe<PresignedUrl>;
  getPartnerImageUploadUrl: Maybe<PresignedUrl>;
  getUploadUrl: Maybe<PresignedUrl>;
  /** getUploadUrl(filename: String, contentType: String): PresignedUrl */
  importProducts: Maybe<Message>;
  issueItem: Maybe<ItemIssuance>;
  pasLookup: Maybe<Product>;
  prepItem: Maybe<Message>;
  processCheckoutRefund: Maybe<Message>;
  publishProduct: Maybe<Message>;
  refundPayment: Maybe<Payment>;
  removeItem: Maybe<Message>;
  resetPassword: Maybe<Scalars['String']>;
  saveAddress: Maybe<AddressResponse>;
  savePartnerProduct: Maybe<ProductEnvelope>;
  saveShipment: Maybe<Shipment>;
  saveTenantTag: Maybe<TenantTag>;
  sendOrderLevelEmail: Maybe<Message>;
  sendPaymentSms: Maybe<Message>;
  sendProductLevelEmail: Maybe<Message>;
  sendToDetrack: Maybe<Message>;
  setAccountingCode: Maybe<Message>;
  setEstimatedShipDate: Maybe<Message>;
  setHashtags: Maybe<Message>;
  setOrderState: Maybe<Order>;
  setProcessedDate: Maybe<Message>;
  setPurchaseState: Maybe<Purchase>;
  setSettlementDate: Maybe<Message>;
  setShipmentStatus: Maybe<Message>;
  setSliderList: Maybe<Message>;
  setSocialProfile: Maybe<Message>;
  unpackItem: Maybe<Message>;
  unpublishProduct: Maybe<Message>;
  updateFromDetrack: Maybe<Message>;
  updatePurchase: Maybe<Purchase>;
  updateTenantCart: Maybe<CartResponse>;
  voidOrder: Maybe<Message>;
  voidPayment: Maybe<Message>;
};


export type MutationAcceptItemArgs = {
  shipmentItemId: Maybe<Scalars['Long']>;
  packageId: Maybe<Scalars['Long']>;
  accepted: Maybe<Scalars['BigDecimal']>;
  rejected: Maybe<Scalars['BigDecimal']>;
};


export type MutationAcceptPackageArgs = {
  pkg: Maybe<PackageInput>;
};


export type MutationAcceptShipmentArgs = {
  trackingNum: Maybe<Scalars['String']>;
  payment: Maybe<PaymentInput>;
  invoiceLink: Maybe<Scalars['String']>;
};


export type MutationAddDiscountArgs = {
  id: Maybe<Scalars['ID']>;
  amount: Maybe<Scalars['BigDecimal']>;
  couponName: Maybe<Scalars['String']>;
};


export type MutationAddItemArgs = {
  shipmentId: Maybe<Scalars['Long']>;
  productId: Maybe<Scalars['Long']>;
  purchaseItemId: Maybe<Scalars['Long']>;
  description: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['BigDecimal']>;
};


export type MutationAddPaymentArgs = {
  id: Maybe<Scalars['ID']>;
  amount: Maybe<Scalars['BigDecimal']>;
  method: Maybe<Scalars['String']>;
  authCode: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
};


export type MutationAddShipmentDocArgs = {
  id: Maybe<Scalars['Long']>;
  filename: Maybe<Scalars['String']>;
};


export type MutationAddToElasticArgs = {
  id: Maybe<Scalars['Long']>;
  sku: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  name_ar: Maybe<Scalars['String']>;
  shops: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationAddToPricingQArgs = {
  sku: Maybe<Scalars['String']>;
};


export type MutationAddTrackingEventArgs = {
  trackingNums: Maybe<Array<Maybe<Scalars['String']>>>;
  shipmentStatus: Maybe<ShipmentStatus>;
  trackingEvent: Maybe<Scalars['Int']>;
  eventDate: Maybe<Scalars['LocalDateTime']>;
  details: Maybe<Scalars['String']>;
};


export type MutationAssignRoleArgs = {
  email: Maybe<Scalars['String']>;
  tenantId: Maybe<Scalars['String']>;
  role: Maybe<Scalars['String']>;
};


export type MutationCancelOrderArgs = {
  id: Maybe<Scalars['ID']>;
  reason: Maybe<Scalars['String']>;
};


export type MutationCancelPurchaseArgs = {
  id: Maybe<Scalars['ID']>;
  reason: Maybe<Scalars['String']>;
};


export type MutationCloseOrderArgs = {
  id: Maybe<Scalars['ID']>;
  reason: Maybe<Scalars['String']>;
};


export type MutationClosePurchaseArgs = {
  id: Maybe<Scalars['ID']>;
  reason: Maybe<Scalars['String']>;
};


export type MutationCompletePricingRequestArgs = {
  id: Maybe<Scalars['Long']>;
};


export type MutationCompletePricingRequestAndEmailArgs = {
  id: Maybe<Scalars['Long']>;
};


export type MutationCompleteUploadArgs = {
  fileHandle: Maybe<Scalars['Long']>;
};


export type MutationCreateHashtagArgs = {
  hashtag: Maybe<HashtagInput>;
};


export type MutationCreateMerchantProductArgs = {
  product: Maybe<AddProductInput>;
};


export type MutationCreateOrderArgs = {
  id: Maybe<Scalars['Int']>;
};


export type MutationCreateOverrideArgs = {
  sku: Maybe<Scalars['String']>;
  type: Maybe<OverrideType>;
  override: Maybe<Scalars['String']>;
  active: Maybe<Scalars['Boolean']>;
  lazy: Maybe<Scalars['Boolean']>;
  merchantId: Maybe<Scalars['Int']>;
  submitOnly: Maybe<Scalars['Int']>;
  dial: Maybe<Scalars['String']>;
};


export type MutationCreatePlusCartArgs = {
  secureKey: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<LineItemInput>>>;
};


export type MutationCreatePosOrderArgs = {
  cart: Maybe<CheckoutInput>;
  paymentMethod: Maybe<Scalars['String']>;
  paymentAmount: Maybe<Scalars['String']>;
  ref: Maybe<Scalars['String']>;
};


export type MutationCreateProductArgs = {
  product: Maybe<AddProductInput>;
  isSaveES: Maybe<Scalars['Boolean']>;
  currentMerchantId: Maybe<Scalars['Long']>;
};


export type MutationCreatePurchaseArgs = {
  dto: Maybe<PurchaseInput>;
};


export type MutationCreateShipmentArgs = {
  shipment: Maybe<ShipmentInput>;
  shipmentItems: Maybe<Array<Maybe<ShipmentItemInput>>>;
  trackingNums?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationCreateStubArgs = {
  product: Maybe<AddProductInput>;
  isSaveES: Maybe<Scalars['Boolean']>;
  currentMerchantId: Maybe<Scalars['Long']>;
};


export type MutationCreateStubFromSearchArgs = {
  dto: Maybe<ProductInput>;
};


export type MutationCreateTenantArgs = {
  tenantId: Maybe<Scalars['String']>;
};


export type MutationCreateTenantCheckoutArgs = {
  secureKey: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<CartItemInput>>>;
};


export type MutationDeleteAddressArgs = {
  id: Maybe<Scalars['ID']>;
};


export type MutationDeleteProductArgs = {
  id: Maybe<Scalars['Long']>;
};


export type MutationDeleteTenantTagArgs = {
  id: Maybe<Scalars['Long']>;
};


export type MutationDiscountOrderArgs = {
  id: Maybe<Scalars['ID']>;
};


export type MutationEditOrderArgs = {
  id: Maybe<Scalars['ID']>;
  orderItems: Maybe<Array<Maybe<OrderItemInput>>>;
  reason: Maybe<Scalars['String']>;
};


export type MutationGetAdminFileArgs = {
  filename: Maybe<Scalars['String']>;
  contentType: Maybe<Scalars['String']>;
};


export type MutationGetAdminImageUploadUrlArgs = {
  filename: Maybe<Scalars['String']>;
  merchant: Maybe<Scalars['String']>;
  contentType: Maybe<Scalars['String']>;
};


export type MutationGetImageUploadUrlArgs = {
  filename: Maybe<Scalars['String']>;
  contentType: Maybe<Scalars['String']>;
};


export type MutationGetPartnerImageUploadUrlArgs = {
  filename: Maybe<Scalars['String']>;
  contentType: Maybe<Scalars['String']>;
  assetType: Maybe<AssetType>;
};


export type MutationGetUploadUrlArgs = {
  filename: Maybe<Scalars['String']>;
  contentType: Maybe<Scalars['String']>;
};


export type MutationImportProductsArgs = {
  products: Maybe<Array<Maybe<AddProductInput>>>;
  shopIds: Maybe<Array<Maybe<Scalars['Long']>>>;
  browseNode: Maybe<Scalars['String']>;
};


export type MutationIssueItemArgs = {
  orderItemId: Maybe<Scalars['Long']>;
  productId: Maybe<Scalars['Long']>;
  description: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['BigDecimal']>;
};


export type MutationPasLookupArgs = {
  sku: Maybe<Scalars['String']>;
};


export type MutationPrepItemArgs = {
  dto: Maybe<PackagingContentInput>;
};


export type MutationProcessCheckoutRefundArgs = {
  token: Maybe<Scalars['String']>;
  amount: Maybe<Scalars['String']>;
  ref: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
};


export type MutationPublishProductArgs = {
  id: Maybe<Scalars['Long']>;
};


export type MutationRefundPaymentArgs = {
  id: Maybe<Scalars['ID']>;
  amount: Maybe<Scalars['BigDecimal']>;
  authCode: Maybe<Scalars['String']>;
  bankName: Maybe<Scalars['String']>;
  bankAccountNumber: Maybe<Scalars['String']>;
  bankOwnerName: Maybe<Scalars['String']>;
  ref: Maybe<Scalars['Long']>;
  paymentMethod: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
};


export type MutationRemoveItemArgs = {
  shipmentId: Maybe<Scalars['ID']>;
  shipmentItemId: Maybe<Scalars['Long']>;
  description: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['BigDecimal']>;
};


export type MutationResetPasswordArgs = {
  email: Maybe<Scalars['String']>;
};


export type MutationSaveAddressArgs = {
  address: Maybe<AddressInput>;
};


export type MutationSavePartnerProductArgs = {
  product: Maybe<PartnerProductInput>;
};


export type MutationSaveShipmentArgs = {
  shipment: Maybe<ShipmentInput>;
};


export type MutationSaveTenantTagArgs = {
  hashtag: Maybe<TenantTagInput>;
};


export type MutationSendOrderLevelEmailArgs = {
  id: Maybe<Scalars['ID']>;
  template: Maybe<Scalars['String']>;
};


export type MutationSendPaymentSmsArgs = {
  id: Maybe<Scalars['ID']>;
  mobile: Maybe<Scalars['String']>;
};


export type MutationSendProductLevelEmailArgs = {
  orderId: Maybe<Scalars['ID']>;
  orderItems: Maybe<Array<Maybe<Scalars['Long']>>>;
  template: Maybe<Scalars['String']>;
};


export type MutationSendToDetrackArgs = {
  shipmentId: Maybe<Scalars['Long']>;
  orderId: Maybe<Scalars['Long']>;
  name: Maybe<Scalars['String']>;
  instructions: Maybe<Scalars['String']>;
  date: Maybe<Scalars['String']>;
  time: Maybe<Scalars['String']>;
  assignTo: Maybe<Scalars['String']>;
};


export type MutationSetAccountingCodeArgs = {
  paymentIds: Maybe<Array<Maybe<Scalars['Long']>>>;
  code: Maybe<Scalars['String']>;
};


export type MutationSetEstimatedShipDateArgs = {
  id: Maybe<Scalars['Long']>;
  date: Maybe<Scalars['Date']>;
};


export type MutationSetHashtagsArgs = {
  hashtags: Maybe<Array<Maybe<Scalars['String']>>>;
  ref: Maybe<Scalars['Long']>;
};


export type MutationSetOrderStateArgs = {
  id: Maybe<Scalars['ID']>;
  state: Maybe<OrderState>;
};


export type MutationSetProcessedDateArgs = {
  paymentIds: Maybe<Array<Maybe<Scalars['Long']>>>;
  date: Maybe<Scalars['Date']>;
};


export type MutationSetPurchaseStateArgs = {
  id: Maybe<Scalars['ID']>;
  state: Maybe<OrderState>;
};


export type MutationSetSettlementDateArgs = {
  paymentIds: Maybe<Array<Maybe<Scalars['Long']>>>;
  date: Maybe<Scalars['Date']>;
};


export type MutationSetShipmentStatusArgs = {
  id: Maybe<Scalars['Long']>;
  status: Maybe<ShipmentStatus>;
};


export type MutationSetSliderListArgs = {
  locale: Maybe<Scalars['String']>;
  images: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationSetSocialProfileArgs = {
  locale: Maybe<Scalars['String']>;
  profiles: Maybe<Array<Maybe<AttributeInput>>>;
};


export type MutationUnpackItemArgs = {
  shipmentId: Maybe<Scalars['ID']>;
  shipmentItemId: Maybe<Scalars['Long']>;
  description: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['BigDecimal']>;
};


export type MutationUnpublishProductArgs = {
  id: Maybe<Scalars['Long']>;
};


export type MutationUpdateFromDetrackArgs = {
  id: Maybe<Scalars['String']>;
};


export type MutationUpdatePurchaseArgs = {
  dto: Maybe<PurchaseInput>;
  items: Maybe<Array<Maybe<PurchaseItemInput>>>;
};


export type MutationUpdateTenantCartArgs = {
  secureKey: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<CartItemInput>>>;
  isMerge: Maybe<Scalars['Boolean']>;
};


export type MutationVoidOrderArgs = {
  id: Maybe<Scalars['Long']>;
};


export type MutationVoidPaymentArgs = {
  id: Maybe<Scalars['ID']>;
};

export type Order = {
   __typename?: 'Order';
  id: Scalars['ID'];
  reference: Maybe<Scalars['String']>;
  orderState: Maybe<OrderState>;
  invoiceDate: Maybe<Scalars['LocalDate']>;
  deliveryDate: Maybe<Scalars['LocalDate']>;
  customer: Maybe<Customer>;
  cartId: Maybe<Scalars['Long']>;
  currency: Maybe<Scalars['String']>;
  deliveryAddress: Maybe<Address>;
  invoiceAddress: Maybe<Address>;
  items: Maybe<Array<Maybe<OrderItem>>>;
  total: Maybe<Scalars['BigDecimal']>;
  deliveryTotal: Maybe<Scalars['BigDecimal']>;
  discountsTotal: Maybe<Scalars['BigDecimal']>;
  couponName: Maybe<Scalars['String']>;
  subtotal: Maybe<Scalars['BigDecimal']>;
  carrier: Maybe<Scalars['String']>;
  paymentMethod: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['Date']>;
  payments: Maybe<Array<Maybe<Payment>>>;
  balance: Maybe<Scalars['BigDecimal']>;
  cartSecureKey: Maybe<Scalars['String']>;
  channel: Maybe<OrderChannel>;
  email: Maybe<Scalars['String']>;
  orderAdjustments: Maybe<Array<Maybe<OrderAdjustment>>>;
};

export type OrderAdjustment = {
   __typename?: 'OrderAdjustment';
  description: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
  type: Maybe<OrderAdjustmentType>;
  quantity: Maybe<Scalars['Int']>;
};

export type OrderAdjustmentInput = {
  description: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
  type: Maybe<OrderAdjustmentType>;
  quantity: Maybe<Scalars['Int']>;
};

export enum OrderAdjustmentType {
  Discount = 'DISCOUNT',
  Fee = 'FEE',
  Shipping = 'SHIPPING',
  Handling = 'HANDLING',
  Commission = 'COMMISSION'
}

export enum OrderChannel {
  Pos = 'POS',
  Web = 'WEB',
  Facebook = 'FACEBOOK'
}

export type OrderItem = {
   __typename?: 'OrderItem';
  id: Maybe<Scalars['ID']>;
  orderId: Maybe<Scalars['Long']>;
  sequence: Maybe<Scalars['Int']>;
  productName: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  price: Maybe<Scalars['BigDecimal']>;
  comment: Maybe<Scalars['String']>;
  image: Maybe<Scalars['String']>;
  weight: Maybe<Scalars['BigDecimal']>;
  unit: Maybe<Scalars['String']>;
  lineTotal: Maybe<Scalars['BigDecimal']>;
  productUrl: Maybe<Scalars['String']>;
  productSku: Maybe<Scalars['String']>;
  productId: Maybe<Scalars['Long']>;
  productMerchantId: Maybe<Scalars['Long']>;
  po: Maybe<Scalars['Long']>;
};

export type OrderItemInput = {
  id: Maybe<Scalars['ID']>;
  orderId: Maybe<Scalars['Long']>;
  sequence: Maybe<Scalars['Int']>;
  quantity: Maybe<Scalars['Int']>;
  price: Maybe<Scalars['BigDecimal']>;
};

export type OrderResponse = {
   __typename?: 'OrderResponse';
  items: Array<Order>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export enum OrderState {
  AwaitingPayment = 'AWAITING_PAYMENT',
  Draft = 'DRAFT',
  Contacted = 'CONTACTED',
  PaymentAuthorized = 'PAYMENT_AUTHORIZED',
  PaymentAccepted = 'PAYMENT_ACCEPTED',
  InProgress = 'IN_PROGRESS',
  Ready = 'READY',
  PartiallyDelivered = 'PARTIALLY_DELIVERED',
  Delivered = 'DELIVERED',
  Shipped = 'SHIPPED',
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED'
}

export type OrderSummary = {
   __typename?: 'OrderSummary';
  period: Maybe<Scalars['String']>;
  count: Maybe<Scalars['Int']>;
  total: Maybe<Scalars['BigDecimal']>;
};

export type OutstandingQueue = {
   __typename?: 'OutstandingQueue';
  id: Maybe<Scalars['ID']>;
  description: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  allocated: Maybe<Scalars['BigDecimal']>;
  price: Maybe<Scalars['BigDecimal']>;
  weight: Maybe<Scalars['BigDecimal']>;
  image: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  orderId: Maybe<Scalars['Long']>;
  orderItemId: Maybe<Scalars['Long']>;
  productId: Maybe<Scalars['Long']>;
  wait: Maybe<Scalars['Int']>;
};

export enum OverrideType {
  Cost = 'COST',
  Weight = 'WEIGHT',
  Shipping = 'SHIPPING',
  Availability = 'AVAILABILITY',
  Condition = 'CONDITION',
  Price = 'PRICE'
}

export type PackageInput = {
  length: Maybe<Scalars['BigDecimal']>;
  width: Maybe<Scalars['BigDecimal']>;
  height: Maybe<Scalars['BigDecimal']>;
  weight: Maybe<Scalars['BigDecimal']>;
  packageType: Maybe<PackageType>;
  shipmentId: Maybe<Scalars['Long']>;
};

export enum PackageType {
  Badals14X18Bag = 'BADALS14X18BAG',
  Dhlflyer = 'DHLFLYER',
  Dhlflyerbig = 'DHLFLYERBIG',
  Box = 'BOX',
  Tube = 'TUBE',
  Nonstandard = 'NONSTANDARD'
}

export type PackagingContentInput = {
  shipmentItemId: Maybe<Scalars['Long']>;
  pkgId: Maybe<Scalars['Long']>;
  quantity: Maybe<Scalars['BigDecimal']>;
};

export type Partner = {
   __typename?: 'Partner';
  id: Maybe<Scalars['Long']>;
  logo: Maybe<Scalars['String']>;
  mobileLogo: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  maxProducts: Maybe<Scalars['Int']>;
  planName: Maybe<Scalars['String']>;
  discountRate: Maybe<Scalars['Int']>;
  active: Maybe<Scalars['Boolean']>;
  monthlyFee: Maybe<Scalars['BigDecimal']>;
  skuPrefix: Maybe<Scalars['String']>;
  contractStartDate: Maybe<Scalars['LocalDate']>;
  publicPaymentProfile: Maybe<Array<Maybe<PaymentDef>>>;
  tenantId: Maybe<Scalars['String']>;
  subdomain: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  customDomain: Maybe<Scalars['String']>;
};

export type PartnerProduct = {
   __typename?: 'PartnerProduct';
  id: Maybe<Scalars['ID']>;
  /** Auto generated */
  active: Maybe<Scalars['Boolean']>;
  sku: Maybe<Scalars['String']>;
  upc: Maybe<Scalars['String']>;
  model: Maybe<Scalars['String']>;
  hashtags: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Hashtags */
  ref: Maybe<Scalars['String']>;
  /** SIMPLE, CHILD, PARENT */
  slug: Maybe<Scalars['String']>;
  /** Must be Unique */
  brand: Maybe<Scalars['String']>;
  /** The English value */
  title: Maybe<Scalars['String']>;
  /** The English value */
  image: Maybe<Scalars['String']>;
  /** Main image */
  listPrice: Maybe<PriceList>;
  /** null For Parent */
  price: Maybe<PriceList>;
  /** null For Parent */
  cost: Maybe<Price>;
  weight: Maybe<Scalars['BigDecimal']>;
  variationType: Maybe<Scalars['String']>;
  unit: Maybe<Scalars['String']>;
  availability: Maybe<Scalars['Int']>;
  /** In hours */
  quantity: Maybe<Scalars['BigDecimal']>;
  options: Maybe<Array<Maybe<VariationOption>>>;
  langs: Maybe<Array<Maybe<ProductI18n>>>;
  gallery: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Ordered */
  children: Maybe<Array<Maybe<ChildProduct>>>;
  attributes: Maybe<Array<Maybe<AttributeI18n>>>;
  deliveryProfiles: Maybe<Array<Maybe<Attribute>>>;
};

export type PartnerProductInput = {
  id: Maybe<Scalars['ID']>;
  /** Auto generated */
  sku: Scalars['String'];
  upc: Maybe<Scalars['String']>;
  model: Maybe<Scalars['String']>;
  hashtags: Maybe<Array<Maybe<Scalars['String']>>>;
  /** SIMPLE, CHILD, PARENT */
  slug: Maybe<Scalars['String']>;
  /** Must be Unique */
  brand: Maybe<Scalars['String']>;
  /** The English value */
  title: Maybe<Scalars['String']>;
  /** The English value */
  image: Maybe<Scalars['String']>;
  /** Main image */
  price: Maybe<PriceListInput>;
  listPrice: Maybe<PriceListInput>;
  cost: Maybe<PriceInput>;
  /** null For Parent */
  weight: Maybe<Scalars['BigDecimal']>;
  /** KG */
  variationType: Scalars['String'];
  /** readonly */
  unit: Maybe<Scalars['String']>;
  availability: Maybe<Scalars['Int']>;
  /** In hours */
  quantity: Maybe<Scalars['BigDecimal']>;
  /** discountInPercent: Int */
  options: Maybe<Array<Maybe<VariationOptionInput>>>;
  langs: Maybe<Array<Maybe<ProductI18nInput>>>;
  gallery: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Ordered */
  children: Maybe<Array<Maybe<ChildProductInput>>>;
  attributes: Maybe<Array<Maybe<AttributeI18nInput>>>;
  deliveryProfiles: Maybe<Array<Maybe<AttributeInput>>>;
};

export type Payment = {
   __typename?: 'Payment';
  id: Maybe<Scalars['ID']>;
  paymentMethod: Maybe<Scalars['String']>;
  orderId: Maybe<Scalars['Long']>;
  amount: Maybe<Scalars['BigDecimal']>;
  authCode: Maybe<Scalars['String']>;
  transactionId: Maybe<Scalars['String']>;
  cardNumber: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['String']>;
  orderReference: Maybe<Scalars['String']>;
  account: Maybe<Scalars['String']>;
  bankAccountNumber: Maybe<Scalars['String']>;
  bankName: Maybe<Scalars['String']>;
  bankOwnerName: Maybe<Scalars['String']>;
  settlementDate: Maybe<Scalars['Date']>;
  processedDate: Maybe<Scalars['Date']>;
  customer: Maybe<Scalars['String']>;
  cartId: Maybe<Scalars['String']>;
  voided: Maybe<Scalars['Boolean']>;
  invoiceNum: Maybe<Scalars['String']>;
};

export type PaymentDef = {
   __typename?: 'PaymentDef';
  name: Maybe<Scalars['String']>;
  pk: Maybe<Scalars['String']>;
  code: Maybe<Scalars['String']>;
  html: Maybe<Scalars['String']>;
};

export type PaymentInput = {
  price: Maybe<PriceInput>;
  invoiceNum: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['Long']>;
};

export type PaymentResponse = {
   __typename?: 'PaymentResponse';
  items: Array<Payment>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type Pkg = {
   __typename?: 'Pkg';
  id: Maybe<Scalars['ID']>;
  length: Maybe<Scalars['BigDecimal']>;
  width: Maybe<Scalars['BigDecimal']>;
  height: Maybe<Scalars['BigDecimal']>;
  weight: Maybe<Scalars['BigDecimal']>;
  packageType: Maybe<PackageType>;
  shipmentItems: Maybe<Array<Maybe<ShipmentItem>>>;
};

export type PrepQueue = {
   __typename?: 'PrepQueue';
  id: Maybe<Scalars['ID']>;
  description: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  unpacked: Maybe<Scalars['BigDecimal']>;
  image: Maybe<Scalars['String']>;
  shipmentId: Maybe<Scalars['Long']>;
  productId: Maybe<Scalars['Long']>;
  orderItemId: Maybe<Scalars['Long']>;
  orderId: Maybe<Scalars['Long']>;
};

export type PresignedUrl = {
   __typename?: 'PresignedUrl';
  uploadUrl: Maybe<Scalars['String']>;
  imageUrl: Maybe<Scalars['String']>;
  saveUrl: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  fileHandle: Maybe<Scalars['Long']>;
};

export type Price = {
   __typename?: 'Price';
  amount: Maybe<Scalars['BigDecimal']>;
  currency: Maybe<Scalars['String']>;
};

export type PriceInput = {
  amount: Maybe<Scalars['BigDecimal']>;
  currency: Maybe<Scalars['String']>;
};

export type PriceList = {
   __typename?: 'PriceList';
  priceList: Maybe<Array<Maybe<Price>>>;
  baseCurrency: Maybe<Scalars['String']>;
};

export type PriceListInput = {
  priceList: Maybe<Array<Maybe<PriceInput>>>;
  baseCurrency: Maybe<Scalars['String']>;
};

export type PricingRequest = {
   __typename?: 'PricingRequest';
  id: Maybe<Scalars['ID']>;
  sku: Maybe<Scalars['String']>;
  ref: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  parent: Maybe<Scalars['String']>;
  merchantId: Maybe<Scalars['Int']>;
  merchantName: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['String']>;
};

export type Product = {
   __typename?: 'Product';
  id: Scalars['ID'];
  ref: Maybe<Scalars['Long']>;
  parent: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  upc: Maybe<Scalars['String']>;
  /** price: Price */
  image: Maybe<Scalars['String']>;
  gallery: Maybe<Array<Maybe<Gallery>>>;
  releaseDate: Maybe<Scalars['LocalDate']>;
  active: Maybe<Scalars['Boolean']>;
  similarProducts: Maybe<Array<Maybe<Scalars['Int']>>>;
  url: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  brand: Maybe<Scalars['String']>;
  group: Maybe<ProductGroup>;
  condition: Maybe<Condition>;
  isUsed: Maybe<Scalars['Boolean']>;
  availableForOrder: Maybe<Scalars['Boolean']>;
  weight: Maybe<Scalars['Float']>;
  volumeWeight: Maybe<Scalars['Float']>;
  variationDimensions: Maybe<Array<Maybe<Scalars['String']>>>;
  variationOptions: Maybe<Array<Maybe<VariationOption>>>;
  variationAttributes: Maybe<Array<Maybe<Attribute>>>;
  variations: Maybe<Array<Maybe<Variation>>>;
  price: Maybe<Scalars['String']>;
  /** salePrice: String */
  listPrice: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
  discountInPercent: Maybe<Scalars['Float']>;
  slug: Maybe<Scalars['String']>;
  categories: Maybe<Array<Maybe<Category>>>;
  variationType: Maybe<VariationType>;
  author: Maybe<Scalars['String']>;
  unit: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  meta: Maybe<Meta>;
  merchantStock: Maybe<Array<Maybe<Stock>>>;
  hours: Maybe<Scalars['Int']>;
  availability: Maybe<Scalars['String']>;
  features: Maybe<Array<Maybe<Scalars['String']>>>;
  browseNode: Maybe<Scalars['String']>;
  inStock: Maybe<Scalars['Boolean']>;
  hashtags: Maybe<Array<Maybe<Scalars['String']>>>;
  dial: Maybe<Scalars['String']>;
  rating: Maybe<Scalars['String']>;
  _locale: Maybe<Scalars['String']>;
  stub: Maybe<Scalars['Boolean']>;
  stock: Maybe<Scalars['String']>;
  api: Maybe<Scalars['String']>;
};

export type ProductEnvelope = {
   __typename?: 'ProductEnvelope';
  message: Maybe<Scalars['String']>;
  product: Maybe<PartnerProduct>;
  code: Maybe<Scalars['Int']>;
};

export enum ProductGroup {
  Bags = 'BAGS',
  Art = 'ART',
  Beauty = 'BEAUTY',
  Beddings = 'BEDDINGS',
  Books = 'BOOKS',
  Camera = 'CAMERA',
  Auto = 'AUTO',
  Fashion = 'FASHION',
  Electronics = 'ELECTRONICS',
  Health = 'HEALTH',
  Music = 'MUSIC',
  Pc = 'PC',
  Sports = 'SPORTS',
  Tools = 'TOOLS',
  Toys = 'TOYS',
  Watches = 'WATCHES'
}

export type ProductI18n = {
   __typename?: 'ProductI18n';
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  model: Maybe<Scalars['String']>;
  features: Maybe<Array<Maybe<Scalars['String']>>>;
  brand: Maybe<Scalars['String']>;
  lang: Maybe<Scalars['String']>;
  /** ar #en */
  attributes: Maybe<Array<Maybe<Attribute>>>;
};

export type ProductI18nInput = {
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  model: Maybe<Scalars['String']>;
  features: Maybe<Array<Maybe<Scalars['String']>>>;
  brand: Maybe<Scalars['String']>;
  lang: Maybe<Scalars['String']>;
};

export type ProductInput = {
  sku: Maybe<Scalars['String']>;
  upc: Maybe<Scalars['String']>;
  price: Maybe<Scalars['String']>;
  /** salePrice: String */
  listPrice: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
  image: Maybe<Scalars['String']>;
  inStock: Maybe<Scalars['Boolean']>;
  /**
   * images: [String],
   * releaseDate: LocalDate,
   * active: Boolean,
   * similarProducts: [Int],
   */
  url: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  brand: Maybe<Scalars['String']>;
  group: Maybe<Scalars['String']>;
  features: Maybe<Scalars['String']>;
  name_ar: Maybe<Scalars['String']>;
  brand_ar: Maybe<Scalars['String']>;
  group_ar: Maybe<Scalars['String']>;
  features_ar: Maybe<Scalars['String']>;
  /**
   * condition: Condition,
   * isUsed: Boolean,
   * availableForOrder: Boolean,
   */
  cost: Maybe<Scalars['BigDecimal']>;
  weight: Maybe<Scalars['Float']>;
  availability: Maybe<Scalars['Int']>;
  quantity: Maybe<Scalars['Int']>;
  isPrime: Maybe<Scalars['Boolean']>;
  rating: Maybe<Scalars['String']>;
  api: Maybe<Scalars['String']>;
  pricingApi: Maybe<Scalars['String']>;
  variationType: Maybe<VariationType>;
};

export type ProductResponse = {
   __typename?: 'ProductResponse';
  items: Array<Product>;
  total: Maybe<Scalars['Int']>;
  hasMore: Maybe<Scalars['Boolean']>;
  timestamp: Maybe<Scalars['LocalDateTime']>;
};

export type Purchase = {
   __typename?: 'Purchase';
  id: Maybe<Scalars['ID']>;
  ref: Maybe<Scalars['String']>;
  purchaseItems: Maybe<Array<Maybe<PurchaseItem>>>;
  currency: Maybe<Scalars['String']>;
  invoiceDate: Maybe<Scalars['LocalDate']>;
  subtotal: Maybe<Scalars['BigDecimal']>;
  deliveryTotal: Maybe<Scalars['BigDecimal']>;
  taxesTotal: Maybe<Scalars['BigDecimal']>;
  discountTotal: Maybe<Scalars['BigDecimal']>;
  total: Maybe<Scalars['BigDecimal']>;
  merchantObj: Maybe<Merchant>;
  createdBy: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['String']>;
  lastModifiedBy: Maybe<Scalars['String']>;
  lastModifiedDate: Maybe<Scalars['String']>;
  length: Maybe<Scalars['Int']>;
};

export type PurchaseInput = {
  id: Maybe<Scalars['ID']>;
  currency: Maybe<Scalars['String']>;
  subtotal: Maybe<Scalars['Float']>;
  deliveryTotal: Maybe<Scalars['Float']>;
  taxesTotal: Maybe<Scalars['Float']>;
  discountTotal: Maybe<Scalars['Float']>;
  total: Maybe<Scalars['Float']>;
  deliveryAddressId: Maybe<Scalars['Int']>;
  invoiceAddressId: Maybe<Scalars['Int']>;
  merchantId: Maybe<Scalars['Int']>;
  orderState: Maybe<OrderState>;
  ref: Maybe<Scalars['String']>;
};

export type PurchaseItem = {
   __typename?: 'PurchaseItem';
  id: Maybe<Scalars['ID']>;
  sequence: Maybe<Scalars['Int']>;
  price: Maybe<Scalars['BigDecimal']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  description: Maybe<Scalars['String']>;
  orderItems: Maybe<Array<Maybe<OrderItem>>>;
  productId: Maybe<Scalars['Long']>;
};

export type PurchaseItemInput = {
  id: Maybe<Scalars['Long']>;
  sequence: Maybe<Scalars['Int']>;
  price: Maybe<Scalars['Float']>;
  quantity: Maybe<Scalars['Float']>;
  description: Maybe<Scalars['String']>;
  orderItems: Maybe<Array<Maybe<OrderItemInput>>>;
  productId: Maybe<Scalars['Long']>;
};

export type PurchaseQueue = {
   __typename?: 'PurchaseQueue';
  id: Maybe<Scalars['ID']>;
  productName: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  price: Maybe<Scalars['BigDecimal']>;
  cost: Maybe<Scalars['BigDecimal']>;
  image: Maybe<Scalars['String']>;
  weight: Maybe<Scalars['BigDecimal']>;
  url: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  productId: Maybe<Scalars['Long']>;
  orderId: Maybe<Scalars['Long']>;
  attributes: Maybe<Scalars['String']>;
  merchantId: Maybe<Scalars['Long']>;
};

export type PurchaseResponse = {
   __typename?: 'PurchaseResponse';
  items: Array<Purchase>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type PurchaseShipment = {
   __typename?: 'PurchaseShipment';
  shipmentItemId: Maybe<Scalars['Int']>;
  purchaseItemId: Maybe<Scalars['Int']>;
  purchaseId: Maybe<Scalars['Int']>;
  quantity: Maybe<Scalars['BigDecimal']>;
};

export type PurchaseShipmentInput = {
  shipmentItemId: Maybe<Scalars['Int']>;
  purchaseItemId: Maybe<Scalars['Int']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  purchaseId: Maybe<Scalars['Int']>;
};

export type Query = {
   __typename?: 'Query';
  addresses: Maybe<AddressList>;
  adminSearchTenantProducts: Maybe<ProductResponse>;
  advancedTracking: Maybe<Array<Maybe<ItemTracking>>>;
  aggOrderReport: Maybe<Array<Maybe<OrderSummary>>>;
  auditActivity: Maybe<Array<Maybe<Action>>>;
  brands: Maybe<Array<Maybe<I18String>>>;
  cart: Maybe<Cart>;
  categories: Array<Category>;
  category: Category;
  collections: Maybe<Array<Maybe<I18String>>>;
  currencies: Maybe<Array<Maybe<Currency>>>;
  currentPartner: Maybe<Partner>;
  currentTenant: Maybe<Tenant>;
  /** getAddresses(customerId: Int): [Address] */
  customer: Maybe<Customer>;
  customers: Maybe<Array<Maybe<Customer>>>;
  deliveryProfiles: Maybe<Array<Maybe<Attribute>>>;
  getProductBySku: Maybe<Product>;
  hashtagProducts: Maybe<ProductResponse>;
  hashtags: Maybe<HashtagResponse>;
  hashtagsWithProducts: Maybe<HashtagResponse>;
  inventory: Maybe<Array<Maybe<Inventory>>>;
  me: Maybe<Customer>;
  mePlus: Maybe<Customer>;
  /** getAddress(addressId: Int): Address */
  meTest: Maybe<Customer>;
  merchants: Maybe<Array<Maybe<Merchant>>>;
  orderA: Maybe<Order>;
  orderSummary: Maybe<Order>;
  ordersA: Maybe<OrderResponse>;
  outstandingQueue: Maybe<Array<Maybe<OutstandingQueue>>>;
  parentOf: Maybe<Scalars['String']>;
  partnerOrder: Maybe<Order>;
  partnerOrders: Maybe<OrderResponse>;
  partnerProduct: Maybe<PartnerProduct>;
  partnerProducts: Maybe<ProductResponse>;
  partnerTenantTags: Maybe<Array<Maybe<TenantTag>>>;
  payments: Maybe<Array<Maybe<Payment>>>;
  pkgItemDetails: Maybe<Array<Maybe<ShipmentItemDetails>>>;
  plusCart: Maybe<Checkout>;
  prepQueue: Maybe<Array<Maybe<PrepQueue>>>;
  pricingRequests: Maybe<Array<Maybe<PricingRequest>>>;
  product: Product;
  productAdmin: Maybe<Product>;
  productAny: Maybe<Product>;
  products: ProductResponse;
  purchase: Maybe<Purchase>;
  purchaseQueue: Maybe<Array<Maybe<PurchaseQueue>>>;
  purchases: Maybe<PurchaseResponse>;
  relatedProducts: Array<Product>;
  /** getProductByDial(dial: String):Product */
  relatedTo: Maybe<HashtagResponse>;
  shipQueue: Maybe<Array<Maybe<ShipQueue>>>;
  shipQueueByCustomerId: Maybe<Array<Maybe<ShipQueue>>>;
  shipment: Maybe<Shipment>;
  shipmentDocs: Maybe<Array<Maybe<ShipmentDoc>>>;
  shipmentItemDetails: Maybe<Array<Maybe<ShipmentItemDetails>>>;
  shipmentItemsByTrackingNums: Maybe<Array<Maybe<ShipmentItem>>>;
  shipmentItemsCountByTrackingNums: Maybe<Array<Maybe<ShipmentItemSummary>>>;
  shipmentList: Maybe<Array<Maybe<ShipmentList>>>;
  shipments: Maybe<Array<Maybe<Shipment>>>;
  shipmentsByRef: Maybe<Array<Maybe<Shipment>>>;
  sliders: Maybe<Array<Maybe<Attribute>>>;
  social: Maybe<Array<Maybe<Attribute>>>;
  socialProfiles: Maybe<Array<Maybe<Attribute>>>;
  sortQueue: Maybe<Array<Maybe<SortQueue>>>;
  tenantInfo: Maybe<Tenant>;
  tenantOrder: Maybe<Order>;
  tenantOrders: Maybe<OrderResponse>;
  tenantProduct: Maybe<Product>;
  tenantSliders: Maybe<Array<Maybe<Attribute>>>;
  tenantTagProducts: Maybe<ProductResponse>;
  tenantTags: Maybe<Array<Maybe<TenantTag>>>;
  track: Maybe<Array<Maybe<ShipmentTrackingMap>>>;
  trackingEvents: Maybe<Array<Maybe<TrackingEvent>>>;
  transaction: Maybe<Payment>;
  transactions: Maybe<PaymentResponse>;
  unshippedPurchases: Maybe<Array<Maybe<PurchaseQueue>>>;
  unshippedQueue: Maybe<Array<Maybe<UnshippedQueue>>>;
  variationOptions: Maybe<VariationOption>;
  variations: Maybe<Array<Maybe<VariationOption>>>;
};


export type QueryAdminSearchTenantProductsArgs = {
  upc: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};


export type QueryAdvancedTrackingArgs = {
  ref: Maybe<Scalars['String']>;
  showAll?: Maybe<Scalars['Boolean']>;
  queueName: Maybe<Scalars['String']>;
};


export type QueryAuditActivityArgs = {
  id: Maybe<Scalars['ID']>;
  type: Maybe<Scalars['String']>;
};


export type QueryCartArgs = {
  secureKey: Maybe<Scalars['String']>;
};


export type QueryCategoriesArgs = {
  type: Scalars['String'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryCurrentPartnerArgs = {
  locale: Maybe<Scalars['String']>;
};


export type QueryCustomerArgs = {
  mobile: Maybe<Scalars['String']>;
};


export type QueryGetProductBySkuArgs = {
  sku: Maybe<Scalars['String']>;
  isParent?: Maybe<Scalars['Boolean']>;
  _locale: Maybe<Scalars['String']>;
};


export type QueryHashtagProductsArgs = {
  tenant: Maybe<Scalars['String']>;
  hashtag: Maybe<Scalars['String']>;
};


export type QueryHashtagsArgs = {
  tenant: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryHashtagsWithProductsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryMeTestArgs = {
  id: Maybe<Scalars['Long']>;
};


export type QueryOrderAArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryOrderSummaryArgs = {
  ref: Maybe<Scalars['String']>;
  confirmationKey: Maybe<Scalars['String']>;
};


export type QueryOrdersAArgs = {
  state: Maybe<Array<Maybe<OrderState>>>;
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  searchText: Maybe<Scalars['String']>;
  balance: Maybe<Scalars['Boolean']>;
};


export type QueryOutstandingQueueArgs = {
  keyword: Maybe<Scalars['String']>;
};


export type QueryParentOfArgs = {
  sku: Maybe<Scalars['String']>;
};


export type QueryPartnerOrderArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryPartnerOrdersArgs = {
  state: Maybe<Array<Maybe<OrderState>>>;
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  searchText: Maybe<Scalars['String']>;
  balance: Maybe<Scalars['Boolean']>;
};


export type QueryPartnerProductArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryPartnerProductsArgs = {
  search: Maybe<Scalars['String']>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  active: Maybe<Scalars['Boolean']>;
};


export type QueryPaymentsArgs = {
  orderId: Maybe<Scalars['ID']>;
};


export type QueryPkgItemDetailsArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryPlusCartArgs = {
  secureKey: Maybe<Scalars['String']>;
};


export type QueryPrepQueueArgs = {
  shipmentId: Maybe<Scalars['Long']>;
  keyword?: Maybe<Scalars['String']>;
};


export type QueryProductArgs = {
  slug: Scalars['String'];
  cookie?: Maybe<Scalars['String']>;
  _locale: Maybe<Scalars['String']>;
};


export type QueryProductAdminArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryProductAnyArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryProductsArgs = {
  category: Maybe<Scalars['String']>;
  text: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  lang: Maybe<Scalars['String']>;
};


export type QueryPurchaseArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryPurchasesArgs = {
  state: Maybe<Array<Maybe<OrderState>>>;
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  searchText: Maybe<Scalars['String']>;
};


export type QueryRelatedProductsArgs = {
  type: Maybe<Scalars['String']>;
  slug: Scalars['String'];
};


export type QueryRelatedToArgs = {
  ref: Maybe<Scalars['Long']>;
  hashtags: Maybe<Array<Maybe<Scalars['String']>>>;
  title: Maybe<Scalars['String']>;
};


export type QueryShipQueueByCustomerIdArgs = {
  customerId: Maybe<Scalars['Long']>;
};


export type QueryShipmentArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryShipmentDocsArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryShipmentItemDetailsArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryShipmentItemsByTrackingNumsArgs = {
  trackingNums: Maybe<Array<Maybe<Scalars['String']>>>;
  showClosed: Maybe<Scalars['Boolean']>;
};


export type QueryShipmentItemsCountByTrackingNumsArgs = {
  trackingNums: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryShipmentListArgs = {
  viewName: Maybe<ShipmentListView>;
};


export type QueryShipmentsArgs = {
  status: Maybe<Array<Maybe<ShipmentStatus>>>;
  type: Maybe<ShipmentType>;
};


export type QueryShipmentsByRefArgs = {
  ref: Maybe<Scalars['String']>;
};


export type QuerySlidersArgs = {
  locale: Maybe<Scalars['String']>;
};


export type QuerySocialArgs = {
  locale: Maybe<Scalars['String']>;
};


export type QuerySortQueueArgs = {
  keyword: Maybe<Scalars['String']>;
};


export type QueryTenantOrderArgs = {
  ref: Maybe<Scalars['String']>;
};


export type QueryTenantOrdersArgs = {
  state: Maybe<Array<Maybe<OrderState>>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryTenantProductArgs = {
  slug: Maybe<Scalars['String']>;
};


export type QueryTenantTagProductsArgs = {
  hashtag: Maybe<Scalars['String']>;
};


export type QueryTrackArgs = {
  ref: Maybe<Scalars['String']>;
};


export type QueryTransactionArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryTransactionsArgs = {
  paymentMethods: Maybe<Array<Maybe<Scalars['String']>>>;
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  maxAmount: Maybe<Scalars['String']>;
  from: Maybe<Scalars['Date']>;
  to: Maybe<Scalars['Date']>;
  customerId: Maybe<Scalars['Long']>;
  accountCode: Maybe<Scalars['String']>;
  unsettledOnly: Maybe<Scalars['Boolean']>;
};


export type QueryVariationOptionsArgs = {
  name: Maybe<Scalars['String']>;
};

export type Shipment = {
   __typename?: 'Shipment';
  id: Maybe<Scalars['ID']>;
  estimatedShipDate: Maybe<Scalars['LocalDate']>;
  estimatedReadyDate: Maybe<Scalars['LocalDate']>;
  estimatedArrivalDate: Maybe<Scalars['LocalDate']>;
  estimatedShipCost: Maybe<Scalars['BigDecimal']>;
  actualShipCost: Maybe<Scalars['BigDecimal']>;
  latestCancelDate: Maybe<Scalars['LocalDate']>;
  handlingInstructions: Maybe<Scalars['String']>;
  reference: Maybe<Scalars['String']>;
  trackingNum: Maybe<Scalars['String']>;
  trackingLink: Maybe<Scalars['String']>;
  shipmentMethod: Maybe<Scalars['String']>;
  shipmentType: Maybe<ShipmentType>;
  shipmentStatus: Maybe<ShipmentStatus>;
  /** shipmentItems: [ShipmentItem] */
  customerId: Maybe<Scalars['Long']>;
  merchantId: Maybe<Scalars['Long']>;
  pkgs: Maybe<Array<Maybe<Pkg>>>;
  shipmentItems: Maybe<Array<Maybe<ShipmentItem>>>;
  customerFirstName: Maybe<Scalars['String']>;
  customerLastName: Maybe<Scalars['String']>;
  merchantName: Maybe<Scalars['String']>;
  partyId: Maybe<Scalars['Long']>;
  partyName: Maybe<Scalars['String']>;
};

export type ShipmentDoc = {
   __typename?: 'ShipmentDoc';
  id: Maybe<Scalars['ID']>;
  fileKey: Maybe<Scalars['String']>;
};

export type ShipmentInfo = {
   __typename?: 'ShipmentInfo';
  id: Maybe<Scalars['String']>;
  shipmentMethod: Maybe<Scalars['String']>;
  trackingNum: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  to: Maybe<Scalars['String']>;
};

export type ShipmentInput = {
  id: Maybe<Scalars['ID']>;
  reference: Maybe<Scalars['String']>;
  trackingNum: Maybe<Scalars['String']>;
  shipmentMethod: Maybe<Scalars['String']>;
  shipmentType: Maybe<ShipmentType>;
  shipmentStatus: Maybe<ShipmentStatus>;
  merchantId: Maybe<Scalars['Long']>;
  pkgCount: Maybe<Scalars['Int']>;
  handlingInstructions: Maybe<Scalars['String']>;
  partyId: Maybe<Scalars['Long']>;
};

export type ShipmentItem = {
   __typename?: 'ShipmentItem';
  id: Maybe<Scalars['ID']>;
  sequence: Maybe<Scalars['Int']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  description: Maybe<Scalars['String']>;
  shipmentId: Maybe<Scalars['Long']>;
  productId: Maybe<Scalars['Long']>;
  image: Maybe<Scalars['String']>;
  purchaseShipments: Maybe<Array<Maybe<PurchaseShipment>>>;
  from: Maybe<Scalars['Long']>;
  price: Maybe<Scalars['BigDecimal']>;
};

export type ShipmentItemDetails = {
   __typename?: 'ShipmentItemDetails';
  id: Maybe<Scalars['ID']>;
  sequence: Maybe<Scalars['Int']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  description: Maybe<Scalars['String']>;
  shipmentId: Maybe<Scalars['Long']>;
  productId: Maybe<Scalars['Long']>;
  image: Maybe<Scalars['String']>;
  po: Maybe<Scalars['Long']>;
};

export type ShipmentItemInput = {
  sequence: Maybe<Scalars['Int']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  description: Maybe<Scalars['String']>;
  shipmentId: Maybe<Scalars['Long']>;
  productId: Maybe<Scalars['String']>;
  image: Maybe<Scalars['String']>;
  purchaseShipments: Maybe<Array<Maybe<PurchaseShipmentInput>>>;
  from: Maybe<Scalars['Int']>;
  price: Maybe<Scalars['BigDecimal']>;
};

export type ShipmentItemSummary = {
   __typename?: 'ShipmentItemSummary';
  id: Maybe<Scalars['Int']>;
  trackingNum: Maybe<Scalars['String']>;
  total: Maybe<Scalars['BigDecimal']>;
  status: Maybe<Scalars['String']>;
  processed: Maybe<Scalars['Long']>;
  reference: Maybe<Scalars['String']>;
};

export type ShipmentList = {
   __typename?: 'ShipmentList';
  id: Maybe<Scalars['Long']>;
  createdDate: Maybe<Scalars['String']>;
  shipmentMethod: Maybe<Scalars['String']>;
  trackingNum: Maybe<Scalars['String']>;
  pkgCount: Maybe<Scalars['Int']>;
  arrivedPkgs: Maybe<Scalars['Int']>;
  status: Maybe<Scalars['String']>;
  sender: Maybe<Scalars['String']>;
  receiver: Maybe<Scalars['String']>;
};

export enum ShipmentListView {
  Incoming = 'INCOMING',
  AllPurchase = 'ALL_PURCHASE',
  UnclosedTransit = 'UNCLOSED_TRANSIT',
  CancelledTransit = 'CANCELLED_TRANSIT',
  AllTransit = 'ALL_TRANSIT',
  CustomerScheduled = 'CUSTOMER_SCHEDULED',
  CustomerFailed = 'CUSTOMER_FAILED'
}

export enum ShipmentStatus {
  Pending = 'PENDING',
  InTransit = 'IN_TRANSIT',
  Received = 'RECEIVED',
  Delivered = 'DELIVERED',
  Canceled = 'CANCELED',
  Failed = 'FAILED',
  Processing = 'PROCESSING',
  Accepted = 'ACCEPTED',
  Scheduled = 'SCHEDULED',
  Closed = 'CLOSED',
  Arrived = 'ARRIVED'
}

export type ShipmentTracking = {
   __typename?: 'ShipmentTracking';
  content: Maybe<Array<Maybe<Item>>>;
  progress: Maybe<Array<Maybe<TrackingEventItem>>>;
  docs: Maybe<Array<Maybe<ShipmentDoc>>>;
  status: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  date: Maybe<Scalars['String']>;
  trackingNum: Maybe<Scalars['String']>;
  carrier: Maybe<Scalars['String']>;
};

export type ShipmentTrackingMap = {
   __typename?: 'ShipmentTrackingMap';
  id: Maybe<Scalars['Long']>;
  shipment: Maybe<ShipmentTracking>;
};

export enum ShipmentType {
  Purchase = 'PURCHASE',
  Customer = 'CUSTOMER',
  Transfer = 'TRANSFER',
  Purchasereturn = 'PURCHASERETURN',
  Customerreturn = 'CUSTOMERRETURN',
  Transit = 'TRANSIT'
}

export type ShipQueue = {
   __typename?: 'ShipQueue';
  id: Maybe<Scalars['Long']>;
  fullName: Maybe<Scalars['String']>;
  reference: Maybe<Scalars['String']>;
  total: Maybe<Scalars['BigDecimal']>;
  done: Maybe<Scalars['BigDecimal']>;
  todo: Maybe<Scalars['BigDecimal']>;
  carrier: Maybe<Scalars['String']>;
  estimatedShipDate: Maybe<Scalars['String']>;
};

export type SortQueue = {
   __typename?: 'SortQueue';
  id: Maybe<Scalars['ID']>;
  description: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  preallocated: Maybe<Scalars['BigDecimal']>;
  price: Maybe<Scalars['BigDecimal']>;
  cost: Maybe<Scalars['BigDecimal']>;
  weight: Maybe<Scalars['BigDecimal']>;
  image: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  shippingInstructions: Maybe<Scalars['String']>;
  orderId: Maybe<Scalars['Long']>;
  orderItemId: Maybe<Scalars['Long']>;
  merchantId: Maybe<Scalars['Long']>;
  productId: Maybe<Scalars['Long']>;
};

export type Stock = {
   __typename?: 'Stock';
  quantity: Maybe<Scalars['BigDecimal']>;
  availability: Maybe<Scalars['Int']>;
  allow_backorder: Maybe<Scalars['Boolean']>;
  link: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  price: Maybe<Scalars['BigDecimal']>;
};

export type Subscription = {
   __typename?: 'Subscription';
  getProductBySku: Attribute;
};


export type SubscriptionGetProductBySkuArgs = {
  sku: Maybe<Scalars['String']>;
  isParent?: Maybe<Scalars['Boolean']>;
  _locale: Maybe<Scalars['String']>;
};

export type Tenant = {
   __typename?: 'Tenant';
  id: Maybe<Scalars['Long']>;
  logo: Maybe<Scalars['String']>;
  mobileLogo: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  maxProducts: Maybe<Scalars['Int']>;
  discountRate: Maybe<Scalars['Int']>;
  active: Maybe<Scalars['Boolean']>;
  skuPrefix: Maybe<Scalars['String']>;
  publicPaymentProfile: Maybe<Array<Maybe<PaymentDef>>>;
  tenantId: Maybe<Scalars['String']>;
  socialList: Maybe<Array<Maybe<Attribute>>>;
  subdomain: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  customDomain: Maybe<Scalars['String']>;
};

export type TenantTag = {
   __typename?: 'TenantTag';
  id: Maybe<Scalars['Long']>;
  langs: Maybe<Array<Maybe<I18String>>>;
  icon: Maybe<Scalars['String']>;
  position: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
};

export type TenantTagInput = {
  id: Maybe<Scalars['Long']>;
  langs: Maybe<Array<Maybe<I18StringInput>>>;
  icon: Maybe<Scalars['String']>;
  position: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
};

export type TrackingEvent = {
   __typename?: 'TrackingEvent';
  id: Maybe<Scalars['Long']>;
  name: Maybe<Scalars['String']>;
};

export type TrackingEventItem = {
   __typename?: 'TrackingEventItem';
  status: Maybe<Scalars['String']>;
  shipmentEventId: Maybe<Scalars['Int']>;
  shipmentEventDescription: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['String']>;
  details: Maybe<Scalars['String']>;
  eventDate: Maybe<Scalars['LocalDateTime']>;
};

export type UnshippedQueue = {
   __typename?: 'UnshippedQueue';
  id: Maybe<Scalars['ID']>;
  description: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  date: Maybe<Scalars['String']>;
  price: Maybe<Scalars['BigDecimal']>;
  weight: Maybe<Scalars['BigDecimal']>;
  image: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  po: Maybe<Scalars['Long']>;
};

export type Variation = {
   __typename?: 'Variation';
  ref: Scalars['ID'];
  variationAttributes: Maybe<Array<Maybe<Attribute>>>;
};

export type VariationOption = {
   __typename?: 'VariationOption';
  label: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  values: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type VariationOptionInput = {
  label: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  values: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum VariationType {
  Simple = 'SIMPLE',
  Child = 'CHILD',
  Parent = 'PARENT'
}

export type AddDiscountMutationVariables = {
  id: Maybe<Scalars['ID']>;
  amount: Maybe<Scalars['BigDecimal']>;
  couponName: Maybe<Scalars['String']>;
};


export type AddDiscountMutation = (
  { __typename?: 'Mutation' }
  & { addDiscount: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'value'>
  )> }
);

export type GetAdminFileMutationVariables = {
  filename: Maybe<Scalars['String']>;
};


export type GetAdminFileMutation = (
  { __typename?: 'Mutation' }
  & { getAdminFile: Maybe<(
    { __typename?: 'PresignedUrl' }
    & Pick<PresignedUrl, 'uploadUrl'>
  )> }
);

export type CreateHashtagMutationVariables = {
  hashtag: Maybe<HashtagInput>;
};


export type CreateHashtagMutation = (
  { __typename?: 'Mutation' }
  & { createHashtag: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'value'>
  )> }
);

export type CreateStubMutationVariables = {
  product: Maybe<AddProductInput>;
  isSaveES: Maybe<Scalars['Boolean']>;
  currentMerchantId: Maybe<Scalars['Long']>;
};


export type CreateStubMutation = (
  { __typename?: 'Mutation' }
  & { createStub: Maybe<(
    { __typename?: 'MerchantProduct' }
    & Pick<MerchantProduct, 'ref'>
  )> }
);

export type CustomerQueryVariables = {
  mobile: Maybe<Scalars['String']>;
};


export type CustomerQuery = (
  { __typename?: 'Query' }
  & { customer: Maybe<(
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'firstname' | 'lastname' | 'email' | 'mobile'>
    & { addresses: Maybe<Array<Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'alias' | 'line1' | 'line2' | 'city' | 'mobile' | 'lng' | 'lat' | 'plusCode'>
    )>>> }
  )> }
);

export type GetAdminImageUploadUrlMutationVariables = {
  filename: Maybe<Scalars['String']>;
  merchant: Maybe<Scalars['String']>;
};


export type GetAdminImageUploadUrlMutation = (
  { __typename?: 'Mutation' }
  & { getAdminImageUploadUrl: Maybe<(
    { __typename?: 'PresignedUrl' }
    & Pick<PresignedUrl, 'uploadUrl' | 'imageUrl' | 'status'>
  )> }
);

export type GetImageUploadUrlMutationVariables = {
  filename: Maybe<Scalars['String']>;
};


export type GetImageUploadUrlMutation = (
  { __typename?: 'Mutation' }
  & { getImageUploadUrl: Maybe<(
    { __typename?: 'PresignedUrl' }
    & Pick<PresignedUrl, 'uploadUrl' | 'imageUrl' | 'status'>
  )> }
);

export type GetUploadUrlMutationVariables = {
  filename: Maybe<Scalars['String']>;
};


export type GetUploadUrlMutation = (
  { __typename?: 'Mutation' }
  & { getUploadUrl: Maybe<(
    { __typename?: 'PresignedUrl' }
    & Pick<PresignedUrl, 'uploadUrl' | 'imageUrl' | 'status'>
  )> }
);

export type HashtagsQueryVariables = {
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type HashtagsQuery = (
  { __typename?: 'Query' }
  & { hashtags: Maybe<(
    { __typename?: 'HashtagResponse' }
    & Pick<HashtagResponse, 'total' | 'hasMore'>
    & { items: Array<(
      { __typename?: 'Hashtag' }
      & Pick<Hashtag, 'id' | 'icon' | 'position' | 'en' | 'ar'>
    )> }
  )> }
);

export type MerchantsQueryVariables = {};


export type MerchantsQuery = (
  { __typename?: 'Query' }
  & { merchants: Maybe<Array<Maybe<(
    { __typename?: 'Merchant' }
    & Pick<Merchant, 'id' | 'name'>
  )>>> }
);

export type AdvancedTrackingQueryVariables = {
  ref: Maybe<Scalars['String']>;
  showAll: Maybe<Scalars['Boolean']>;
  queueName: Maybe<Scalars['String']>;
};


export type AdvancedTrackingQuery = (
  { __typename?: 'Query' }
  & { advancedTracking: Maybe<Array<Maybe<(
    { __typename?: 'ItemTracking' }
    & Pick<ItemTracking, 'id' | 'pid' | 'productId' | 'price' | 'description' | 'image' | 'quantity' | 'reference' | 'po' | 'orderDate' | 'invoiceDate' | 'purchaseDate' | 'merchant' | 'merchantId' | 'sku' | 'url' | 'delivered'>
    & { purchaseShipments: Maybe<Array<Maybe<(
      { __typename?: 'ShipmentInfo' }
      & Pick<ShipmentInfo, 'id' | 'status' | 'trackingNum' | 'shipmentMethod'>
    )>>>, transitShipments: Maybe<Array<Maybe<(
      { __typename?: 'ShipmentInfo' }
      & Pick<ShipmentInfo, 'id' | 'status' | 'trackingNum' | 'shipmentMethod' | 'to'>
    )>>>, customerShipments: Maybe<Array<Maybe<(
      { __typename?: 'ShipmentInfo' }
      & Pick<ShipmentInfo, 'id' | 'status' | 'trackingNum' | 'shipmentMethod'>
    )>>> }
  )>>> }
);

export type AuditActivityQueryVariables = {
  id: Maybe<Scalars['ID']>;
  type: Maybe<Scalars['String']>;
};


export type AuditActivityQuery = (
  { __typename?: 'Query' }
  & { auditActivity: Maybe<Array<Maybe<(
    { __typename?: 'Action' }
    & Pick<Action, 'id' | 'action' | 'object' | 'objectId' | 'state' | 'comment' | 'createdDate' | 'createdBy'>
  )>>> }
);

export type OrderAQueryVariables = {
  id: Maybe<Scalars['ID']>;
};


export type OrderAQuery = (
  { __typename?: 'Query' }
  & { orderA: Maybe<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'reference' | 'createdDate' | 'invoiceDate' | 'total' | 'paymentMethod' | 'subtotal' | 'orderState' | 'deliveryTotal' | 'discountsTotal' | 'couponName' | 'deliveryDate' | 'cartId' | 'cartSecureKey' | 'currency' | 'balance' | 'carrier'>
    & { customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'firstname' | 'lastname' | 'email' | 'mobile'>
    )>, deliveryAddress: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'firstName' | 'lastName' | 'line1' | 'line2' | 'city' | 'mobile'>
    )>, items: Maybe<Array<Maybe<(
      { __typename?: 'OrderItem' }
      & Pick<OrderItem, 'id' | 'sequence' | 'productId' | 'productSku' | 'productUrl' | 'productName' | 'productMerchantId' | 'price' | 'quantity' | 'image' | 'lineTotal' | 'po'>
    )>>>, payments: Maybe<Array<Maybe<(
      { __typename?: 'Payment' }
      & Pick<Payment, 'id' | 'createdDate' | 'paymentMethod' | 'authCode' | 'amount' | 'processedDate' | 'settlementDate' | 'voided'>
    )>>> }
  )> }
);

export type AddPaymentMutationVariables = {
  id: Maybe<Scalars['ID']>;
  amount: Maybe<Scalars['BigDecimal']>;
  method: Maybe<Scalars['String']>;
  authCode: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
};


export type AddPaymentMutation = (
  { __typename?: 'Mutation' }
  & { addPayment: Maybe<(
    { __typename?: 'Payment' }
    & Pick<Payment, 'paymentMethod' | 'amount'>
  )> }
);

export type RefundPaymentMutationVariables = {
  id: Maybe<Scalars['ID']>;
  amount: Maybe<Scalars['BigDecimal']>;
  authCode: Maybe<Scalars['String']>;
  bankName: Maybe<Scalars['String']>;
  bankAccountNumber: Maybe<Scalars['String']>;
  bankOwnerName: Maybe<Scalars['String']>;
  ref: Maybe<Scalars['Long']>;
  paymentMethod: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
};


export type RefundPaymentMutation = (
  { __typename?: 'Mutation' }
  & { refundPayment: Maybe<(
    { __typename?: 'Payment' }
    & Pick<Payment, 'paymentMethod' | 'amount'>
  )> }
);

export type VoidPaymentMutationVariables = {
  id: Maybe<Scalars['ID']>;
};


export type VoidPaymentMutation = (
  { __typename?: 'Mutation' }
  & { voidPayment: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'value'>
  )> }
);

export type PurchaseQueryVariables = {
  id: Maybe<Scalars['ID']>;
};


export type PurchaseQuery = (
  { __typename?: 'Query' }
  & { purchase: Maybe<(
    { __typename?: 'Purchase' }
    & Pick<Purchase, 'id' | 'deliveryTotal' | 'currency' | 'invoiceDate' | 'subtotal' | 'taxesTotal' | 'discountTotal' | 'total' | 'ref'>
    & { merchantObj: Maybe<(
      { __typename?: 'Merchant' }
      & Pick<Merchant, 'id' | 'name'>
    )>, purchaseItems: Maybe<Array<Maybe<(
      { __typename?: 'PurchaseItem' }
      & Pick<PurchaseItem, 'id' | 'productId' | 'sequence' | 'price' | 'quantity' | 'description'>
      & { orderItems: Maybe<Array<Maybe<(
        { __typename?: 'OrderItem' }
        & Pick<OrderItem, 'id' | 'orderId'>
      )>>> }
    )>>> }
  )> }
);

export type PurchaseQueueQueryVariables = {};


export type PurchaseQueueQuery = (
  { __typename?: 'Query' }
  & { purchaseQueue: Maybe<Array<Maybe<(
    { __typename?: 'PurchaseQueue' }
    & Pick<PurchaseQueue, 'id' | 'productName' | 'quantity' | 'price' | 'image' | 'sku' | 'cost' | 'orderId' | 'productId' | 'attributes' | 'merchantId' | 'url'>
  )>>> }
);

export type SetProcessedDateMutationVariables = {
  paymentIds: Maybe<Array<Maybe<Scalars['Long']>>>;
  date: Maybe<Scalars['Date']>;
};


export type SetProcessedDateMutation = (
  { __typename?: 'Mutation' }
  & { setProcessedDate: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'value'>
  )> }
);

export type SetAccountingCodeMutationVariables = {
  paymentIds: Maybe<Array<Maybe<Scalars['Long']>>>;
  code: Maybe<Scalars['String']>;
};


export type SetAccountingCodeMutation = (
  { __typename?: 'Mutation' }
  & { setAccountingCode: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'value'>
  )> }
);

export type SetEstimatedShipDateMutationVariables = {
  id: Maybe<Scalars['Long']>;
  date: Maybe<Scalars['Date']>;
};


export type SetEstimatedShipDateMutation = (
  { __typename?: 'Mutation' }
  & { setEstimatedShipDate: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'value'>
  )> }
);

export type SetSettlementDateMutationVariables = {
  paymentIds: Maybe<Array<Maybe<Scalars['Long']>>>;
  date: Maybe<Scalars['Date']>;
};


export type SetSettlementDateMutation = (
  { __typename?: 'Mutation' }
  & { setSettlementDate: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'value'>
  )> }
);

export type SetShipmentStatusMutationVariables = {
  id: Maybe<Scalars['Long']>;
  status: Maybe<ShipmentStatus>;
};


export type SetShipmentStatusMutation = (
  { __typename?: 'Mutation' }
  & { setShipmentStatus: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'value'>
  )> }
);

export type AddShipmentDocMutationVariables = {
  id: Maybe<Scalars['Long']>;
  filename: Maybe<Scalars['String']>;
};


export type AddShipmentDocMutation = (
  { __typename?: 'Mutation' }
  & { addShipmentDoc: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'value'>
  )> }
);

export type ShipmentQueryVariables = {
  id: Maybe<Scalars['ID']>;
};


export type ShipmentQuery = (
  { __typename?: 'Query' }
  & { shipment: Maybe<(
    { __typename?: 'Shipment' }
    & Pick<Shipment, 'id' | 'actualShipCost' | 'latestCancelDate' | 'handlingInstructions' | 'reference' | 'trackingNum' | 'trackingLink' | 'shipmentMethod' | 'shipmentType' | 'shipmentStatus' | 'customerFirstName' | 'customerLastName' | 'customerId' | 'merchantId' | 'partyId' | 'partyName'>
    & { pkgs: Maybe<Array<Maybe<(
      { __typename?: 'Pkg' }
      & Pick<Pkg, 'id' | 'length' | 'width' | 'height' | 'weight' | 'packageType'>
    )>>> }
  )> }
);

export type ShipmentDocsQueryVariables = {
  id: Maybe<Scalars['ID']>;
};


export type ShipmentDocsQuery = (
  { __typename?: 'Query' }
  & { shipmentDocs: Maybe<Array<Maybe<(
    { __typename?: 'ShipmentDoc' }
    & Pick<ShipmentDoc, 'fileKey'>
  )>>> }
);

export type ShipmentItemDetailsQueryVariables = {
  id: Maybe<Scalars['ID']>;
};


export type ShipmentItemDetailsQuery = (
  { __typename?: 'Query' }
  & { shipmentItemDetails: Maybe<Array<Maybe<(
    { __typename?: 'ShipmentItemDetails' }
    & Pick<ShipmentItemDetails, 'id' | 'sequence' | 'quantity' | 'description' | 'shipmentId' | 'productId' | 'image' | 'po'>
  )>>> }
);

export type PkgItemDetailsQueryVariables = {
  id: Maybe<Scalars['ID']>;
};


export type PkgItemDetailsQuery = (
  { __typename?: 'Query' }
  & { pkgItemDetails: Maybe<Array<Maybe<(
    { __typename?: 'ShipmentItemDetails' }
    & Pick<ShipmentItemDetails, 'id' | 'sequence' | 'quantity' | 'description' | 'shipmentId' | 'productId' | 'image'>
  )>>> }
);

export type TransactionsQueryVariables = {
  paymentMethods: Maybe<Array<Maybe<Scalars['String']>>>;
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  maxAmount: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['Date']>;
  to?: Maybe<Scalars['Date']>;
  customerId?: Maybe<Scalars['Long']>;
  accountCode?: Maybe<Scalars['String']>;
  unsettledOnly?: Maybe<Scalars['Boolean']>;
};


export type TransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: Maybe<(
    { __typename?: 'PaymentResponse' }
    & Pick<PaymentResponse, 'total' | 'hasMore'>
    & { items: Array<(
      { __typename?: 'Payment' }
      & Pick<Payment, 'id' | 'paymentMethod' | 'orderId' | 'amount' | 'authCode' | 'transactionId' | 'cardNumber' | 'createdDate' | 'orderReference' | 'account' | 'bankAccountNumber' | 'bankName' | 'bankOwnerName' | 'settlementDate' | 'processedDate' | 'customer' | 'cartId' | 'invoiceNum'>
    )> }
  )> }
);

export type UpdateFromDetrackMutationVariables = {
  id: Maybe<Scalars['String']>;
};


export type UpdateFromDetrackMutation = (
  { __typename?: 'Mutation' }
  & { updateFromDetrack: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'value'>
  )> }
);


export const AddDiscountDocument = gql`
    mutation addDiscount($id: ID, $amount: BigDecimal, $couponName: String) {
  addDiscount(id: $id, amount: $amount, couponName: $couponName) {
    value
  }
}
    `;
export type AddDiscountMutationFn = ApolloReactCommon.MutationFunction<AddDiscountMutation, AddDiscountMutationVariables>;
export type AddDiscountComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddDiscountMutation, AddDiscountMutationVariables>, 'mutation'>;

    export const AddDiscountComponent = (props: AddDiscountComponentProps) => (
      <ApolloReactComponents.Mutation<AddDiscountMutation, AddDiscountMutationVariables> mutation={AddDiscountDocument} {...props} />
    );
    
export type AddDiscountProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<AddDiscountMutation, AddDiscountMutationVariables>
    } & TChildProps;
export function withAddDiscount<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddDiscountMutation,
  AddDiscountMutationVariables,
  AddDiscountProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, AddDiscountMutation, AddDiscountMutationVariables, AddDiscountProps<TChildProps, TDataName>>(AddDiscountDocument, {
      alias: 'addDiscount',
      ...operationOptions
    });
};

/**
 * __useAddDiscountMutation__
 *
 * To run a mutation, you first call `useAddDiscountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDiscountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDiscountMutation, { data, loading, error }] = useAddDiscountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      amount: // value for 'amount'
 *      couponName: // value for 'couponName'
 *   },
 * });
 */
export function useAddDiscountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddDiscountMutation, AddDiscountMutationVariables>) {
        return ApolloReactHooks.useMutation<AddDiscountMutation, AddDiscountMutationVariables>(AddDiscountDocument, baseOptions);
      }
export type AddDiscountMutationHookResult = ReturnType<typeof useAddDiscountMutation>;
export type AddDiscountMutationResult = ApolloReactCommon.MutationResult<AddDiscountMutation>;
export type AddDiscountMutationOptions = ApolloReactCommon.BaseMutationOptions<AddDiscountMutation, AddDiscountMutationVariables>;
export const GetAdminFileDocument = gql`
    mutation getAdminFile($filename: String) {
  getAdminFile(filename: $filename) {
    uploadUrl
  }
}
    `;
export type GetAdminFileMutationFn = ApolloReactCommon.MutationFunction<GetAdminFileMutation, GetAdminFileMutationVariables>;
export type GetAdminFileComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<GetAdminFileMutation, GetAdminFileMutationVariables>, 'mutation'>;

    export const GetAdminFileComponent = (props: GetAdminFileComponentProps) => (
      <ApolloReactComponents.Mutation<GetAdminFileMutation, GetAdminFileMutationVariables> mutation={GetAdminFileDocument} {...props} />
    );
    
export type GetAdminFileProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<GetAdminFileMutation, GetAdminFileMutationVariables>
    } & TChildProps;
export function withGetAdminFile<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAdminFileMutation,
  GetAdminFileMutationVariables,
  GetAdminFileProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, GetAdminFileMutation, GetAdminFileMutationVariables, GetAdminFileProps<TChildProps, TDataName>>(GetAdminFileDocument, {
      alias: 'getAdminFile',
      ...operationOptions
    });
};

/**
 * __useGetAdminFileMutation__
 *
 * To run a mutation, you first call `useGetAdminFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetAdminFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getAdminFileMutation, { data, loading, error }] = useGetAdminFileMutation({
 *   variables: {
 *      filename: // value for 'filename'
 *   },
 * });
 */
export function useGetAdminFileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetAdminFileMutation, GetAdminFileMutationVariables>) {
        return ApolloReactHooks.useMutation<GetAdminFileMutation, GetAdminFileMutationVariables>(GetAdminFileDocument, baseOptions);
      }
export type GetAdminFileMutationHookResult = ReturnType<typeof useGetAdminFileMutation>;
export type GetAdminFileMutationResult = ApolloReactCommon.MutationResult<GetAdminFileMutation>;
export type GetAdminFileMutationOptions = ApolloReactCommon.BaseMutationOptions<GetAdminFileMutation, GetAdminFileMutationVariables>;
export const CreateHashtagDocument = gql`
    mutation createHashtag($hashtag: HashtagInput) {
  createHashtag(hashtag: $hashtag) {
    value
  }
}
    `;
export type CreateHashtagMutationFn = ApolloReactCommon.MutationFunction<CreateHashtagMutation, CreateHashtagMutationVariables>;
export type CreateHashtagComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateHashtagMutation, CreateHashtagMutationVariables>, 'mutation'>;

    export const CreateHashtagComponent = (props: CreateHashtagComponentProps) => (
      <ApolloReactComponents.Mutation<CreateHashtagMutation, CreateHashtagMutationVariables> mutation={CreateHashtagDocument} {...props} />
    );
    
export type CreateHashtagProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateHashtagMutation, CreateHashtagMutationVariables>
    } & TChildProps;
export function withCreateHashtag<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateHashtagMutation,
  CreateHashtagMutationVariables,
  CreateHashtagProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateHashtagMutation, CreateHashtagMutationVariables, CreateHashtagProps<TChildProps, TDataName>>(CreateHashtagDocument, {
      alias: 'createHashtag',
      ...operationOptions
    });
};

/**
 * __useCreateHashtagMutation__
 *
 * To run a mutation, you first call `useCreateHashtagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHashtagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHashtagMutation, { data, loading, error }] = useCreateHashtagMutation({
 *   variables: {
 *      hashtag: // value for 'hashtag'
 *   },
 * });
 */
export function useCreateHashtagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateHashtagMutation, CreateHashtagMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateHashtagMutation, CreateHashtagMutationVariables>(CreateHashtagDocument, baseOptions);
      }
export type CreateHashtagMutationHookResult = ReturnType<typeof useCreateHashtagMutation>;
export type CreateHashtagMutationResult = ApolloReactCommon.MutationResult<CreateHashtagMutation>;
export type CreateHashtagMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateHashtagMutation, CreateHashtagMutationVariables>;
export const CreateStubDocument = gql`
    mutation createStub($product: AddProductInput, $isSaveES: Boolean, $currentMerchantId: Long) {
  createStub(product: $product, isSaveES: $isSaveES, currentMerchantId: $currentMerchantId) {
    ref
  }
}
    `;
export type CreateStubMutationFn = ApolloReactCommon.MutationFunction<CreateStubMutation, CreateStubMutationVariables>;
export type CreateStubComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateStubMutation, CreateStubMutationVariables>, 'mutation'>;

    export const CreateStubComponent = (props: CreateStubComponentProps) => (
      <ApolloReactComponents.Mutation<CreateStubMutation, CreateStubMutationVariables> mutation={CreateStubDocument} {...props} />
    );
    
export type CreateStubProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateStubMutation, CreateStubMutationVariables>
    } & TChildProps;
export function withCreateStub<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateStubMutation,
  CreateStubMutationVariables,
  CreateStubProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateStubMutation, CreateStubMutationVariables, CreateStubProps<TChildProps, TDataName>>(CreateStubDocument, {
      alias: 'createStub',
      ...operationOptions
    });
};

/**
 * __useCreateStubMutation__
 *
 * To run a mutation, you first call `useCreateStubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStubMutation, { data, loading, error }] = useCreateStubMutation({
 *   variables: {
 *      product: // value for 'product'
 *      isSaveES: // value for 'isSaveES'
 *      currentMerchantId: // value for 'currentMerchantId'
 *   },
 * });
 */
export function useCreateStubMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateStubMutation, CreateStubMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateStubMutation, CreateStubMutationVariables>(CreateStubDocument, baseOptions);
      }
export type CreateStubMutationHookResult = ReturnType<typeof useCreateStubMutation>;
export type CreateStubMutationResult = ApolloReactCommon.MutationResult<CreateStubMutation>;
export type CreateStubMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateStubMutation, CreateStubMutationVariables>;
export const CustomerDocument = gql`
    query customer($mobile: String) {
  customer(mobile: $mobile) {
    id
    firstname
    lastname
    email
    mobile
    addresses {
      id
      alias
      line1
      line2
      city
      mobile
      lng
      lat
      plusCode
    }
  }
}
    `;
export type CustomerComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CustomerQuery, CustomerQueryVariables>, 'query'>;

    export const CustomerComponent = (props: CustomerComponentProps) => (
      <ApolloReactComponents.Query<CustomerQuery, CustomerQueryVariables> query={CustomerDocument} {...props} />
    );
    
export type CustomerProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<CustomerQuery, CustomerQueryVariables>
    } & TChildProps;
export function withCustomer<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CustomerQuery,
  CustomerQueryVariables,
  CustomerProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, CustomerQuery, CustomerQueryVariables, CustomerProps<TChildProps, TDataName>>(CustomerDocument, {
      alias: 'customer',
      ...operationOptions
    });
};

/**
 * __useCustomerQuery__
 *
 * To run a query within a React component, call `useCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerQuery({
 *   variables: {
 *      mobile: // value for 'mobile'
 *   },
 * });
 */
export function useCustomerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
        return ApolloReactHooks.useQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, baseOptions);
      }
export function useCustomerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, baseOptions);
        }
export type CustomerQueryHookResult = ReturnType<typeof useCustomerQuery>;
export type CustomerLazyQueryHookResult = ReturnType<typeof useCustomerLazyQuery>;
export type CustomerQueryResult = ApolloReactCommon.QueryResult<CustomerQuery, CustomerQueryVariables>;
export const GetAdminImageUploadUrlDocument = gql`
    mutation getAdminImageUploadUrl($filename: String, $merchant: String) {
  getAdminImageUploadUrl(filename: $filename, merchant: $merchant) {
    uploadUrl
    imageUrl
    status
  }
}
    `;
export type GetAdminImageUploadUrlMutationFn = ApolloReactCommon.MutationFunction<GetAdminImageUploadUrlMutation, GetAdminImageUploadUrlMutationVariables>;
export type GetAdminImageUploadUrlComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<GetAdminImageUploadUrlMutation, GetAdminImageUploadUrlMutationVariables>, 'mutation'>;

    export const GetAdminImageUploadUrlComponent = (props: GetAdminImageUploadUrlComponentProps) => (
      <ApolloReactComponents.Mutation<GetAdminImageUploadUrlMutation, GetAdminImageUploadUrlMutationVariables> mutation={GetAdminImageUploadUrlDocument} {...props} />
    );
    
export type GetAdminImageUploadUrlProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<GetAdminImageUploadUrlMutation, GetAdminImageUploadUrlMutationVariables>
    } & TChildProps;
export function withGetAdminImageUploadUrl<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAdminImageUploadUrlMutation,
  GetAdminImageUploadUrlMutationVariables,
  GetAdminImageUploadUrlProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, GetAdminImageUploadUrlMutation, GetAdminImageUploadUrlMutationVariables, GetAdminImageUploadUrlProps<TChildProps, TDataName>>(GetAdminImageUploadUrlDocument, {
      alias: 'getAdminImageUploadUrl',
      ...operationOptions
    });
};

/**
 * __useGetAdminImageUploadUrlMutation__
 *
 * To run a mutation, you first call `useGetAdminImageUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetAdminImageUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getAdminImageUploadUrlMutation, { data, loading, error }] = useGetAdminImageUploadUrlMutation({
 *   variables: {
 *      filename: // value for 'filename'
 *      merchant: // value for 'merchant'
 *   },
 * });
 */
export function useGetAdminImageUploadUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetAdminImageUploadUrlMutation, GetAdminImageUploadUrlMutationVariables>) {
        return ApolloReactHooks.useMutation<GetAdminImageUploadUrlMutation, GetAdminImageUploadUrlMutationVariables>(GetAdminImageUploadUrlDocument, baseOptions);
      }
export type GetAdminImageUploadUrlMutationHookResult = ReturnType<typeof useGetAdminImageUploadUrlMutation>;
export type GetAdminImageUploadUrlMutationResult = ApolloReactCommon.MutationResult<GetAdminImageUploadUrlMutation>;
export type GetAdminImageUploadUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<GetAdminImageUploadUrlMutation, GetAdminImageUploadUrlMutationVariables>;
export const GetImageUploadUrlDocument = gql`
    mutation getImageUploadUrl($filename: String) {
  getImageUploadUrl(filename: $filename) {
    uploadUrl
    imageUrl
    status
  }
}
    `;
export type GetImageUploadUrlMutationFn = ApolloReactCommon.MutationFunction<GetImageUploadUrlMutation, GetImageUploadUrlMutationVariables>;
export type GetImageUploadUrlComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<GetImageUploadUrlMutation, GetImageUploadUrlMutationVariables>, 'mutation'>;

    export const GetImageUploadUrlComponent = (props: GetImageUploadUrlComponentProps) => (
      <ApolloReactComponents.Mutation<GetImageUploadUrlMutation, GetImageUploadUrlMutationVariables> mutation={GetImageUploadUrlDocument} {...props} />
    );
    
export type GetImageUploadUrlProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<GetImageUploadUrlMutation, GetImageUploadUrlMutationVariables>
    } & TChildProps;
export function withGetImageUploadUrl<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetImageUploadUrlMutation,
  GetImageUploadUrlMutationVariables,
  GetImageUploadUrlProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, GetImageUploadUrlMutation, GetImageUploadUrlMutationVariables, GetImageUploadUrlProps<TChildProps, TDataName>>(GetImageUploadUrlDocument, {
      alias: 'getImageUploadUrl',
      ...operationOptions
    });
};

/**
 * __useGetImageUploadUrlMutation__
 *
 * To run a mutation, you first call `useGetImageUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetImageUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getImageUploadUrlMutation, { data, loading, error }] = useGetImageUploadUrlMutation({
 *   variables: {
 *      filename: // value for 'filename'
 *   },
 * });
 */
export function useGetImageUploadUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetImageUploadUrlMutation, GetImageUploadUrlMutationVariables>) {
        return ApolloReactHooks.useMutation<GetImageUploadUrlMutation, GetImageUploadUrlMutationVariables>(GetImageUploadUrlDocument, baseOptions);
      }
export type GetImageUploadUrlMutationHookResult = ReturnType<typeof useGetImageUploadUrlMutation>;
export type GetImageUploadUrlMutationResult = ApolloReactCommon.MutationResult<GetImageUploadUrlMutation>;
export type GetImageUploadUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<GetImageUploadUrlMutation, GetImageUploadUrlMutationVariables>;
export const GetUploadUrlDocument = gql`
    mutation getUploadUrl($filename: String) {
  getUploadUrl(filename: $filename) {
    uploadUrl
    imageUrl
    status
  }
}
    `;
export type GetUploadUrlMutationFn = ApolloReactCommon.MutationFunction<GetUploadUrlMutation, GetUploadUrlMutationVariables>;
export type GetUploadUrlComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<GetUploadUrlMutation, GetUploadUrlMutationVariables>, 'mutation'>;

    export const GetUploadUrlComponent = (props: GetUploadUrlComponentProps) => (
      <ApolloReactComponents.Mutation<GetUploadUrlMutation, GetUploadUrlMutationVariables> mutation={GetUploadUrlDocument} {...props} />
    );
    
export type GetUploadUrlProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<GetUploadUrlMutation, GetUploadUrlMutationVariables>
    } & TChildProps;
export function withGetUploadUrl<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUploadUrlMutation,
  GetUploadUrlMutationVariables,
  GetUploadUrlProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, GetUploadUrlMutation, GetUploadUrlMutationVariables, GetUploadUrlProps<TChildProps, TDataName>>(GetUploadUrlDocument, {
      alias: 'getUploadUrl',
      ...operationOptions
    });
};

/**
 * __useGetUploadUrlMutation__
 *
 * To run a mutation, you first call `useGetUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getUploadUrlMutation, { data, loading, error }] = useGetUploadUrlMutation({
 *   variables: {
 *      filename: // value for 'filename'
 *   },
 * });
 */
export function useGetUploadUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetUploadUrlMutation, GetUploadUrlMutationVariables>) {
        return ApolloReactHooks.useMutation<GetUploadUrlMutation, GetUploadUrlMutationVariables>(GetUploadUrlDocument, baseOptions);
      }
export type GetUploadUrlMutationHookResult = ReturnType<typeof useGetUploadUrlMutation>;
export type GetUploadUrlMutationResult = ApolloReactCommon.MutationResult<GetUploadUrlMutation>;
export type GetUploadUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<GetUploadUrlMutation, GetUploadUrlMutationVariables>;
export const HashtagsDocument = gql`
    query hashtags($offset: Int, $limit: Int) {
  hashtags(offset: $offset, limit: $limit) {
    total
    hasMore
    items {
      id
      icon
      position
      en
      ar
    }
  }
}
    `;
export type HashtagsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<HashtagsQuery, HashtagsQueryVariables>, 'query'>;

    export const HashtagsComponent = (props: HashtagsComponentProps) => (
      <ApolloReactComponents.Query<HashtagsQuery, HashtagsQueryVariables> query={HashtagsDocument} {...props} />
    );
    
export type HashtagsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<HashtagsQuery, HashtagsQueryVariables>
    } & TChildProps;
export function withHashtags<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  HashtagsQuery,
  HashtagsQueryVariables,
  HashtagsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, HashtagsQuery, HashtagsQueryVariables, HashtagsProps<TChildProps, TDataName>>(HashtagsDocument, {
      alias: 'hashtags',
      ...operationOptions
    });
};

/**
 * __useHashtagsQuery__
 *
 * To run a query within a React component, call `useHashtagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHashtagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHashtagsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useHashtagsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HashtagsQuery, HashtagsQueryVariables>) {
        return ApolloReactHooks.useQuery<HashtagsQuery, HashtagsQueryVariables>(HashtagsDocument, baseOptions);
      }
export function useHashtagsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HashtagsQuery, HashtagsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HashtagsQuery, HashtagsQueryVariables>(HashtagsDocument, baseOptions);
        }
export type HashtagsQueryHookResult = ReturnType<typeof useHashtagsQuery>;
export type HashtagsLazyQueryHookResult = ReturnType<typeof useHashtagsLazyQuery>;
export type HashtagsQueryResult = ApolloReactCommon.QueryResult<HashtagsQuery, HashtagsQueryVariables>;
export const MerchantsDocument = gql`
    query merchants {
  merchants {
    id
    name
  }
}
    `;
export type MerchantsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MerchantsQuery, MerchantsQueryVariables>, 'query'>;

    export const MerchantsComponent = (props: MerchantsComponentProps) => (
      <ApolloReactComponents.Query<MerchantsQuery, MerchantsQueryVariables> query={MerchantsDocument} {...props} />
    );
    
export type MerchantsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MerchantsQuery, MerchantsQueryVariables>
    } & TChildProps;
export function withMerchants<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MerchantsQuery,
  MerchantsQueryVariables,
  MerchantsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MerchantsQuery, MerchantsQueryVariables, MerchantsProps<TChildProps, TDataName>>(MerchantsDocument, {
      alias: 'merchants',
      ...operationOptions
    });
};

/**
 * __useMerchantsQuery__
 *
 * To run a query within a React component, call `useMerchantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMerchantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMerchantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMerchantsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MerchantsQuery, MerchantsQueryVariables>) {
        return ApolloReactHooks.useQuery<MerchantsQuery, MerchantsQueryVariables>(MerchantsDocument, baseOptions);
      }
export function useMerchantsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MerchantsQuery, MerchantsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MerchantsQuery, MerchantsQueryVariables>(MerchantsDocument, baseOptions);
        }
export type MerchantsQueryHookResult = ReturnType<typeof useMerchantsQuery>;
export type MerchantsLazyQueryHookResult = ReturnType<typeof useMerchantsLazyQuery>;
export type MerchantsQueryResult = ApolloReactCommon.QueryResult<MerchantsQuery, MerchantsQueryVariables>;
export const AdvancedTrackingDocument = gql`
    query advancedTracking($ref: String, $showAll: Boolean, $queueName: String) {
  advancedTracking(ref: $ref, showAll: $showAll, queueName: $queueName) {
    id
    pid
    productId
    price
    description
    image
    quantity
    reference
    po
    orderDate
    invoiceDate
    purchaseDate
    merchant
    merchantId
    sku
    url
    delivered
    purchaseShipments {
      id
      status
      trackingNum
      shipmentMethod
    }
    transitShipments {
      id
      status
      trackingNum
      shipmentMethod
      to
    }
    customerShipments {
      id
      status
      trackingNum
      shipmentMethod
    }
  }
}
    `;
export type AdvancedTrackingComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AdvancedTrackingQuery, AdvancedTrackingQueryVariables>, 'query'>;

    export const AdvancedTrackingComponent = (props: AdvancedTrackingComponentProps) => (
      <ApolloReactComponents.Query<AdvancedTrackingQuery, AdvancedTrackingQueryVariables> query={AdvancedTrackingDocument} {...props} />
    );
    
export type AdvancedTrackingProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<AdvancedTrackingQuery, AdvancedTrackingQueryVariables>
    } & TChildProps;
export function withAdvancedTracking<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AdvancedTrackingQuery,
  AdvancedTrackingQueryVariables,
  AdvancedTrackingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, AdvancedTrackingQuery, AdvancedTrackingQueryVariables, AdvancedTrackingProps<TChildProps, TDataName>>(AdvancedTrackingDocument, {
      alias: 'advancedTracking',
      ...operationOptions
    });
};

/**
 * __useAdvancedTrackingQuery__
 *
 * To run a query within a React component, call `useAdvancedTrackingQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdvancedTrackingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdvancedTrackingQuery({
 *   variables: {
 *      ref: // value for 'ref'
 *      showAll: // value for 'showAll'
 *      queueName: // value for 'queueName'
 *   },
 * });
 */
export function useAdvancedTrackingQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdvancedTrackingQuery, AdvancedTrackingQueryVariables>) {
        return ApolloReactHooks.useQuery<AdvancedTrackingQuery, AdvancedTrackingQueryVariables>(AdvancedTrackingDocument, baseOptions);
      }
export function useAdvancedTrackingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdvancedTrackingQuery, AdvancedTrackingQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AdvancedTrackingQuery, AdvancedTrackingQueryVariables>(AdvancedTrackingDocument, baseOptions);
        }
export type AdvancedTrackingQueryHookResult = ReturnType<typeof useAdvancedTrackingQuery>;
export type AdvancedTrackingLazyQueryHookResult = ReturnType<typeof useAdvancedTrackingLazyQuery>;
export type AdvancedTrackingQueryResult = ApolloReactCommon.QueryResult<AdvancedTrackingQuery, AdvancedTrackingQueryVariables>;
export const AuditActivityDocument = gql`
    query auditActivity($id: ID, $type: String) {
  auditActivity(id: $id, type: $type) {
    id
    action
    object
    objectId
    state
    comment
    createdDate
    createdBy
  }
}
    `;
export type AuditActivityComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AuditActivityQuery, AuditActivityQueryVariables>, 'query'>;

    export const AuditActivityComponent = (props: AuditActivityComponentProps) => (
      <ApolloReactComponents.Query<AuditActivityQuery, AuditActivityQueryVariables> query={AuditActivityDocument} {...props} />
    );
    
export type AuditActivityProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<AuditActivityQuery, AuditActivityQueryVariables>
    } & TChildProps;
export function withAuditActivity<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AuditActivityQuery,
  AuditActivityQueryVariables,
  AuditActivityProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, AuditActivityQuery, AuditActivityQueryVariables, AuditActivityProps<TChildProps, TDataName>>(AuditActivityDocument, {
      alias: 'auditActivity',
      ...operationOptions
    });
};

/**
 * __useAuditActivityQuery__
 *
 * To run a query within a React component, call `useAuditActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuditActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuditActivityQuery({
 *   variables: {
 *      id: // value for 'id'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useAuditActivityQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuditActivityQuery, AuditActivityQueryVariables>) {
        return ApolloReactHooks.useQuery<AuditActivityQuery, AuditActivityQueryVariables>(AuditActivityDocument, baseOptions);
      }
export function useAuditActivityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuditActivityQuery, AuditActivityQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuditActivityQuery, AuditActivityQueryVariables>(AuditActivityDocument, baseOptions);
        }
export type AuditActivityQueryHookResult = ReturnType<typeof useAuditActivityQuery>;
export type AuditActivityLazyQueryHookResult = ReturnType<typeof useAuditActivityLazyQuery>;
export type AuditActivityQueryResult = ApolloReactCommon.QueryResult<AuditActivityQuery, AuditActivityQueryVariables>;
export const OrderADocument = gql`
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
    couponName
    deliveryDate
    cartId
    cartSecureKey
    customer {
      id
      firstname
      lastname
      email
      mobile
    }
    deliveryAddress {
      firstName
      lastName
      line1
      line2
      city
      mobile
    }
    items {
      id
      sequence
      productId
      productSku
      productUrl
      productName
      productMerchantId
      price
      quantity
      image
      lineTotal
      po
    }
    payments {
      id
      createdDate
      paymentMethod
      authCode
      amount
      processedDate
      settlementDate
      voided
    }
    currency
    balance
    carrier
  }
}
    `;
export type OrderAComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<OrderAQuery, OrderAQueryVariables>, 'query'>;

    export const OrderAComponent = (props: OrderAComponentProps) => (
      <ApolloReactComponents.Query<OrderAQuery, OrderAQueryVariables> query={OrderADocument} {...props} />
    );
    
export type OrderAProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<OrderAQuery, OrderAQueryVariables>
    } & TChildProps;
export function withOrderA<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  OrderAQuery,
  OrderAQueryVariables,
  OrderAProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, OrderAQuery, OrderAQueryVariables, OrderAProps<TChildProps, TDataName>>(OrderADocument, {
      alias: 'orderA',
      ...operationOptions
    });
};

/**
 * __useOrderAQuery__
 *
 * To run a query within a React component, call `useOrderAQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderAQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderAQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrderAQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OrderAQuery, OrderAQueryVariables>) {
        return ApolloReactHooks.useQuery<OrderAQuery, OrderAQueryVariables>(OrderADocument, baseOptions);
      }
export function useOrderALazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrderAQuery, OrderAQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OrderAQuery, OrderAQueryVariables>(OrderADocument, baseOptions);
        }
export type OrderAQueryHookResult = ReturnType<typeof useOrderAQuery>;
export type OrderALazyQueryHookResult = ReturnType<typeof useOrderALazyQuery>;
export type OrderAQueryResult = ApolloReactCommon.QueryResult<OrderAQuery, OrderAQueryVariables>;
export const AddPaymentDocument = gql`
    mutation addPayment($id: ID, $amount: BigDecimal, $method: String, $authCode: String, $currency: String) {
  addPayment(id: $id, amount: $amount, method: $method, authCode: $authCode, currency: $currency) {
    paymentMethod
    amount
  }
}
    `;
export type AddPaymentMutationFn = ApolloReactCommon.MutationFunction<AddPaymentMutation, AddPaymentMutationVariables>;
export type AddPaymentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddPaymentMutation, AddPaymentMutationVariables>, 'mutation'>;

    export const AddPaymentComponent = (props: AddPaymentComponentProps) => (
      <ApolloReactComponents.Mutation<AddPaymentMutation, AddPaymentMutationVariables> mutation={AddPaymentDocument} {...props} />
    );
    
export type AddPaymentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<AddPaymentMutation, AddPaymentMutationVariables>
    } & TChildProps;
export function withAddPayment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddPaymentMutation,
  AddPaymentMutationVariables,
  AddPaymentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, AddPaymentMutation, AddPaymentMutationVariables, AddPaymentProps<TChildProps, TDataName>>(AddPaymentDocument, {
      alias: 'addPayment',
      ...operationOptions
    });
};

/**
 * __useAddPaymentMutation__
 *
 * To run a mutation, you first call `useAddPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPaymentMutation, { data, loading, error }] = useAddPaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      amount: // value for 'amount'
 *      method: // value for 'method'
 *      authCode: // value for 'authCode'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useAddPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPaymentMutation, AddPaymentMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPaymentMutation, AddPaymentMutationVariables>(AddPaymentDocument, baseOptions);
      }
export type AddPaymentMutationHookResult = ReturnType<typeof useAddPaymentMutation>;
export type AddPaymentMutationResult = ApolloReactCommon.MutationResult<AddPaymentMutation>;
export type AddPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPaymentMutation, AddPaymentMutationVariables>;
export const RefundPaymentDocument = gql`
    mutation refundPayment($id: ID, $amount: BigDecimal, $authCode: String, $bankName: String, $bankAccountNumber: String, $bankOwnerName: String, $ref: Long, $paymentMethod: String, $currency: String) {
  refundPayment(id: $id, amount: $amount, ref: $ref, authCode: $authCode, bankName: $bankName, bankAccountNumber: $bankAccountNumber, bankOwnerName: $bankOwnerName, paymentMethod: $paymentMethod, currency: $currency) {
    paymentMethod
    amount
  }
}
    `;
export type RefundPaymentMutationFn = ApolloReactCommon.MutationFunction<RefundPaymentMutation, RefundPaymentMutationVariables>;
export type RefundPaymentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RefundPaymentMutation, RefundPaymentMutationVariables>, 'mutation'>;

    export const RefundPaymentComponent = (props: RefundPaymentComponentProps) => (
      <ApolloReactComponents.Mutation<RefundPaymentMutation, RefundPaymentMutationVariables> mutation={RefundPaymentDocument} {...props} />
    );
    
export type RefundPaymentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<RefundPaymentMutation, RefundPaymentMutationVariables>
    } & TChildProps;
export function withRefundPayment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RefundPaymentMutation,
  RefundPaymentMutationVariables,
  RefundPaymentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, RefundPaymentMutation, RefundPaymentMutationVariables, RefundPaymentProps<TChildProps, TDataName>>(RefundPaymentDocument, {
      alias: 'refundPayment',
      ...operationOptions
    });
};

/**
 * __useRefundPaymentMutation__
 *
 * To run a mutation, you first call `useRefundPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefundPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refundPaymentMutation, { data, loading, error }] = useRefundPaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      amount: // value for 'amount'
 *      authCode: // value for 'authCode'
 *      bankName: // value for 'bankName'
 *      bankAccountNumber: // value for 'bankAccountNumber'
 *      bankOwnerName: // value for 'bankOwnerName'
 *      ref: // value for 'ref'
 *      paymentMethod: // value for 'paymentMethod'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useRefundPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RefundPaymentMutation, RefundPaymentMutationVariables>) {
        return ApolloReactHooks.useMutation<RefundPaymentMutation, RefundPaymentMutationVariables>(RefundPaymentDocument, baseOptions);
      }
export type RefundPaymentMutationHookResult = ReturnType<typeof useRefundPaymentMutation>;
export type RefundPaymentMutationResult = ApolloReactCommon.MutationResult<RefundPaymentMutation>;
export type RefundPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<RefundPaymentMutation, RefundPaymentMutationVariables>;
export const VoidPaymentDocument = gql`
    mutation voidPayment($id: ID) {
  voidPayment(id: $id) {
    value
  }
}
    `;
export type VoidPaymentMutationFn = ApolloReactCommon.MutationFunction<VoidPaymentMutation, VoidPaymentMutationVariables>;
export type VoidPaymentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<VoidPaymentMutation, VoidPaymentMutationVariables>, 'mutation'>;

    export const VoidPaymentComponent = (props: VoidPaymentComponentProps) => (
      <ApolloReactComponents.Mutation<VoidPaymentMutation, VoidPaymentMutationVariables> mutation={VoidPaymentDocument} {...props} />
    );
    
export type VoidPaymentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<VoidPaymentMutation, VoidPaymentMutationVariables>
    } & TChildProps;
export function withVoidPayment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  VoidPaymentMutation,
  VoidPaymentMutationVariables,
  VoidPaymentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, VoidPaymentMutation, VoidPaymentMutationVariables, VoidPaymentProps<TChildProps, TDataName>>(VoidPaymentDocument, {
      alias: 'voidPayment',
      ...operationOptions
    });
};

/**
 * __useVoidPaymentMutation__
 *
 * To run a mutation, you first call `useVoidPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoidPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voidPaymentMutation, { data, loading, error }] = useVoidPaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVoidPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VoidPaymentMutation, VoidPaymentMutationVariables>) {
        return ApolloReactHooks.useMutation<VoidPaymentMutation, VoidPaymentMutationVariables>(VoidPaymentDocument, baseOptions);
      }
export type VoidPaymentMutationHookResult = ReturnType<typeof useVoidPaymentMutation>;
export type VoidPaymentMutationResult = ApolloReactCommon.MutationResult<VoidPaymentMutation>;
export type VoidPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<VoidPaymentMutation, VoidPaymentMutationVariables>;
export const PurchaseDocument = gql`
    query purchase($id: ID) {
  purchase(id: $id) {
    id
    deliveryTotal
    currency
    invoiceDate
    subtotal
    taxesTotal
    discountTotal
    total
    ref
    merchantObj {
      id
      name
    }
    purchaseItems {
      id
      productId
      sequence
      price
      quantity
      description
      orderItems {
        id
        orderId
      }
    }
  }
}
    `;
export type PurchaseComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PurchaseQuery, PurchaseQueryVariables>, 'query'>;

    export const PurchaseComponent = (props: PurchaseComponentProps) => (
      <ApolloReactComponents.Query<PurchaseQuery, PurchaseQueryVariables> query={PurchaseDocument} {...props} />
    );
    
export type PurchaseProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PurchaseQuery, PurchaseQueryVariables>
    } & TChildProps;
export function withPurchase<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PurchaseQuery,
  PurchaseQueryVariables,
  PurchaseProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PurchaseQuery, PurchaseQueryVariables, PurchaseProps<TChildProps, TDataName>>(PurchaseDocument, {
      alias: 'purchase',
      ...operationOptions
    });
};

/**
 * __usePurchaseQuery__
 *
 * To run a query within a React component, call `usePurchaseQuery` and pass it any options that fit your needs.
 * When your component renders, `usePurchaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePurchaseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePurchaseQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PurchaseQuery, PurchaseQueryVariables>) {
        return ApolloReactHooks.useQuery<PurchaseQuery, PurchaseQueryVariables>(PurchaseDocument, baseOptions);
      }
export function usePurchaseLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PurchaseQuery, PurchaseQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PurchaseQuery, PurchaseQueryVariables>(PurchaseDocument, baseOptions);
        }
export type PurchaseQueryHookResult = ReturnType<typeof usePurchaseQuery>;
export type PurchaseLazyQueryHookResult = ReturnType<typeof usePurchaseLazyQuery>;
export type PurchaseQueryResult = ApolloReactCommon.QueryResult<PurchaseQuery, PurchaseQueryVariables>;
export const PurchaseQueueDocument = gql`
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
    attributes
    merchantId
    url
  }
}
    `;
export type PurchaseQueueComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PurchaseQueueQuery, PurchaseQueueQueryVariables>, 'query'>;

    export const PurchaseQueueComponent = (props: PurchaseQueueComponentProps) => (
      <ApolloReactComponents.Query<PurchaseQueueQuery, PurchaseQueueQueryVariables> query={PurchaseQueueDocument} {...props} />
    );
    
export type PurchaseQueueProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PurchaseQueueQuery, PurchaseQueueQueryVariables>
    } & TChildProps;
export function withPurchaseQueue<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PurchaseQueueQuery,
  PurchaseQueueQueryVariables,
  PurchaseQueueProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PurchaseQueueQuery, PurchaseQueueQueryVariables, PurchaseQueueProps<TChildProps, TDataName>>(PurchaseQueueDocument, {
      alias: 'purchaseQueue',
      ...operationOptions
    });
};

/**
 * __usePurchaseQueueQuery__
 *
 * To run a query within a React component, call `usePurchaseQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `usePurchaseQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePurchaseQueueQuery({
 *   variables: {
 *   },
 * });
 */
export function usePurchaseQueueQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PurchaseQueueQuery, PurchaseQueueQueryVariables>) {
        return ApolloReactHooks.useQuery<PurchaseQueueQuery, PurchaseQueueQueryVariables>(PurchaseQueueDocument, baseOptions);
      }
export function usePurchaseQueueLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PurchaseQueueQuery, PurchaseQueueQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PurchaseQueueQuery, PurchaseQueueQueryVariables>(PurchaseQueueDocument, baseOptions);
        }
export type PurchaseQueueQueryHookResult = ReturnType<typeof usePurchaseQueueQuery>;
export type PurchaseQueueLazyQueryHookResult = ReturnType<typeof usePurchaseQueueLazyQuery>;
export type PurchaseQueueQueryResult = ApolloReactCommon.QueryResult<PurchaseQueueQuery, PurchaseQueueQueryVariables>;
export const SetProcessedDateDocument = gql`
    mutation setProcessedDate($paymentIds: [Long], $date: Date) {
  setProcessedDate(paymentIds: $paymentIds, date: $date) {
    value
  }
}
    `;
export type SetProcessedDateMutationFn = ApolloReactCommon.MutationFunction<SetProcessedDateMutation, SetProcessedDateMutationVariables>;
export type SetProcessedDateComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SetProcessedDateMutation, SetProcessedDateMutationVariables>, 'mutation'>;

    export const SetProcessedDateComponent = (props: SetProcessedDateComponentProps) => (
      <ApolloReactComponents.Mutation<SetProcessedDateMutation, SetProcessedDateMutationVariables> mutation={SetProcessedDateDocument} {...props} />
    );
    
export type SetProcessedDateProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<SetProcessedDateMutation, SetProcessedDateMutationVariables>
    } & TChildProps;
export function withSetProcessedDate<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SetProcessedDateMutation,
  SetProcessedDateMutationVariables,
  SetProcessedDateProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SetProcessedDateMutation, SetProcessedDateMutationVariables, SetProcessedDateProps<TChildProps, TDataName>>(SetProcessedDateDocument, {
      alias: 'setProcessedDate',
      ...operationOptions
    });
};

/**
 * __useSetProcessedDateMutation__
 *
 * To run a mutation, you first call `useSetProcessedDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetProcessedDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setProcessedDateMutation, { data, loading, error }] = useSetProcessedDateMutation({
 *   variables: {
 *      paymentIds: // value for 'paymentIds'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useSetProcessedDateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetProcessedDateMutation, SetProcessedDateMutationVariables>) {
        return ApolloReactHooks.useMutation<SetProcessedDateMutation, SetProcessedDateMutationVariables>(SetProcessedDateDocument, baseOptions);
      }
export type SetProcessedDateMutationHookResult = ReturnType<typeof useSetProcessedDateMutation>;
export type SetProcessedDateMutationResult = ApolloReactCommon.MutationResult<SetProcessedDateMutation>;
export type SetProcessedDateMutationOptions = ApolloReactCommon.BaseMutationOptions<SetProcessedDateMutation, SetProcessedDateMutationVariables>;
export const SetAccountingCodeDocument = gql`
    mutation setAccountingCode($paymentIds: [Long], $code: String) {
  setAccountingCode(paymentIds: $paymentIds, code: $code) {
    value
  }
}
    `;
export type SetAccountingCodeMutationFn = ApolloReactCommon.MutationFunction<SetAccountingCodeMutation, SetAccountingCodeMutationVariables>;
export type SetAccountingCodeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SetAccountingCodeMutation, SetAccountingCodeMutationVariables>, 'mutation'>;

    export const SetAccountingCodeComponent = (props: SetAccountingCodeComponentProps) => (
      <ApolloReactComponents.Mutation<SetAccountingCodeMutation, SetAccountingCodeMutationVariables> mutation={SetAccountingCodeDocument} {...props} />
    );
    
export type SetAccountingCodeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<SetAccountingCodeMutation, SetAccountingCodeMutationVariables>
    } & TChildProps;
export function withSetAccountingCode<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SetAccountingCodeMutation,
  SetAccountingCodeMutationVariables,
  SetAccountingCodeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SetAccountingCodeMutation, SetAccountingCodeMutationVariables, SetAccountingCodeProps<TChildProps, TDataName>>(SetAccountingCodeDocument, {
      alias: 'setAccountingCode',
      ...operationOptions
    });
};

/**
 * __useSetAccountingCodeMutation__
 *
 * To run a mutation, you first call `useSetAccountingCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAccountingCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAccountingCodeMutation, { data, loading, error }] = useSetAccountingCodeMutation({
 *   variables: {
 *      paymentIds: // value for 'paymentIds'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useSetAccountingCodeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetAccountingCodeMutation, SetAccountingCodeMutationVariables>) {
        return ApolloReactHooks.useMutation<SetAccountingCodeMutation, SetAccountingCodeMutationVariables>(SetAccountingCodeDocument, baseOptions);
      }
export type SetAccountingCodeMutationHookResult = ReturnType<typeof useSetAccountingCodeMutation>;
export type SetAccountingCodeMutationResult = ApolloReactCommon.MutationResult<SetAccountingCodeMutation>;
export type SetAccountingCodeMutationOptions = ApolloReactCommon.BaseMutationOptions<SetAccountingCodeMutation, SetAccountingCodeMutationVariables>;
export const SetEstimatedShipDateDocument = gql`
    mutation setEstimatedShipDate($id: Long, $date: Date) {
  setEstimatedShipDate(id: $id, date: $date) {
    value
  }
}
    `;
export type SetEstimatedShipDateMutationFn = ApolloReactCommon.MutationFunction<SetEstimatedShipDateMutation, SetEstimatedShipDateMutationVariables>;
export type SetEstimatedShipDateComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SetEstimatedShipDateMutation, SetEstimatedShipDateMutationVariables>, 'mutation'>;

    export const SetEstimatedShipDateComponent = (props: SetEstimatedShipDateComponentProps) => (
      <ApolloReactComponents.Mutation<SetEstimatedShipDateMutation, SetEstimatedShipDateMutationVariables> mutation={SetEstimatedShipDateDocument} {...props} />
    );
    
export type SetEstimatedShipDateProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<SetEstimatedShipDateMutation, SetEstimatedShipDateMutationVariables>
    } & TChildProps;
export function withSetEstimatedShipDate<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SetEstimatedShipDateMutation,
  SetEstimatedShipDateMutationVariables,
  SetEstimatedShipDateProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SetEstimatedShipDateMutation, SetEstimatedShipDateMutationVariables, SetEstimatedShipDateProps<TChildProps, TDataName>>(SetEstimatedShipDateDocument, {
      alias: 'setEstimatedShipDate',
      ...operationOptions
    });
};

/**
 * __useSetEstimatedShipDateMutation__
 *
 * To run a mutation, you first call `useSetEstimatedShipDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetEstimatedShipDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setEstimatedShipDateMutation, { data, loading, error }] = useSetEstimatedShipDateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useSetEstimatedShipDateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetEstimatedShipDateMutation, SetEstimatedShipDateMutationVariables>) {
        return ApolloReactHooks.useMutation<SetEstimatedShipDateMutation, SetEstimatedShipDateMutationVariables>(SetEstimatedShipDateDocument, baseOptions);
      }
export type SetEstimatedShipDateMutationHookResult = ReturnType<typeof useSetEstimatedShipDateMutation>;
export type SetEstimatedShipDateMutationResult = ApolloReactCommon.MutationResult<SetEstimatedShipDateMutation>;
export type SetEstimatedShipDateMutationOptions = ApolloReactCommon.BaseMutationOptions<SetEstimatedShipDateMutation, SetEstimatedShipDateMutationVariables>;
export const SetSettlementDateDocument = gql`
    mutation setSettlementDate($paymentIds: [Long], $date: Date) {
  setSettlementDate(paymentIds: $paymentIds, date: $date) {
    value
  }
}
    `;
export type SetSettlementDateMutationFn = ApolloReactCommon.MutationFunction<SetSettlementDateMutation, SetSettlementDateMutationVariables>;
export type SetSettlementDateComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SetSettlementDateMutation, SetSettlementDateMutationVariables>, 'mutation'>;

    export const SetSettlementDateComponent = (props: SetSettlementDateComponentProps) => (
      <ApolloReactComponents.Mutation<SetSettlementDateMutation, SetSettlementDateMutationVariables> mutation={SetSettlementDateDocument} {...props} />
    );
    
export type SetSettlementDateProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<SetSettlementDateMutation, SetSettlementDateMutationVariables>
    } & TChildProps;
export function withSetSettlementDate<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SetSettlementDateMutation,
  SetSettlementDateMutationVariables,
  SetSettlementDateProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SetSettlementDateMutation, SetSettlementDateMutationVariables, SetSettlementDateProps<TChildProps, TDataName>>(SetSettlementDateDocument, {
      alias: 'setSettlementDate',
      ...operationOptions
    });
};

/**
 * __useSetSettlementDateMutation__
 *
 * To run a mutation, you first call `useSetSettlementDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSettlementDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSettlementDateMutation, { data, loading, error }] = useSetSettlementDateMutation({
 *   variables: {
 *      paymentIds: // value for 'paymentIds'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useSetSettlementDateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetSettlementDateMutation, SetSettlementDateMutationVariables>) {
        return ApolloReactHooks.useMutation<SetSettlementDateMutation, SetSettlementDateMutationVariables>(SetSettlementDateDocument, baseOptions);
      }
export type SetSettlementDateMutationHookResult = ReturnType<typeof useSetSettlementDateMutation>;
export type SetSettlementDateMutationResult = ApolloReactCommon.MutationResult<SetSettlementDateMutation>;
export type SetSettlementDateMutationOptions = ApolloReactCommon.BaseMutationOptions<SetSettlementDateMutation, SetSettlementDateMutationVariables>;
export const SetShipmentStatusDocument = gql`
    mutation setShipmentStatus($id: Long, $status: ShipmentStatus) {
  setShipmentStatus(id: $id, status: $status) {
    value
  }
}
    `;
export type SetShipmentStatusMutationFn = ApolloReactCommon.MutationFunction<SetShipmentStatusMutation, SetShipmentStatusMutationVariables>;
export type SetShipmentStatusComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SetShipmentStatusMutation, SetShipmentStatusMutationVariables>, 'mutation'>;

    export const SetShipmentStatusComponent = (props: SetShipmentStatusComponentProps) => (
      <ApolloReactComponents.Mutation<SetShipmentStatusMutation, SetShipmentStatusMutationVariables> mutation={SetShipmentStatusDocument} {...props} />
    );
    
export type SetShipmentStatusProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<SetShipmentStatusMutation, SetShipmentStatusMutationVariables>
    } & TChildProps;
export function withSetShipmentStatus<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SetShipmentStatusMutation,
  SetShipmentStatusMutationVariables,
  SetShipmentStatusProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SetShipmentStatusMutation, SetShipmentStatusMutationVariables, SetShipmentStatusProps<TChildProps, TDataName>>(SetShipmentStatusDocument, {
      alias: 'setShipmentStatus',
      ...operationOptions
    });
};

/**
 * __useSetShipmentStatusMutation__
 *
 * To run a mutation, you first call `useSetShipmentStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetShipmentStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setShipmentStatusMutation, { data, loading, error }] = useSetShipmentStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useSetShipmentStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetShipmentStatusMutation, SetShipmentStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<SetShipmentStatusMutation, SetShipmentStatusMutationVariables>(SetShipmentStatusDocument, baseOptions);
      }
export type SetShipmentStatusMutationHookResult = ReturnType<typeof useSetShipmentStatusMutation>;
export type SetShipmentStatusMutationResult = ApolloReactCommon.MutationResult<SetShipmentStatusMutation>;
export type SetShipmentStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<SetShipmentStatusMutation, SetShipmentStatusMutationVariables>;
export const AddShipmentDocDocument = gql`
    mutation addShipmentDoc($id: Long, $filename: String) {
  addShipmentDoc(id: $id, filename: $filename) {
    value
  }
}
    `;
export type AddShipmentDocMutationFn = ApolloReactCommon.MutationFunction<AddShipmentDocMutation, AddShipmentDocMutationVariables>;
export type AddShipmentDocComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddShipmentDocMutation, AddShipmentDocMutationVariables>, 'mutation'>;

    export const AddShipmentDocComponent = (props: AddShipmentDocComponentProps) => (
      <ApolloReactComponents.Mutation<AddShipmentDocMutation, AddShipmentDocMutationVariables> mutation={AddShipmentDocDocument} {...props} />
    );
    
export type AddShipmentDocProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<AddShipmentDocMutation, AddShipmentDocMutationVariables>
    } & TChildProps;
export function withAddShipmentDoc<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddShipmentDocMutation,
  AddShipmentDocMutationVariables,
  AddShipmentDocProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, AddShipmentDocMutation, AddShipmentDocMutationVariables, AddShipmentDocProps<TChildProps, TDataName>>(AddShipmentDocDocument, {
      alias: 'addShipmentDoc',
      ...operationOptions
    });
};

/**
 * __useAddShipmentDocMutation__
 *
 * To run a mutation, you first call `useAddShipmentDocMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddShipmentDocMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addShipmentDocMutation, { data, loading, error }] = useAddShipmentDocMutation({
 *   variables: {
 *      id: // value for 'id'
 *      filename: // value for 'filename'
 *   },
 * });
 */
export function useAddShipmentDocMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddShipmentDocMutation, AddShipmentDocMutationVariables>) {
        return ApolloReactHooks.useMutation<AddShipmentDocMutation, AddShipmentDocMutationVariables>(AddShipmentDocDocument, baseOptions);
      }
export type AddShipmentDocMutationHookResult = ReturnType<typeof useAddShipmentDocMutation>;
export type AddShipmentDocMutationResult = ApolloReactCommon.MutationResult<AddShipmentDocMutation>;
export type AddShipmentDocMutationOptions = ApolloReactCommon.BaseMutationOptions<AddShipmentDocMutation, AddShipmentDocMutationVariables>;
export const ShipmentDocument = gql`
    query shipment($id: ID) {
  shipment(id: $id) {
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
    customerFirstName
    customerLastName
    customerId
    merchantId
    partyId
    partyName
    pkgs {
      id
      length
      width
      height
      weight
      packageType
    }
  }
}
    `;
export type ShipmentComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ShipmentQuery, ShipmentQueryVariables>, 'query'>;

    export const ShipmentComponent = (props: ShipmentComponentProps) => (
      <ApolloReactComponents.Query<ShipmentQuery, ShipmentQueryVariables> query={ShipmentDocument} {...props} />
    );
    
export type ShipmentProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ShipmentQuery, ShipmentQueryVariables>
    } & TChildProps;
export function withShipment<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ShipmentQuery,
  ShipmentQueryVariables,
  ShipmentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ShipmentQuery, ShipmentQueryVariables, ShipmentProps<TChildProps, TDataName>>(ShipmentDocument, {
      alias: 'shipment',
      ...operationOptions
    });
};

/**
 * __useShipmentQuery__
 *
 * To run a query within a React component, call `useShipmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useShipmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShipmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useShipmentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ShipmentQuery, ShipmentQueryVariables>) {
        return ApolloReactHooks.useQuery<ShipmentQuery, ShipmentQueryVariables>(ShipmentDocument, baseOptions);
      }
export function useShipmentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ShipmentQuery, ShipmentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ShipmentQuery, ShipmentQueryVariables>(ShipmentDocument, baseOptions);
        }
export type ShipmentQueryHookResult = ReturnType<typeof useShipmentQuery>;
export type ShipmentLazyQueryHookResult = ReturnType<typeof useShipmentLazyQuery>;
export type ShipmentQueryResult = ApolloReactCommon.QueryResult<ShipmentQuery, ShipmentQueryVariables>;
export const ShipmentDocsDocument = gql`
    query shipmentDocs($id: ID) {
  shipmentDocs(id: $id) {
    fileKey
  }
}
    `;
export type ShipmentDocsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ShipmentDocsQuery, ShipmentDocsQueryVariables>, 'query'>;

    export const ShipmentDocsComponent = (props: ShipmentDocsComponentProps) => (
      <ApolloReactComponents.Query<ShipmentDocsQuery, ShipmentDocsQueryVariables> query={ShipmentDocsDocument} {...props} />
    );
    
export type ShipmentDocsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ShipmentDocsQuery, ShipmentDocsQueryVariables>
    } & TChildProps;
export function withShipmentDocs<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ShipmentDocsQuery,
  ShipmentDocsQueryVariables,
  ShipmentDocsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ShipmentDocsQuery, ShipmentDocsQueryVariables, ShipmentDocsProps<TChildProps, TDataName>>(ShipmentDocsDocument, {
      alias: 'shipmentDocs',
      ...operationOptions
    });
};

/**
 * __useShipmentDocsQuery__
 *
 * To run a query within a React component, call `useShipmentDocsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShipmentDocsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShipmentDocsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useShipmentDocsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ShipmentDocsQuery, ShipmentDocsQueryVariables>) {
        return ApolloReactHooks.useQuery<ShipmentDocsQuery, ShipmentDocsQueryVariables>(ShipmentDocsDocument, baseOptions);
      }
export function useShipmentDocsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ShipmentDocsQuery, ShipmentDocsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ShipmentDocsQuery, ShipmentDocsQueryVariables>(ShipmentDocsDocument, baseOptions);
        }
export type ShipmentDocsQueryHookResult = ReturnType<typeof useShipmentDocsQuery>;
export type ShipmentDocsLazyQueryHookResult = ReturnType<typeof useShipmentDocsLazyQuery>;
export type ShipmentDocsQueryResult = ApolloReactCommon.QueryResult<ShipmentDocsQuery, ShipmentDocsQueryVariables>;
export const ShipmentItemDetailsDocument = gql`
    query shipmentItemDetails($id: ID) {
  shipmentItemDetails(id: $id) {
    id
    sequence
    quantity
    description
    shipmentId
    productId
    image
    po
  }
}
    `;
export type ShipmentItemDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ShipmentItemDetailsQuery, ShipmentItemDetailsQueryVariables>, 'query'>;

    export const ShipmentItemDetailsComponent = (props: ShipmentItemDetailsComponentProps) => (
      <ApolloReactComponents.Query<ShipmentItemDetailsQuery, ShipmentItemDetailsQueryVariables> query={ShipmentItemDetailsDocument} {...props} />
    );
    
export type ShipmentItemDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ShipmentItemDetailsQuery, ShipmentItemDetailsQueryVariables>
    } & TChildProps;
export function withShipmentItemDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ShipmentItemDetailsQuery,
  ShipmentItemDetailsQueryVariables,
  ShipmentItemDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ShipmentItemDetailsQuery, ShipmentItemDetailsQueryVariables, ShipmentItemDetailsProps<TChildProps, TDataName>>(ShipmentItemDetailsDocument, {
      alias: 'shipmentItemDetails',
      ...operationOptions
    });
};

/**
 * __useShipmentItemDetailsQuery__
 *
 * To run a query within a React component, call `useShipmentItemDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShipmentItemDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShipmentItemDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useShipmentItemDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ShipmentItemDetailsQuery, ShipmentItemDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<ShipmentItemDetailsQuery, ShipmentItemDetailsQueryVariables>(ShipmentItemDetailsDocument, baseOptions);
      }
export function useShipmentItemDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ShipmentItemDetailsQuery, ShipmentItemDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ShipmentItemDetailsQuery, ShipmentItemDetailsQueryVariables>(ShipmentItemDetailsDocument, baseOptions);
        }
export type ShipmentItemDetailsQueryHookResult = ReturnType<typeof useShipmentItemDetailsQuery>;
export type ShipmentItemDetailsLazyQueryHookResult = ReturnType<typeof useShipmentItemDetailsLazyQuery>;
export type ShipmentItemDetailsQueryResult = ApolloReactCommon.QueryResult<ShipmentItemDetailsQuery, ShipmentItemDetailsQueryVariables>;
export const PkgItemDetailsDocument = gql`
    query pkgItemDetails($id: ID) {
  pkgItemDetails(id: $id) {
    id
    sequence
    quantity
    description
    shipmentId
    productId
    image
  }
}
    `;
export type PkgItemDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PkgItemDetailsQuery, PkgItemDetailsQueryVariables>, 'query'>;

    export const PkgItemDetailsComponent = (props: PkgItemDetailsComponentProps) => (
      <ApolloReactComponents.Query<PkgItemDetailsQuery, PkgItemDetailsQueryVariables> query={PkgItemDetailsDocument} {...props} />
    );
    
export type PkgItemDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PkgItemDetailsQuery, PkgItemDetailsQueryVariables>
    } & TChildProps;
export function withPkgItemDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PkgItemDetailsQuery,
  PkgItemDetailsQueryVariables,
  PkgItemDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PkgItemDetailsQuery, PkgItemDetailsQueryVariables, PkgItemDetailsProps<TChildProps, TDataName>>(PkgItemDetailsDocument, {
      alias: 'pkgItemDetails',
      ...operationOptions
    });
};

/**
 * __usePkgItemDetailsQuery__
 *
 * To run a query within a React component, call `usePkgItemDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePkgItemDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePkgItemDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePkgItemDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PkgItemDetailsQuery, PkgItemDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<PkgItemDetailsQuery, PkgItemDetailsQueryVariables>(PkgItemDetailsDocument, baseOptions);
      }
export function usePkgItemDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PkgItemDetailsQuery, PkgItemDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PkgItemDetailsQuery, PkgItemDetailsQueryVariables>(PkgItemDetailsDocument, baseOptions);
        }
export type PkgItemDetailsQueryHookResult = ReturnType<typeof usePkgItemDetailsQuery>;
export type PkgItemDetailsLazyQueryHookResult = ReturnType<typeof usePkgItemDetailsLazyQuery>;
export type PkgItemDetailsQueryResult = ApolloReactCommon.QueryResult<PkgItemDetailsQuery, PkgItemDetailsQueryVariables>;
export const TransactionsDocument = gql`
    query transactions($paymentMethods: [String], $offset: Int, $limit: Int, $maxAmount: String, $from: Date = null, $to: Date = null, $customerId: Long = null, $accountCode: String = null, $unsettledOnly: Boolean = false) {
  transactions(paymentMethods: $paymentMethods, offset: $offset, limit: $limit, maxAmount: $maxAmount, from: $from, to: $to, customerId: $customerId, accountCode: $accountCode, unsettledOnly: $unsettledOnly) {
    total
    hasMore
    items {
      id
      paymentMethod
      orderId
      amount
      authCode
      transactionId
      cardNumber
      createdDate
      orderReference
      account
      bankAccountNumber
      bankName
      bankOwnerName
      settlementDate
      processedDate
      customer
      cartId
      invoiceNum
    }
  }
}
    `;
export type TransactionsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<TransactionsQuery, TransactionsQueryVariables>, 'query'>;

    export const TransactionsComponent = (props: TransactionsComponentProps) => (
      <ApolloReactComponents.Query<TransactionsQuery, TransactionsQueryVariables> query={TransactionsDocument} {...props} />
    );
    
export type TransactionsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<TransactionsQuery, TransactionsQueryVariables>
    } & TChildProps;
export function withTransactions<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  TransactionsQuery,
  TransactionsQueryVariables,
  TransactionsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, TransactionsQuery, TransactionsQueryVariables, TransactionsProps<TChildProps, TDataName>>(TransactionsDocument, {
      alias: 'transactions',
      ...operationOptions
    });
};

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *      paymentMethods: // value for 'paymentMethods'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      maxAmount: // value for 'maxAmount'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *      customerId: // value for 'customerId'
 *      accountCode: // value for 'accountCode'
 *      unsettledOnly: // value for 'unsettledOnly'
 *   },
 * });
 */
export function useTransactionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
        return ApolloReactHooks.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
      }
export function useTransactionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
        }
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsQueryResult = ApolloReactCommon.QueryResult<TransactionsQuery, TransactionsQueryVariables>;
export const UpdateFromDetrackDocument = gql`
    mutation updateFromDetrack($id: String) {
  updateFromDetrack(id: $id) {
    value
  }
}
    `;
export type UpdateFromDetrackMutationFn = ApolloReactCommon.MutationFunction<UpdateFromDetrackMutation, UpdateFromDetrackMutationVariables>;
export type UpdateFromDetrackComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateFromDetrackMutation, UpdateFromDetrackMutationVariables>, 'mutation'>;

    export const UpdateFromDetrackComponent = (props: UpdateFromDetrackComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateFromDetrackMutation, UpdateFromDetrackMutationVariables> mutation={UpdateFromDetrackDocument} {...props} />
    );
    
export type UpdateFromDetrackProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateFromDetrackMutation, UpdateFromDetrackMutationVariables>
    } & TChildProps;
export function withUpdateFromDetrack<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateFromDetrackMutation,
  UpdateFromDetrackMutationVariables,
  UpdateFromDetrackProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateFromDetrackMutation, UpdateFromDetrackMutationVariables, UpdateFromDetrackProps<TChildProps, TDataName>>(UpdateFromDetrackDocument, {
      alias: 'updateFromDetrack',
      ...operationOptions
    });
};

/**
 * __useUpdateFromDetrackMutation__
 *
 * To run a mutation, you first call `useUpdateFromDetrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFromDetrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFromDetrackMutation, { data, loading, error }] = useUpdateFromDetrackMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateFromDetrackMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateFromDetrackMutation, UpdateFromDetrackMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateFromDetrackMutation, UpdateFromDetrackMutationVariables>(UpdateFromDetrackDocument, baseOptions);
      }
export type UpdateFromDetrackMutationHookResult = ReturnType<typeof useUpdateFromDetrackMutation>;
export type UpdateFromDetrackMutationResult = ApolloReactCommon.MutationResult<UpdateFromDetrackMutation>;
export type UpdateFromDetrackMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateFromDetrackMutation, UpdateFromDetrackMutationVariables>;