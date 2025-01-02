import React from 'react';
import { Divider } from 'antd';

const CustomDivider = ({ type = 'horizontal', className }) => {
  return (
    <Divider
      type={type}
      className={`my-[2px] h-[2px] bg-Black ${className}`}
    />
  );
};


export default CustomDivider;