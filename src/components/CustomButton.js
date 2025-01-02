import React from 'react'
import * as AntdComponents from 'antd'

const CustomButton = ({isLoading=false,disable=false,htmlType='button',title,className,onClick=()=>{}}) => {
  return (
    <AntdComponents.Button disabled={disable} type='ghost' className={`common-button text-White ${className}`} loading={isLoading} htmlType={htmlType} onClick={onClick}>{title}</AntdComponents.Button>
  )
}

export default CustomButton
