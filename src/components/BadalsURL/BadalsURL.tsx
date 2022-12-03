import React from "react";

export const BadalsURL = ({merchantId, sku, children}) => {

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

        <span>{buildUrl()?<a href={buildUrl()} target="_blank"  style={{color:'red', textDecoration:'none', fontWeight: 'bold'}}>{children}</a>:<span> {children} </span>}</span>
    </>
  )

}
