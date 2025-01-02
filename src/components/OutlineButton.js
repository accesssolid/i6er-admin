import React from 'react'
import * as AntdComponents from 'antd'

const OutlineButton = ({ title, onClick,htmlType='button', isLoading=false,className, classNameDiv = '', prefixItem }) => {
    return (
        <div className={`border border-Pink w-full md:w-64 m-auto ${classNameDiv}`}>
            <div className={`border border-Purple`}>
                <AntdComponents.Button loading={isLoading} htmlType={htmlType} className={`common-button border-Blue rounded-none w-full h-12  text-White ${className}`} onClick={onClick}>
                    {/* {prefixItem && <span className="">{prefixItem}</span>} */}
                    {title}
                </AntdComponents.Button>
            </div>
        </div>
    )
}

export default OutlineButton
