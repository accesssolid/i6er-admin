import React from 'react'
import * as AntdComponents from 'antd'
import { STATIC_IMAGES } from './StaticImages'
const SuspenseLoader = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <AntdComponents.Image src={STATIC_IMAGES.LOGO} preview={false} height={80} />
    </div>
  )
}

export default SuspenseLoader
