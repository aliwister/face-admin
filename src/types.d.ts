export type Maybe<T> = T | null;
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
  id?: Maybe<Scalars['Long']>;
  sku?: Maybe<Scalars['String']>;
  upc?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['BigDecimal']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  name_ar?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  brand_ar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  description_ar?: Maybe<Scalars['String']>;
  features?: Maybe<Scalars['String']>;
  features_ar?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['BigDecimal']>;
  weight?: Maybe<Scalars['BigDecimal']>;
  shopIds?: Maybe<Array<Maybe<Scalars['Long']>>>;
  browseNode?: Maybe<Scalars['String']>;
  /** slug */
  type?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  availability?: Maybe<Scalars['Int']>;
  salePrice?: Maybe<Scalars['BigDecimal']>;
  quantity?: Maybe<Scalars['BigDecimal']>;
  ref?: Maybe<Scalars['String']>;
  discountInPercent?: Maybe<Scalars['Int']>;
};

export type Address = {
   __typename?: 'Address';
  id?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
};

export type Attribute = {
   __typename?: 'Attribute';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};


export type Cart = {
   __typename?: 'Cart';
  id: Scalars['ID'];
  secureKey?: Maybe<Scalars['String']>;
  gift?: Maybe<Scalars['Boolean']>;
  giftMessage?: Maybe<Scalars['String']>;
  /** customer: Customer, */
  cartItems?: Maybe<Array<Maybe<CartItem>>>;
};

export type CartItem = {
   __typename?: 'CartItem';
  id?: Maybe<Scalars['ID']>;
  productId?: Maybe<Scalars['Long']>;
  quantity?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  salePrice?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
};

export type CartItemInput = {
  productId?: Maybe<Scalars['Long']>;
  quantity?: Maybe<Scalars['Int']>;
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
  ref?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  secureKey?: Maybe<Scalars['String']>;
  carrier?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<LineItem>>>;
};

export type CheckoutCartInput = {
  id?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  secureKey?: Maybe<Scalars['String']>;
  /** addresses: [Address] */
  carrier?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<LineItemInput>>>;
};

export type CheckoutSession = {
   __typename?: 'CheckoutSession';
  redirectUrl?: Maybe<Scalars['String']>;
  secureKey?: Maybe<Scalars['String']>;
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
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
};


export type Gallery = {
   __typename?: 'Gallery';
  url: Scalars['String'];
};

export type LineItem = {
   __typename?: 'LineItem';
  productId?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  cost?: Maybe<Scalars['Float']>;
  subTotal?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
};

export type LineItemInput = {
  productId?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  cost?: Maybe<Scalars['Float']>;
  subTotal?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
};



