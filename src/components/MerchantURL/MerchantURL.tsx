import React from "react";

export const MerchantURL = ({merchantId, sku, url, name}) => {

  const buildUrl = () => {
    if (merchantId == 1)
      return `https://www.amazon.com/dp/${sku}`;
    if (merchantId == 2)
      return `https://www.ebay.com/itm/${sku}`;
    if (merchantId == 5)
      return `https://www.amazon.co.uk/dp/${sku}`;
  }

  return (
    <>
      {url ?
        <a href={`${url}`} target="_blank">
          {name}
        </a>
        :
        <span>{buildUrl()?<a href={buildUrl()} target="_blank">{name}</a>:<span>{name}</span>}</span>
      }
    </>
  )

}
