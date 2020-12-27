import React from "react";

export const SHIPMENT_METHODS = [
  {value: 'DHL', label: 'DHL'},
  {value: 'Fedex', label: 'Fedex'},
  {value: 'UPS', label: 'UPS'},
  {value: 'USPS', label: 'USPS'},
  {value: 'Falcon', label: 'Falcon'},
  {value: 'Aramex', label: 'Aramex'},
  {value: 'Oman Post', label: 'Oman Post'},
  {value: 'Cargo', label: 'Cargo'},
  {value: 'Pickup', label: 'Pickup'},
  {value: 'Badals Express', label: 'Badals Express'},
];

export const RETURN_REASONS = [
  {value: 'WRONG', label: 'Wrong item received'},
  {value: 'UNWANTED', label: 'No Longer Needed'},
  {value: 'DUPLICATE', label: 'Duplicate Order made by customer'},
  {value: 'DAMAGE', label: 'Item damaged, cracked, broken'},
  {value: 'DEFECT', label: 'Defective not working'},
  {value: 'LATE', label: 'Item arrived too late'},
];


export const EDIT_REASONS = [
  {value: 'Wrong item ordered', label: 'Wrong item ordered'},
  {value: 'No Longer Needed', label: 'No Longer Needed'},
  {value: 'Duplicate', label: 'Duplicate'},
  {value: 'Damaged/Broken', label: 'Damaged/Broken'},
  {value: 'Defective not working', label: 'Defective not working'},
  {value: 'Arriving too late', label: 'Arriving too late'},
  {value: 'Cancelled by Seller', label: 'Cancelled by Seller'},
  {value: 'Voltage incompatible', label: 'Voltage incompatible'},
  {value: 'Violates customs or Badals.com policies', label: 'Violates customs or Badals.com policies'},
];

export const SHIPMENT_STATUS = [
  {value: 'PENDING', label: 'PENDING'},
  {value: 'IN_TRANSIT', label: 'IN_TRANSIT'},
  {value: 'RECEIVED', label: 'RECEIVED'},
  {value: 'DELIVERED', label: 'DELIVERED'},
  {value: 'CANCELED', label: 'CANCELED'},
  {value: 'FAILED', label: 'FAILED'},
  {value: 'PROCESSING', label: 'PROCESSING'},
  {value: 'CLOSED', label: 'CLOSED'},
];
export const PACKAGE_TYPES = [
  {value: 'BADALS14X18BAG', label: 'BADALS14X18BAG'},
  {value: 'DHLFLYER', label: 'DHLFLYER'},
  {value: 'DHLFLYERBIG', label: 'DHLFLYERBIG'},
  {value: 'BOX', label: 'BOX'},
  {value: 'TUBE', label: 'TUBE'},
  {value: 'NONSTANDARD', label: 'NONSTANDARD'},
  {value: 'BAG', label: 'BAG'},
]

export const SHIPMENT_TYPES = [
  {value: 'PURCHASE', label: 'PURCHASE'},
  {value: 'RETURN', label: 'RETURN'},
  {value: 'TRANSIT', label: 'TRANSIT'},
  {value: 'CUSTOMER', label: 'CUSTOMER'},
]
export const DRIVERS = [
  {value: 'Shabib', label: 'Shabib'},
  {value: 'Salah', label: 'Salah'},
  {value: 'Pickup', label: 'Pickup'},
]
export const USERS = [
  {value: '8782', label: 'Shabib'},
  {value: '1', label: 'Ali'},
  {value: '2649', label: 'Badals CC'},
]

export const CURRENCIES = [
  {value: 'OMR', label: 'OMR'},
  {value: 'USD', label: 'USD'},
  {value: 'GBP', label: 'GBP'},
  {value: 'AED', label: 'AED'},
  {value: 'EUR', label: 'EUR'},
  {value: 'AUD', label: 'AUD'},
  {value: 'SAR', label: 'SAR'}
]