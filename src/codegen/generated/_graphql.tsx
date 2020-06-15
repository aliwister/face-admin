import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
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
  /** Built-in java.math.BigDecimal */
  BigDecimal: any;
  /** Long type */
  Long: any;
  /** java.time.LocalDate implementation */
  LocalDate: any;
  /** java.util.Date implementation */
  Date: any;
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
  updateCart: Maybe<Cart>;
  setCart: Maybe<Cart>;
  createCheckoutSession: Maybe<CheckoutSession>;
  resetPassword: Maybe<Scalars['String']>;
  createMerchantProduct: Maybe<Message>;
  approveProduct: Maybe<Product>;
  getImageUploadUrl: Maybe<PresignedUrl>;
  importProducts: Maybe<Message>;
  createOrder: Maybe<Order>;
  contact: Maybe<Message>;
  /** createOrderFromCart(cart: CartInput): Order */
  createPurchase: Maybe<Purchase>;
  updatePurchase: Maybe<Purchase>;
  sendPaymentSms: Maybe<Message>;
  discountOrder: Maybe<Order>;
  setOrderState: Maybe<Order>;
  cancelOrder: Maybe<Order>;
  addPayment: Maybe<Payment>;
  sendOrderLevelEmail: Maybe<Message>;
  sendProductLevelEmail: Maybe<Message>;
  createCart: Maybe<CheckoutCart>;
  editOrder: Maybe<Order>;
  /** cancelOrder(id: ID): Order */
  refundPayment: Maybe<Payment>;
  createProduct: Maybe<Product>;
  createNewProduct: Maybe<Product>;
  indexProduct: Maybe<Attribute>;
  addI18n: Maybe<ProductI18n>;
  pasLookup: Maybe<Product>;
  addToPricingQ: Maybe<Message>;
  createOverride: Maybe<Product>;
  completePricingRequest: Maybe<Message>;
  completePricingRequestAndEmail: Maybe<Message>;
  addToElastic: Maybe<Message>;
};


export type MutationUpdateCartArgs = {
  secureKey: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<CartItemInput>>>;
};


export type MutationSetCartArgs = {
  secureKey: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<CartItemInput>>>;
};


export type MutationCreateCheckoutSessionArgs = {
  secureKey: Maybe<Scalars['String']>;
  items: Maybe<Array<Maybe<CartItemInput>>>;
};


export type MutationResetPasswordArgs = {
  email: Maybe<Scalars['String']>;
};


export type MutationCreateMerchantProductArgs = {
  product: Maybe<AddProductInput>;
};


export type MutationApproveProductArgs = {
  id: Maybe<Scalars['ID']>;
};


export type MutationGetImageUploadUrlArgs = {
  filename: Maybe<Scalars['String']>;
  contentType: Maybe<Scalars['String']>;
};


export type MutationImportProductsArgs = {
  products: Maybe<Array<Maybe<AddProductInput>>>;
  shopIds: Maybe<Array<Maybe<Scalars['Long']>>>;
  browseNode: Maybe<Scalars['String']>;
};


export type MutationCreateOrderArgs = {
  id: Maybe<Scalars['Int']>;
};


export type MutationContactArgs = {
  id: Maybe<Scalars['Int']>;
};


export type MutationCreatePurchaseArgs = {
  dto: Maybe<PurchaseInput>;
};


export type MutationUpdatePurchaseArgs = {
  dto: Maybe<PurchaseInput>;
  items: Maybe<Array<Maybe<PurchaseItemInput>>>;
};


export type MutationSendPaymentSmsArgs = {
  id: Maybe<Scalars['ID']>;
  mobile: Maybe<Scalars['String']>;
};


export type MutationDiscountOrderArgs = {
  id: Maybe<Scalars['ID']>;
};


export type MutationSetOrderStateArgs = {
  id: Maybe<Scalars['ID']>;
  state: Maybe<OrderState>;
};


