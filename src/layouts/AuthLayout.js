import { Image } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { STATIC_IMAGES } from '../utils/StaticImages'

const AuthLayout = () => {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <div className="">
                <Image src={STATIC_IMAGES.LOGO} preview={false} height={100} />
            </div>
                <Outlet />
        </div>
    )
}

export default AuthLayout
