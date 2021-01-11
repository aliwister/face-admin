import React from 'react';

export const Tracking = ({ trackingNum, label, carrier}) => {

  if (carrier && carrier.includes("DHL")) {
    return (
      <a href={`https://www.dhl.com/en/express/tracking.html?AWB=${trackingNum}`} target="_blank">{label}</a>
    );
  }
  if (carrier && carrier.includes("Fedex")) {
    return (
      <a href={`https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=${trackingNum}`}
         target="_blank">{label}</a>
    );
  }
  if (carrier && carrier.includes("Aramex")) {
    return (
      <a href={`https://www.aramex.com/om/ar/track/results?ShipmentNumber=${trackingNum}`} target="_blank">{label}</a>
    );
  }
  if (carrier && carrier.includes("UPS")) {
    return(
      <a href={`http://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=${trackingNum}`} target="_blank">{label}</a>
    );
  }

  return (
    <a href={`https://track.aftership.com/${trackingNum}`} target="_blank">{label}</a>
  );

};