export type MutationCancelOrderArgs = {
  id: Maybe<Scalars['ID']>;
  reason: Maybe<Scalars['String']>;
};


export type MutationAddPaymentArgs = {
  id: Maybe<Scalars['ID']>;
  amount: Maybe<Scalars['BigDecimal']>;
  method: Maybe<Scalars['String']>;
  authCode: Maybe<Scalars['String']>;
};


export type MutationSendOrderLevelEmailArgs = {
  id: Maybe<Scalars['ID']>;
  template: Maybe<Scalars['String']>;
};


export type MutationSendProductLevelEmailArgs = {
  orderId: Maybe<Scalars['ID']>;
  orderItems: Maybe<Array<Maybe<Scalars['Long']>>>;
  template: Maybe<Scalars['String']>;
};


export type MutationCreateCartArgs = {
  cart: Maybe<CheckoutCartInput>;
};


export type MutationEditOrderArgs = {
  id: Maybe<Scalars['ID']>;
  orderItems: Maybe<Array<Maybe<OrderItemInput>>>;
  reason: Maybe<Scalars['String']>;
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


export type MutationCreateProductArgs = {
  ref: Maybe<Scalars['Int']>;
  parent: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  upc: Maybe<Scalars['String']>;
  releaseDate: Maybe<Scalars['LocalDate']>;
};


export type MutationCreateNewProductArgs = {
  product: Maybe<ProductInput>;
};


export type MutationIndexProductArgs = {
  id: Maybe<Scalars['Int']>;
};


export type MutationAddI18nArgs = {
  id: Maybe<Scalars['Int']>;
  i18n: Maybe<ProductI18nInput>;
};


export type MutationPasLookupArgs = {
  sku: Maybe<Scalars['String']>;
};


export type MutationAddToPricingQArgs = {
  sku: Maybe<Scalars['String']>;
};


export type MutationCreateOverrideArgs = {
  sku: Maybe<Scalars['String']>;
  type: Maybe<OverrideType>;
  override: Maybe<Scalars['String']>;
  active: Maybe<Scalars['Boolean']>;
  lazy: Maybe<Scalars['Boolean']>;
  merchantId: Maybe<Scalars['Int']>;
};


export type MutationCompletePricingRequestArgs = {
  id: Maybe<Scalars['Long']>;
};


export type MutationCompletePricingRequestAndEmailArgs = {
  id: Maybe<Scalars['Long']>;
};


export type MutationAddToElasticArgs = {
  id: Maybe<Scalars['Long']>;
  sku: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  name_ar: Maybe<Scalars['String']>;
  shops: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Order = {
   __typename?: 'Order';
  id: Scalars['ID'];
  reference: Maybe<Scalars['String']>;
  orderState: Maybe<OrderState>;
  invoiceDate: Maybe<Scalars['LocalDate']>;
  deliveryDate: Maybe<Scalars['LocalDate']>;
  customer: Customer;
  cart: Maybe<Cart>;
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
  Cancelled = 'CANCELLED'
}

export enum OverrideType {
  Cost = 'COST',
  Weight = 'WEIGHT',
  Shipping = 'SHIPPING',
  Availability = 'AVAILABILITY',
  Condition = 'CONDITION',
  Price = 'PRICE'
}

export type Payment = {
   __typename?: 'Payment';
  id: Maybe<Scalars['ID']>;
  paymentMethod: Maybe<Scalars['String']>;
  orderId: Maybe<Scalars['Long']>;
  amount: Maybe<Scalars['BigDecimal']>;
  authCode: Maybe<Scalars['String']>;
};

export type PresignedUrl = {
   __typename?: 'PresignedUrl';
  uploadUrl: Maybe<Scalars['String']>;
  imageUrl: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
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
};

export type PurchaseItemInput = {
  id: Maybe<Scalars['Long']>;
  sequence: Maybe<Scalars['Int']>;
  price: Maybe<Scalars['Float']>;
  quantity: Maybe<Scalars['Float']>;
  description: Maybe<Scalars['String']>;
  orderItemId: Maybe<Array<Maybe<Scalars['Int']>>>;
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

export type Query = {
   __typename?: 'Query';
  getAddresses: Maybe<Array<Maybe<Address>>>;
  /** getAddress(addressId: Int): Address */
  me: Maybe<Customer>;
  customers: Maybe<Array<Maybe<Customer>>>;
  merchantProducts: Maybe<MerchantProductResponse>;
  /** getOrders(): [Orders] */
  orderConfirmation: Maybe<Order>;
  orders: Maybe<Array<Maybe<Order>>>;
  ordersA: Maybe<OrderResponse>;
  orderA: Maybe<Order>;
  purchases: Maybe<Array<Maybe<Purchase>>>;
  purchase: Maybe<Purchase>;
  purchaseQueue: Maybe<Array<Maybe<PurchaseQueue>>>;
  merchants: Maybe<Array<Maybe<Merchant>>>;
  payments: Maybe<Array<Maybe<Payment>>>;
  product: Product;
  products: ProductResponse;
  relatedProducts: Array<Product>;
  categories: Array<Category>;
  category: Category;
  productAny: Maybe<Product>;
  productAdmin: Maybe<Product>;
  getProductBySku: Maybe<Product>;
  pricingRequests: Maybe<Array<Maybe<PricingRequest>>>;
  parentOf: Maybe<Scalars['String']>;
  mws: Maybe<Product>;
  pas: Maybe<Product>;
  ebay: Maybe<Product>;
};


export type QueryGetAddressesArgs = {
  customerId: Maybe<Scalars['Int']>;
};


export type QueryMerchantProductsArgs = {
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  lang?: Maybe<Scalars['Int']>;
  imported?: Maybe<Scalars['Boolean']>;
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


export type QueryOrderAArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryPurchasesArgs = {
  state: Maybe<Array<Maybe<OrderState>>>;
  limit: Maybe<Scalars['Int']>;
  searchText: Maybe<Scalars['String']>;
};


export type QueryPurchaseArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryPaymentsArgs = {
  orderId: Maybe<Scalars['ID']>;
};


export type QueryProductArgs = {
  slug: Scalars['String'];
  cookie?: Maybe<Scalars['String']>;
};


export type QueryProductsArgs = {
  category: Maybe<Scalars['String']>;
  text: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  lang: Maybe<Scalars['String']>;
};


export type QueryRelatedProductsArgs = {
  type: Maybe<Scalars['String']>;
  slug: Scalars['String'];
};


export type QueryCategoriesArgs = {
  type: Scalars['String'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryProductAnyArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryProductAdminArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryGetProductBySkuArgs = {
  sku: Maybe<Scalars['String']>;
  isParent?: Maybe<Scalars['Boolean']>;
};


export type QueryParentOfArgs = {
  sku: Maybe<Scalars['String']>;
};


export type QueryMwsArgs = {
  sku: Maybe<Scalars['String']>;
};


export type QueryPasArgs = {
  sku: Maybe<Scalars['String']>;
};


export type QueryEbayArgs = {
  id: Maybe<Scalars['String']>;
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
    & Pick<Order, 'id' | 'reference' | 'createdDate' | 'invoiceDate' | 'total' | 'paymentMethod' | 'subtotal' | 'orderState' | 'deliveryTotal' | 'discountsTotal' | 'deliveryDate' | 'currency' | 'balance' | 'carrier'>
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
      & Pick<Payment, 'id' | 'paymentMethod' | 'authCode' | 'amount'>
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
      & Pick<PurchaseItem, 'id' | 'sequence' | 'price' | 'quantity' | 'description'>
      & { orderItems: Maybe<Array<Maybe<(
        { __typename?: 'OrderItem' }
        & Pick<OrderItem, 'id' | 'orderId'>
      )>>> }
    )>>> }
  )> }
);


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
      paymentMethod
      authCode
      amount
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