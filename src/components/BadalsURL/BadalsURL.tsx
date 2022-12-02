import React from "react";

export const BadalsURL = ({merchantId, sku, url, children}) => {

  const buildUrl = () => {
    if (merchantId == 1)
      return `https://www.badals.com/p/AZ/${sku}`;
/*    if (merchantId == 2)
      return `https://www.ebay.com/itm/${sku}`;
    if (merchantId == 5)
      return `https://www.amazon.co.uk/dp/${sku}`;*/
  }

  return (
    <>
      {url ?
        <a href={`${url}`} target="_blank">
          {children}
        </a>
        :
        <span>{buildUrl()?<a href={buildUrl()} target="_blank">{children}</a>:<span>{children}</span>}</span>
      }
    </>
  )

}
