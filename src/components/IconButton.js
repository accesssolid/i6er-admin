import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const IconButton = ({ Icon, style,onClick,className }) => {
  return (
    <Button
      type="ghost"
      style={style}
      icon={Icon}
      shape="circle"
      size="large"
      onClick={onClick}
      className={className}
      
    />
  );
};

IconButton.propTypes = {
  Icon: PropTypes.node.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default IconButton;