export type Merchant = {
   __typename?: 'Merchant';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type MerchantProduct = {
   __typename?: 'MerchantProduct';
  id?: Maybe<Scalars['ID']>;
  sku?: Maybe<Scalars['String']>;
  upc?: Maybe<Scalars['String']>;
  ref?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['BigDecimal']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  name_ar?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  brand_ar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  description_ar?: Maybe<Scalars['String']>;
  features?: Maybe<Scalars['String']>;
  features_ar?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['BigDecimal']>;
  weight?: Maybe<Scalars['BigDecimal']>;
  /** slug */
  type?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  availability?: Maybe<Scalars['Int']>;
  salePrice?: Maybe<Scalars['BigDecimal']>;
  quantity?: Maybe<Scalars['BigDecimal']>;
  discountInPercent?: Maybe<Scalars['Int']>;
  shopIds?: Maybe<Array<Maybe<Scalars['Long']>>>;
  gallery?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type MerchantProductResponse = {
   __typename?: 'MerchantProductResponse';
  items?: Maybe<Array<Maybe<MerchantProduct>>>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type MerchantStock = {
   __typename?: 'MerchantStock';
  quantity?: Maybe<Scalars['BigDecimal']>;
  availability?: Maybe<Scalars['Int']>;
  allow_backorder?: Maybe<Scalars['Boolean']>;
  link?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['BigDecimal']>;
};

export type Message = {
   __typename?: 'Message';
  value?: Maybe<Scalars['String']>;
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
  updateCart?: Maybe<Cart>;
  setCart?: Maybe<Cart>;
  createCheckoutSession?: Maybe<CheckoutSession>;
  resetPassword?: Maybe<Scalars['String']>;
  createMerchantProduct?: Maybe<Message>;
  approveProduct?: Maybe<Product>;
  getImageUploadUrl?: Maybe<PresignedUrl>;
  importProducts?: Maybe<Message>;
  createOrder?: Maybe<Order>;
  contact?: Maybe<Message>;
  /** createOrderFromCart(cart: CartInput): Order */
  createPurchase?: Maybe<Purchase>;
  updatePurchase?: Maybe<Purchase>;
  sendPaymentSms?: Maybe<Message>;
  discountOrder?: Maybe<Order>;
  setOrderState?: Maybe<Order>;
  cancelOrder?: Maybe<Order>;
  addPayment?: Maybe<Payment>;
  sendOrderLevelEmail?: Maybe<Message>;
  sendProductLevelEmail?: Maybe<Message>;
  createCart?: Maybe<CheckoutCart>;
  editOrder?: Maybe<Order>;
  createProduct?: Maybe<Product>;
  createNewProduct?: Maybe<Product>;
  indexProduct?: Maybe<Attribute>;
  addI18n?: Maybe<ProductI18n>;
  pasLookup?: Maybe<Product>;
  addToPricingQ?: Maybe<Message>;
  createOverride?: Maybe<Product>;
  completePricingRequest?: Maybe<Message>;
  completePricingRequestAndEmail?: Maybe<Message>;
  addToElastic?: Maybe<Message>;
};


export type MutationUpdateCartArgs = {
  secureKey?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<CartItemInput>>>;
};


export type MutationSetCartArgs = {
  secureKey?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<CartItemInput>>>;
};


export type MutationCreateCheckoutSessionArgs = {
  secureKey?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<CartItemInput>>>;
};


export type MutationResetPasswordArgs = {
  email?: Maybe<Scalars['String']>;
};


export type MutationCreateMerchantProductArgs = {
  product?: Maybe<AddProductInput>;
};


export type MutationApproveProductArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type MutationGetImageUploadUrlArgs = {
  filename?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
};


export type MutationImportProductsArgs = {
  products?: Maybe<Array<Maybe<AddProductInput>>>;
  shopIds?: Maybe<Array<Maybe<Scalars['Long']>>>;
  browseNode?: Maybe<Scalars['String']>;
};


export type MutationCreateOrderArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationContactArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationCreatePurchaseArgs = {
  dto?: Maybe<PurchaseInput>;
};


export type MutationUpdatePurchaseArgs = {
  dto?: Maybe<PurchaseInput>;
  items?: Maybe<Array<Maybe<PurchaseItemInput>>>;
};


export type MutationSendPaymentSmsArgs = {
  id?: Maybe<Scalars['ID']>;
  mobile?: Maybe<Scalars['String']>;
};


export type MutationDiscountOrderArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type MutationSetOrderStateArgs = {
  id?: Maybe<Scalars['ID']>;
  state?: Maybe<OrderState>;
};


export type MutationCancelOrderArgs = {
  id?: Maybe<Scalars['ID']>;
  reason?: Maybe<Scalars['String']>;
};


export type MutationAddPaymentArgs = {
  id?: Maybe<Scalars['ID']>;
  amount?: Maybe<Scalars['BigDecimal']>;
  method?: Maybe<Scalars['String']>;
  authCode?: Maybe<Scalars['String']>;
};


export type MutationSendOrderLevelEmailArgs = {
  id?: Maybe<Scalars['ID']>;
  template?: Maybe<Scalars['String']>;
};


export type MutationSendProductLevelEmailArgs = {
  orderId?: Maybe<Scalars['ID']>;
  orderItems?: Maybe<Array<Maybe<Scalars['Long']>>>;
  template?: Maybe<Scalars['String']>;
};


export type MutationCreateCartArgs = {
  cart?: Maybe<CheckoutCartInput>;
};


export type MutationEditOrderArgs = {
  id?: Maybe<Scalars['ID']>;
  orderItems?: Maybe<Array<Maybe<OrderItemInput>>>;
  reason?: Maybe<Scalars['String']>;
};


export type MutationCreateProductArgs = {
  ref?: Maybe<Scalars['Int']>;
  parent?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  upc?: Maybe<Scalars['String']>;
  releaseDate?: Maybe<Scalars['LocalDate']>;
};


export type MutationCreateNewProductArgs = {
  product?: Maybe<ProductInput>;
};


export type MutationIndexProductArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationAddI18nArgs = {
  id?: Maybe<Scalars['Int']>;
  i18n?: Maybe<ProductI18nInput>;
};


export type MutationPasLookupArgs = {
  sku?: Maybe<Scalars['String']>;
};


export type MutationAddToPricingQArgs = {
  sku?: Maybe<Scalars['String']>;
};


export type MutationCreateOverrideArgs = {
  sku?: Maybe<Scalars['String']>;
  type?: Maybe<OverrideType>;
  override?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  lazy?: Maybe<Scalars['Boolean']>;
};


export type MutationCompletePricingRequestArgs = {
  id?: Maybe<Scalars['Long']>;
};


export type MutationCompletePricingRequestAndEmailArgs = {
  id?: Maybe<Scalars['Long']>;
};


export type MutationAddToElasticArgs = {
  id?: Maybe<Scalars['Long']>;
  sku?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  name_ar?: Maybe<Scalars['String']>;
  shops?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Order = {
   __typename?: 'Order';
  id: Scalars['ID'];
  reference?: Maybe<Scalars['String']>;
  orderState?: Maybe<OrderState>;
  invoiceDate?: Maybe<Scalars['LocalDate']>;
  deliveryDate?: Maybe<Scalars['LocalDate']>;
  customer: Customer;
  cart?: Maybe<Cart>;
  currency?: Maybe<Scalars['String']>;
  deliveryAddress: Address;
  invoiceAddress: Address;
  orderItems?: Maybe<Array<Maybe<OrderItem>>>;
  total?: Maybe<Scalars['BigDecimal']>;
  deliveryTotal?: Maybe<Scalars['BigDecimal']>;
  discountsTotal?: Maybe<Scalars['BigDecimal']>;
  subtotal?: Maybe<Scalars['BigDecimal']>;
  carrier?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['Date']>;
  payments?: Maybe<Array<Maybe<Payment>>>;
  balance?: Maybe<Scalars['BigDecimal']>;
};

export type OrderItem = {
   __typename?: 'OrderItem';
  id?: Maybe<Scalars['ID']>;
  sequence?: Maybe<Scalars['Int']>;
  productName?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['BigDecimal']>;
  comment?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['BigDecimal']>;
  unit?: Maybe<Scalars['String']>;
  lineTotal?: Maybe<Scalars['BigDecimal']>;
  productUrl?: Maybe<Scalars['String']>;
  productSku?: Maybe<Scalars['String']>;
};

export type OrderItemInput = {
  id?: Maybe<Scalars['ID']>;
  sequence?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['BigDecimal']>;
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
  id?: Maybe<Scalars['ID']>;
  paymentMethod?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['Long']>;
  amount?: Maybe<Scalars['BigDecimal']>;
  authCode?: Maybe<Scalars['String']>;
};

export type PresignedUrl = {
   __typename?: 'PresignedUrl';
  uploadUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type PricingRequest = {
   __typename?: 'PricingRequest';
  id?: Maybe<Scalars['ID']>;
  sku?: Maybe<Scalars['String']>;
  ref?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
};

export type Product = {
   __typename?: 'Product';
  id: Scalars['ID'];
  ref?: Maybe<Scalars['Long']>;
  parent?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  upc?: Maybe<Scalars['String']>;
  /** price: Price */
  image?: Maybe<Scalars['String']>;
  gallery?: Maybe<Array<Maybe<Gallery>>>;
  releaseDate?: Maybe<Scalars['LocalDate']>;
  active?: Maybe<Scalars['Boolean']>;
  similarProducts?: Maybe<Array<Maybe<Scalars['Int']>>>;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  group?: Maybe<ProductGroup>;
  condition?: Maybe<Condition>;
  isUsed?: Maybe<Scalars['Boolean']>;
  availableForOrder?: Maybe<Scalars['Boolean']>;
  weight?: Maybe<Scalars['Float']>;
  volumeWeight?: Maybe<Scalars['Float']>;
  variationDimensions?: Maybe<Array<Maybe<Scalars['String']>>>;
  variationOptions?: Maybe<Array<Maybe<VariationOption>>>;
  variationAttributes?: Maybe<Array<Maybe<Attribute>>>;
  variations?: Maybe<Array<Maybe<Variation>>>;
  price?: Maybe<Scalars['String']>;
  salePrice?: Maybe<Scalars['String']>;
  discountInPercent?: Maybe<Scalars['Float']>;
  slug?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Maybe<Category>>>;
  type?: Maybe<ProductType>;
  author?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  meta?: Maybe<Meta>;
  merchantStock?: Maybe<Array<Maybe<MerchantStock>>>;
  hours?: Maybe<Scalars['Int']>;
  availability?: Maybe<Scalars['String']>;
  features?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  features?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ProductI18nInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  features?: Maybe<Array<Maybe<Scalars['String']>>>;
  lang?: Maybe<Scalars['String']>;
};

export type ProductInput = {
  sku?: Maybe<Scalars['String']>;
  upc?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['BigDecimal']>;
  salePrice?: Maybe<Scalars['BigDecimal']>;
  /** currency: String, */
  image?: Maybe<Scalars['String']>;
  /**
   * images: [String],
   * releaseDate: LocalDate,
   * active: Boolean,
   * similarProducts: [Int],
   * url: String,
   */
  name?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  features?: Maybe<Scalars['String']>;
  name_ar?: Maybe<Scalars['String']>;
  brand_ar?: Maybe<Scalars['String']>;
  group_ar?: Maybe<Scalars['String']>;
  features_ar?: Maybe<Scalars['String']>;
  /**
   * condition: Condition,
   * isUsed: Boolean,
   * availableForOrder: Boolean,
   */
  cost?: Maybe<Scalars['BigDecimal']>;
  weight?: Maybe<Scalars['Float']>;
  availability?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
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
  id?: Maybe<Scalars['ID']>;
  purchaseItems?: Maybe<Array<Maybe<PurchaseItem>>>;
  currency?: Maybe<Scalars['String']>;
  invoiceDate?: Maybe<Scalars['LocalDate']>;
  subtotal?: Maybe<Scalars['BigDecimal']>;
  deliveryTotal?: Maybe<Scalars['BigDecimal']>;
  taxesTotal?: Maybe<Scalars['BigDecimal']>;
  discountTotal?: Maybe<Scalars['BigDecimal']>;
  total?: Maybe<Scalars['BigDecimal']>;
  merchantObj?: Maybe<Merchant>;
};

export type PurchaseInput = {
  id?: Maybe<Scalars['ID']>;
  currency?: Maybe<Scalars['String']>;
  subtotal?: Maybe<Scalars['Float']>;
  deliveryTotal?: Maybe<Scalars['Float']>;
  taxesTotal?: Maybe<Scalars['Float']>;
  discountTotal?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  deliveryAddressId?: Maybe<Scalars['Int']>;
  invoiceAddressId?: Maybe<Scalars['Int']>;
  merchantId?: Maybe<Scalars['Int']>;
  orderState?: Maybe<OrderState>;
  ref?: Maybe<Scalars['String']>;
};

export type PurchaseItem = {
   __typename?: 'PurchaseItem';
  id?: Maybe<Scalars['ID']>;
  sequence?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['BigDecimal']>;
  quantity?: Maybe<Scalars['BigDecimal']>;
  description?: Maybe<Scalars['String']>;
  orderItemId?: Maybe<Scalars['Long']>;
  orderId?: Maybe<Scalars['Long']>;
};

export type PurchaseItemInput = {
  sequence?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  orderItemId?: Maybe<Scalars['Int']>;
};

export type PurchaseQueue = {
   __typename?: 'PurchaseQueue';
  id?: Maybe<Scalars['ID']>;
  productName?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['BigDecimal']>;
  price?: Maybe<Scalars['BigDecimal']>;
  cost?: Maybe<Scalars['BigDecimal']>;
  image?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['BigDecimal']>;
  url?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['Long']>;
};

export type Query = {
   __typename?: 'Query';
  getAddresses?: Maybe<Array<Maybe<Address>>>;
  /** getAddress(addressId: Int): Address */
  me?: Maybe<Customer>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  merchantProducts?: Maybe<MerchantProductResponse>;
  /** getOrders(): [Orders] */
  orderConfirmation?: Maybe<Order>;
  orders?: Maybe<Array<Maybe<Order>>>;
  ordersA?: Maybe<Array<Maybe<Order>>>;
  orderA?: Maybe<Order>;
  purchases?: Maybe<Array<Maybe<Purchase>>>;
  purchase?: Maybe<Purchase>;
  purchaseQueue?: Maybe<Array<Maybe<PurchaseQueue>>>;
  merchants?: Maybe<Array<Maybe<Merchant>>>;
  payments?: Maybe<Array<Maybe<Payment>>>;
  product: Product;
  products: ProductResponse;
  relatedProducts: Array<Product>;
  categories: Array<Category>;
  category: Category;
  productAny?: Maybe<Product>;
  productAdmin?: Maybe<Product>;
  getProductBySku?: Maybe<Product>;
  pricingRequests?: Maybe<Array<Maybe<PricingRequest>>>;
  parentOf?: Maybe<Scalars['String']>;
};


export type QueryGetAddressesArgs = {
  customerId?: Maybe<Scalars['Int']>;
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
  ref?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
};


export type QueryOrdersArgs = {
  limit?: Maybe<Scalars['Int']>;
};


export type QueryOrdersAArgs = {
  state?: Maybe<Array<Maybe<OrderState>>>;
  limit?: Maybe<Scalars['Int']>;
  searchText?: Maybe<Scalars['String']>;
};


export type QueryOrderAArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPurchasesArgs = {
  state?: Maybe<Array<Maybe<OrderState>>>;
  limit?: Maybe<Scalars['Int']>;
  searchText?: Maybe<Scalars['String']>;
};


export type QueryPurchaseArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPaymentsArgs = {
  orderId?: Maybe<Scalars['ID']>;
};


export type QueryProductArgs = {
  slug: Scalars['String'];
};


export type QueryProductsArgs = {
  category?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  lang?: Maybe<Scalars['String']>;
};


export type QueryRelatedProductsArgs = {
  type?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
};


export type QueryCategoriesArgs = {
  type: Scalars['String'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryProductAnyArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryProductAdminArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryGetProductBySkuArgs = {
  sku?: Maybe<Scalars['String']>;
  isParent?: Maybe<Scalars['Boolean']>;
};


export type QueryParentOfArgs = {
  sku?: Maybe<Scalars['String']>;
};

export type Variation = {
   __typename?: 'Variation';
  ref: Scalars['ID'];
  variationAttributes?: Maybe<Array<Maybe<Attribute>>>;
};

export type VariationOption = {
   __typename?: 'VariationOption';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};
