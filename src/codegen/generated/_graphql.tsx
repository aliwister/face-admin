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
  /** java.util.Date implementation */
  Date: any;
  LocalDateTime: any;
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
};

export type Attribute = {
   __typename?: 'Attribute';
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
  slug: Maybe<Scalars['String']>;
  unit: Maybe<Scalars['String']>;
};

export type CartItemInput = {
  productId: Maybe<Scalars['Long']>;
  quantity: Maybe<Scalars['Int']>;
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

export type CheckoutCart = {
   __typename?: 'CheckoutCart';
  id: Scalars['ID'];
  ref: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  secureKey: Maybe<Scalars['String']>;
  carrier: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<LineItem>>>;
};

export type CheckoutCartInput = {
  id: Maybe<Scalars['ID']>;
  ref: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  secureKey: Maybe<Scalars['String']>;
  /** addresses: [Address] */
  carrier: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<LineItemInput>>>;
};

export type CheckoutSession = {
   __typename?: 'CheckoutSession';
  redirectUrl: Maybe<Scalars['String']>;
  secureKey: Maybe<Scalars['String']>;
};

export enum Condition {
  New = 'NEW',
  LikeNew = 'LIKE_NEW',
  VeryGood = 'VERY_GOOD',
  Good = 'GOOD',
  Fair = 'FAIR'
}

export type Customer = {
   __typename?: 'Customer';
  id: Scalars['ID'];
  firstname: Maybe<Scalars['String']>;
  lastname: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  mobile: Maybe<Scalars['String']>;
};


export type Gallery = {
   __typename?: 'Gallery';
  url: Scalars['String'];
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

export type LineItem = {
   __typename?: 'LineItem';
  productId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  image: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Float']>;
  price: Maybe<Scalars['Float']>;
  cost: Maybe<Scalars['Float']>;
  subTotal: Maybe<Scalars['Float']>;
  url: Maybe<Scalars['String']>;
};

export type LineItemInput = {
  productId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  image: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Float']>;
  price: Maybe<Scalars['Float']>;
  cost: Maybe<Scalars['Float']>;
  subTotal: Maybe<Scalars['Float']>;
  url: Maybe<Scalars['String']>;
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
};

export type MerchantProductResponse = {
   __typename?: 'MerchantProductResponse';
  items: Maybe<Array<Maybe<MerchantProduct>>>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type MerchantStock = {
   __typename?: 'MerchantStock';
  quantity: Maybe<Scalars['BigDecimal']>;
  availability: Maybe<Scalars['Int']>;
  allow_backorder: Maybe<Scalars['Boolean']>;
  link: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  price: Maybe<Scalars['BigDecimal']>;
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
  addI18n: Maybe<ProductI18n>;
  addItem: Maybe<Message>;
  addPayment: Maybe<Payment>;
  addToElastic: Maybe<Message>;
  addToPricingQ: Maybe<Message>;
  addTrackingEvent: Maybe<Message>;
  approveProduct: Maybe<Product>;
  cancelOrder: Maybe<Order>;
  cancelPurchase: Maybe<Purchase>;
  closeOrder: Maybe<Order>;
  closePurchase: Maybe<Purchase>;
  completePricingRequest: Maybe<Message>;
  completePricingRequestAndEmail: Maybe<Message>;
  contact: Maybe<Message>;
  createCart: Maybe<CheckoutCart>;
  createCheckoutSession: Maybe<CheckoutSession>;
  createMerchantProduct: Maybe<Message>;
  createNewProduct: Maybe<Product>;
  createOrder: Maybe<Order>;
  createOverride: Maybe<Product>;
  createProduct: Maybe<MerchantProduct>;
  /** createOrderFromCart(cart: CartInput): Order */
  createPurchase: Maybe<Purchase>;
  /**
   * printCode(shipmentId: Long): Message
   * savePackage(pkgId: Long, shipmentItems: [Long]): Pkg
   * scheduleShipment(id: Long, deliveryDate: LocalDate, comments: String, assignTo: String): Message
   * unAccept(shipmentAcceptanceId: Long): Message
   * unIssue(itemIssuanceId: Long) : Message
   */
  createShipment: Maybe<Shipment>;
  discountOrder: Maybe<Order>;
  editOrder: Maybe<Order>;
  getAdminFile: Maybe<PresignedUrl>;
  getAdminImageUploadUrl: Maybe<PresignedUrl>;
  getImageUploadUrl: Maybe<PresignedUrl>;
  getUploadUrl: Maybe<PresignedUrl>;
  importProducts: Maybe<Message>;
  indexProduct: Maybe<Attribute>;
  issueItem: Maybe<ItemIssuance>;
  pasLookup: Maybe<Product>;
  prepItem: Maybe<Message>;
  processAmazonShipments: Maybe<Message>;
  /** cancelOrder(id: ID): Order */
  refundPayment: Maybe<Payment>;
  removeItem: Maybe<Message>;
  resetPassword: Maybe<Scalars['String']>;
  saveShipment: Maybe<Shipment>;
  sendOrderLevelEmail: Maybe<Message>;
  sendPaymentSms: Maybe<Message>;
  sendProductLevelEmail: Maybe<Message>;
  sendToDetrack: Maybe<Message>;
  setAccountingCode: Maybe<Message>;
  setCart: Maybe<Cart>;
  setOrderState: Maybe<Order>;
  setProcessedDate: Maybe<Message>;
  setPurchaseState: Maybe<Purchase>;
  setSettlementDate: Maybe<Message>;
  setShipmentStatus: Maybe<Message>;
  unpackItem: Maybe<Message>;
  updateCart: Maybe<Cart>;
  updateFromDetrack: Maybe<Message>;
  updatePurchase: Maybe<Purchase>;
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


export type MutationAddI18nArgs = {
  id: Maybe<Scalars['Int']>;
  i18n: Maybe<ProductI18nInput>;
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


export type MutationApproveProductArgs = {
  id: Maybe<Scalars['ID']>;
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


export type MutationContactArgs = {
  id: Maybe<Scalars['Int']>;
};


export type MutationCreateCartArgs = {
  cart: Maybe<CheckoutCartInput>;
};


export type MutationCreateCheckoutSessionArgs = {
  secureKey: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<CartItemInput>>>;
};


export type MutationCreateMerchantProductArgs = {
  product: Maybe<AddProductInput>;
};


export type MutationCreateNewProductArgs = {
  product: Maybe<ProductInput>;
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


export type MutationGetUploadUrlArgs = {
  filename: Maybe<Scalars['String']>;
  contentType: Maybe<Scalars['String']>;
};


export type MutationImportProductsArgs = {
  products: Maybe<Array<Maybe<AddProductInput>>>;
  shopIds: Maybe<Array<Maybe<Scalars['Long']>>>;
  browseNode: Maybe<Scalars['String']>;
};


export type MutationIndexProductArgs = {
  id: Maybe<Scalars['Int']>;
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


export type MutationRefundPaymentArgs = {
  id: Maybe<Scalars['ID']>;
  amount: Maybe<Scalars['BigDecimal']>;
  authCode: Maybe<Scalars['String']>;
  bankName: Maybe<Scalars['String']>;
  bankAccountNumber: Maybe<Scalars['String']>;
  bankOwnerName: Maybe<Scalars['String']>;
  ref: Maybe<Scalars['Long']>;
  paymentMethod: Maybe<Scalars['String']>;
};


export type MutationRemoveItemArgs = {
  shipmentItemId: Maybe<Scalars['Long']>;
};


export type MutationResetPasswordArgs = {
  email: Maybe<Scalars['String']>;
};


export type MutationSaveShipmentArgs = {
  shipment: Maybe<ShipmentInput>;
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


export type MutationSetCartArgs = {
  secureKey: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<CartItemInput>>>;
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


export type MutationUnpackItemArgs = {
  shipmentItemId: Maybe<Scalars['Long']>;
};


export type MutationUpdateCartArgs = {
  secureKey: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<CartItemInput>>>;
};


export type MutationUpdateFromDetrackArgs = {
  id: Maybe<Scalars['String']>;
};


export type MutationUpdatePurchaseArgs = {
  dto: Maybe<PurchaseInput>;
  items: Maybe<Array<Maybe<PurchaseItemInput>>>;
};

export type Order = {
   __typename?: 'Order';
  id: Scalars['ID'];
  reference: Maybe<Scalars['String']>;
  orderState: Maybe<OrderState>;
  invoiceDate: Maybe<Scalars['LocalDate']>;
  deliveryDate: Maybe<Scalars['LocalDate']>;
  customer: Customer;
  cartId: Maybe<Scalars['Long']>;
  currency: Maybe<Scalars['String']>;
  deliveryAddress: Address;
  invoiceAddress: Address;
  orderItems: Maybe<Array<Maybe<OrderItem>>>;
  total: Maybe<Scalars['BigDecimal']>;
  deliveryTotal: Maybe<Scalars['BigDecimal']>;
  discountsTotal: Maybe<Scalars['BigDecimal']>;
  subtotal: Maybe<Scalars['BigDecimal']>;
  carrier: Maybe<Scalars['String']>;
  paymentMethod: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['Date']>;
  payments: Maybe<Array<Maybe<Payment>>>;
  balance: Maybe<Scalars['BigDecimal']>;
};

export type OrderItem = {
   __typename?: 'OrderItem';
  id: Maybe<Scalars['ID']>;
  orderId: Maybe<Scalars['Long']>;
  sequence: Maybe<Scalars['Int']>;
  productName: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Int']>;
  price: Maybe<Scalars['BigDecimal']>;
  comment: Maybe<Scalars['String']>;
  image: Maybe<Scalars['String']>;
  weight: Maybe<Scalars['BigDecimal']>;
  unit: Maybe<Scalars['String']>;
  lineTotal: Maybe<Scalars['BigDecimal']>;
  productUrl: Maybe<Scalars['String']>;
  productSku: Maybe<Scalars['String']>;
  productId: Maybe<Scalars['Long']>;
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
  settlementDate: Maybe<Scalars['String']>;
  processedDate: Maybe<Scalars['String']>;
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
  status: Maybe<Scalars['String']>;
};

export type PriceInput = {
  amount: Maybe<Scalars['BigDecimal']>;
  currency: Maybe<Scalars['String']>;
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
  salePrice: Maybe<Scalars['String']>;
  discountInPercent: Maybe<Scalars['Float']>;
  slug: Maybe<Scalars['String']>;
  categories: Maybe<Array<Maybe<Category>>>;
  type: Maybe<ProductType>;
  author: Maybe<Scalars['String']>;
  unit: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  meta: Maybe<Meta>;
  merchantStock: Maybe<Array<Maybe<MerchantStock>>>;
  hours: Maybe<Scalars['Int']>;
  availability: Maybe<Scalars['String']>;
  features: Maybe<Array<Maybe<Scalars['String']>>>;
  browseNode: Maybe<Scalars['String']>;
  inStock: Maybe<Scalars['Boolean']>;
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
};

export type ProductI18nInput = {
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  model: Maybe<Scalars['String']>;
  features: Maybe<Array<Maybe<Scalars['String']>>>;
  lang: Maybe<Scalars['String']>;
};

export type ProductInput = {
  sku: Maybe<Scalars['String']>;
  upc: Maybe<Scalars['String']>;
  price: Maybe<Scalars['BigDecimal']>;
  salePrice: Maybe<Scalars['BigDecimal']>;
  /** currency: String, */
  image: Maybe<Scalars['String']>;
  /**
   * images: [String],
   * releaseDate: LocalDate,
   * active: Boolean,
   * similarProducts: [Int],
   * url: String,
   */
  name: Maybe<Scalars['String']>;
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
};

export type ProductResponse = {
   __typename?: 'ProductResponse';
  items: Array<Product>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export enum ProductType {
  ChildrenBooks = 'CHILDREN_BOOKS',
  TeenBooks = 'TEEN_BOOKS',
  AdultBooks = 'ADULT_BOOKS'
}

export type Purchase = {
   __typename?: 'Purchase';
  id: Maybe<Scalars['ID']>;
  purchaseItems: Maybe<Array<Maybe<PurchaseItem>>>;
  currency: Maybe<Scalars['String']>;
  invoiceDate: Maybe<Scalars['LocalDate']>;
  subtotal: Maybe<Scalars['BigDecimal']>;
  deliveryTotal: Maybe<Scalars['BigDecimal']>;
  taxesTotal: Maybe<Scalars['BigDecimal']>;
  discountTotal: Maybe<Scalars['BigDecimal']>;
  total: Maybe<Scalars['BigDecimal']>;
  merchantObj: Maybe<Merchant>;
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
  purchaseId: Maybe<Scalars['Long']>;
};

export type Query = {
   __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  customers: Maybe<Array<Maybe<Customer>>>;
  ebay: Maybe<Product>;
  getAddresses: Maybe<Array<Maybe<Address>>>;
  getProductBySku: Maybe<Product>;
  /** shipmentItems(shipmentId: Long, isPackaged: boolean): [ShipmentItem] */
  inventory: Maybe<Array<Maybe<Inventory>>>;
  /** getAddress(addressId: Int): Address */
  me: Maybe<Customer>;
  merchantProducts: Maybe<MerchantProductResponse>;
  merchants: Maybe<Array<Maybe<Merchant>>>;
  mws: Maybe<Product>;
  orderA: Maybe<Order>;
  /** getOrders(): [Orders] */
  orderConfirmation: Maybe<Order>;
  orders: Maybe<Array<Maybe<Order>>>;
  ordersA: Maybe<OrderResponse>;
  outstandingQueue: Maybe<Array<Maybe<OutstandingQueue>>>;
  parentOf: Maybe<Scalars['String']>;
  pas: Maybe<Product>;
  payments: Maybe<Array<Maybe<Payment>>>;
  prepQueue: Maybe<Array<Maybe<PrepQueue>>>;
  pricingRequests: Maybe<Array<Maybe<PricingRequest>>>;
  product: Product;
  productAdmin: Maybe<Product>;
  productAny: Maybe<Product>;
  products: ProductResponse;
  purchase: Maybe<Purchase>;
  purchaseQueue: Maybe<Array<Maybe<PurchaseQueue>>>;
  purchases: Maybe<Array<Maybe<Purchase>>>;
  relatedProducts: Array<Product>;
  shipQueue: Maybe<Array<Maybe<ShipQueue>>>;
  shipQueueByCustomerId: Maybe<Array<Maybe<ShipQueue>>>;
  shipment: Maybe<Shipment>;
  shipmentItemsByTrackingNums: Maybe<Array<Maybe<ShipmentItem>>>;
  shipmentItemsCountByTrackingNums: Maybe<Array<Maybe<ShipmentItemSummary>>>;
  shipmentList: Maybe<Array<Maybe<ShipmentList>>>;
  shipments: Maybe<Array<Maybe<Shipment>>>;
  shipmentsByRef: Maybe<Array<Maybe<Shipment>>>;
  sortQueue: Maybe<Array<Maybe<SortQueue>>>;
  track: Maybe<Array<Maybe<ShipmentTrackingMap>>>;
  trackingEvents: Maybe<Array<Maybe<TrackingEvent>>>;
  transaction: Maybe<Payment>;
  transactions: Maybe<PaymentResponse>;
  unshippedPurchases: Maybe<Array<Maybe<PurchaseQueue>>>;
  unshippedQueue: Maybe<Array<Maybe<UnshippedQueue>>>;
};


export type QueryCategoriesArgs = {
  type: Scalars['String'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryEbayArgs = {
  id: Maybe<Scalars['String']>;
};


export type QueryGetAddressesArgs = {
  customerId: Maybe<Scalars['Int']>;
};


export type QueryGetProductBySkuArgs = {
  sku: Maybe<Scalars['String']>;
  isParent?: Maybe<Scalars['Boolean']>;
};


export type QueryMerchantProductsArgs = {
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  lang?: Maybe<Scalars['Int']>;
  imported?: Maybe<Scalars['Boolean']>;
};


export type QueryMwsArgs = {
  sku: Maybe<Scalars['String']>;
};


export type QueryOrderAArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryOrderConfirmationArgs = {
  ref: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type QueryOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
};


export type QueryOrdersAArgs = {
  state: Maybe<Array<Maybe<OrderState>>>;
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  searchText: Maybe<Scalars['String']>;
};


export type QueryOutstandingQueueArgs = {
  keyword: Maybe<Scalars['String']>;
};


export type QueryParentOfArgs = {
  sku: Maybe<Scalars['String']>;
};


export type QueryPasArgs = {
  sku: Maybe<Scalars['String']>;
};


export type QueryPaymentsArgs = {
  orderId: Maybe<Scalars['ID']>;
};


export type QueryPrepQueueArgs = {
  shipmentId: Maybe<Scalars['Long']>;
  keyword?: Maybe<Scalars['String']>;
};


export type QueryProductArgs = {
  slug: Scalars['String'];
  cookie?: Maybe<Scalars['String']>;
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
  limit: Maybe<Scalars['Int']>;
  searchText: Maybe<Scalars['String']>;
};


export type QueryRelatedProductsArgs = {
  type: Maybe<Scalars['String']>;
  slug: Scalars['String'];
};


export type QueryShipQueueByCustomerIdArgs = {
  customerId: Maybe<Scalars['Long']>;
};


export type QueryShipmentArgs = {
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


export type QuerySortQueueArgs = {
  keyword: Maybe<Scalars['String']>;
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
};

export type ShipmentDoc = {
   __typename?: 'ShipmentDoc';
  id: Maybe<Scalars['ID']>;
  fileKey: Maybe<Scalars['String']>;
};

export type ShipmentInput = {
  reference: Maybe<Scalars['String']>;
  trackingNum: Maybe<Scalars['String']>;
  shipmentMethod: Maybe<Scalars['String']>;
  shipmentType: Maybe<ShipmentType>;
  shipmentStatus: Maybe<ShipmentStatus>;
  merchantId: Maybe<Scalars['Long']>;
  pkgCount: Maybe<Scalars['Int']>;
  handlingInstructions: Maybe<Scalars['String']>;
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

export type ShipmentItemInput = {
  sequence: Maybe<Scalars['Int']>;
  quantity: Maybe<Scalars['BigDecimal']>;
  description: Maybe<Scalars['String']>;
  shipmentId: Maybe<Scalars['Long']>;
  productId: Maybe<Scalars['Long']>;
  image: Maybe<Scalars['String']>;
  purchaseShipments: Maybe<Array<Maybe<PurchaseShipmentInput>>>;
  from: Maybe<Scalars['Long']>;
  price: Maybe<Scalars['BigDecimal']>;
};

export type ShipmentItemSummary = {
   __typename?: 'ShipmentItemSummary';
  id: Maybe<Scalars['Int']>;
  trackingNum: Maybe<Scalars['String']>;
  total: Maybe<Scalars['Long']>;
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

export type MerchantsQueryVariables = {};


export type MerchantsQuery = (
  { __typename?: 'Query' }
  & { merchants: Maybe<Array<Maybe<(
    { __typename?: 'Merchant' }
    & Pick<Merchant, 'id' | 'name'>
  )>>> }
);

export type MerchantProductsQueryVariables = {
  type: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  text: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  lang: Maybe<Scalars['Int']>;
  imported?: Maybe<Scalars['Boolean']>;
};


export type MerchantProductsQuery = (
  { __typename?: 'Query' }
  & { merchantProducts: Maybe<(
    { __typename?: 'MerchantProductResponse' }
    & Pick<MerchantProductResponse, 'total' | 'hasMore'>
    & { items: Maybe<Array<Maybe<(
      { __typename?: 'MerchantProduct' }
      & Pick<MerchantProduct, 'id' | 'ref' | 'name' | 'brand' | 'description' | 'features' | 'name_ar' | 'brand_ar' | 'description_ar' | 'features_ar' | 'image' | 'price' | 'unit' | 'sku' | 'salePrice' | 'discountInPercent' | 'upc' | 'availability' | 'weight' | 'cost' | 'quantity' | 'shopIds' | 'browseNode' | 'browseNode_ar' | 'slug'>
    )>>> }
  )> }
);

export type OrderAQueryVariables = {
  id: Maybe<Scalars['ID']>;
};


export type OrderAQuery = (
  { __typename?: 'Query' }
  & { orderA: Maybe<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'reference' | 'createdDate' | 'invoiceDate' | 'total' | 'paymentMethod' | 'subtotal' | 'orderState' | 'deliveryTotal' | 'discountsTotal' | 'deliveryDate' | 'cartId' | 'currency' | 'balance' | 'carrier'>
    & { customer: (
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'firstname' | 'lastname' | 'email' | 'mobile'>
    ), deliveryAddress: (
      { __typename?: 'Address' }
      & Pick<Address, 'firstName' | 'lastName' | 'line1' | 'line2' | 'city' | 'mobile'>
    ), orderItems: Maybe<Array<Maybe<(
      { __typename?: 'OrderItem' }
      & Pick<OrderItem, 'id' | 'sequence' | 'productId' | 'productSku' | 'productUrl' | 'productName' | 'price' | 'quantity' | 'image' | 'lineTotal' | 'po'>
    )>>>, payments: Maybe<Array<Maybe<(
      { __typename?: 'Payment' }
      & Pick<Payment, 'id' | 'createdDate' | 'paymentMethod' | 'authCode' | 'amount' | 'processedDate'>
    )>>> }
  )> }
);

export type PurchaseQueryVariables = {
  id: Maybe<Scalars['ID']>;
};


export type PurchaseQuery = (
  { __typename?: 'Query' }
  & { purchase: Maybe<(
    { __typename?: 'Purchase' }
    & Pick<Purchase, 'id' | 'deliveryTotal' | 'currency' | 'invoiceDate' | 'subtotal' | 'taxesTotal' | 'discountTotal' | 'total'>
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

export type TransactionsQueryVariables = {
  paymentMethods: Maybe<Array<Maybe<Scalars['String']>>>;
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  maxAmount: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['Date']>;
  to?: Maybe<Scalars['Date']>;
  customerId?: Maybe<Scalars['Long']>;
  accountCode?: Maybe<Scalars['String']>;
};


export type TransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: Maybe<(
    { __typename?: 'PaymentResponse' }
    & Pick<PaymentResponse, 'total' | 'hasMore'>
    & { items: Array<(
      { __typename?: 'Payment' }
      & Pick<Payment, 'id' | 'paymentMethod' | 'orderId' | 'amount' | 'authCode' | 'transactionId' | 'cardNumber' | 'createdDate' | 'orderReference' | 'account' | 'bankAccountNumber' | 'bankName' | 'bankOwnerName' | 'settlementDate' | 'processedDate'>
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
export const MerchantProductsDocument = gql`
    query merchantProducts($type: String, $limit: Int = 12, $text: String, $offset: Int = 0, $lang: Int, $imported: Boolean = true) {
  merchantProducts(type: $type, limit: $limit, text: $text, offset: $offset, lang: $lang, imported: $imported) {
    items {
      id
      ref
      name
      brand
      description
      features
      name_ar
      brand_ar
      description_ar
      features_ar
      image
      price
      unit
      sku
      salePrice
      discountInPercent
      upc
      availability
      weight
      cost
      quantity
      shopIds
      browseNode
      browseNode_ar
      slug
    }
    total
    hasMore
  }
}
    `;
export type MerchantProductsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MerchantProductsQuery, MerchantProductsQueryVariables>, 'query'>;

    export const MerchantProductsComponent = (props: MerchantProductsComponentProps) => (
      <ApolloReactComponents.Query<MerchantProductsQuery, MerchantProductsQueryVariables> query={MerchantProductsDocument} {...props} />
    );
    
export type MerchantProductsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MerchantProductsQuery, MerchantProductsQueryVariables>
    } & TChildProps;
export function withMerchantProducts<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MerchantProductsQuery,
  MerchantProductsQueryVariables,
  MerchantProductsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MerchantProductsQuery, MerchantProductsQueryVariables, MerchantProductsProps<TChildProps, TDataName>>(MerchantProductsDocument, {
      alias: 'merchantProducts',
      ...operationOptions
    });
};

/**
 * __useMerchantProductsQuery__
 *
 * To run a query within a React component, call `useMerchantProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMerchantProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMerchantProductsQuery({
 *   variables: {
 *      type: // value for 'type'
 *      limit: // value for 'limit'
 *      text: // value for 'text'
 *      offset: // value for 'offset'
 *      lang: // value for 'lang'
 *      imported: // value for 'imported'
 *   },
 * });
 */
export function useMerchantProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MerchantProductsQuery, MerchantProductsQueryVariables>) {
        return ApolloReactHooks.useQuery<MerchantProductsQuery, MerchantProductsQueryVariables>(MerchantProductsDocument, baseOptions);
      }
export function useMerchantProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MerchantProductsQuery, MerchantProductsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MerchantProductsQuery, MerchantProductsQueryVariables>(MerchantProductsDocument, baseOptions);
        }
export type MerchantProductsQueryHookResult = ReturnType<typeof useMerchantProductsQuery>;
export type MerchantProductsLazyQueryHookResult = ReturnType<typeof useMerchantProductsLazyQuery>;
export type MerchantProductsQueryResult = ApolloReactCommon.QueryResult<MerchantProductsQuery, MerchantProductsQueryVariables>;
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
    deliveryDate
    cartId
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
    orderItems {
      id
      sequence
      productId
      productSku
      productUrl
      productName
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
export const TransactionsDocument = gql`
    query transactions($paymentMethods: [String], $offset: Int, $limit: Int, $maxAmount: String, $from: Date = null, $to: Date = null, $customerId: Long = null, $accountCode: String = null) {
  transactions(paymentMethods: $paymentMethods, offset: $offset, limit: $limit, maxAmount: $maxAmount, from: $from, to: $to, customerId: $customerId, accountCode: $accountCode) {
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