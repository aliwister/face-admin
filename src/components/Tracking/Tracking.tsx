import React from 'react';

export const Tracking = ({ trackingNum, label}) => {
  return (
    <a href={`https://track.aftership.com/${trackingNum}`} target="_blank">{label}</a>
  );
};

