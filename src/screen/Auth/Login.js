import React from 'react'
import { RouterKeys } from '../../Routes/RouterKeys'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { NON_AUTH } from '../../utils/Endpoints'
// import CustomToast from '../../utils/CustomToast'
// import { AuthData } from '../../redux/slices/authSlice'
import { useDynamicMutationMutation } from '../../redux/service/apiSlice'
import * as AntdComponents from 'antd'
import { STATIC_IMAGES } from '../../utils/StaticImages'
import CustomToast from '../../utils/CustomToast'
import { Endpoints } from '../../utils/Endpoints'
import { useDispatch } from 'react-redux'
import { AuthData } from '../../redux/slices/authSlice'
import CustomButton from '../../components/CustomButton'
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginMutation, { isLoading }] = useDynamicMutationMutation();

    const handleSubmit = async (values) => {
        let payload = {
            "password": values.password,
            "email": values.email
        }

        let requestData = {
            endpoint: Endpoints.AUTH.LOGIN,
            method: 'POST',
            body: payload,
        };

        try {
            const { data, error } = await loginMutation(requestData);            
            if (data?.data?.token) {
                CustomToast('s', data?.message);
                dispatch(AuthData(data?.data))
                navigate(`${RouterKeys.NON_Auth.HOME}`)
            } else {
                CustomToast('e', error?.data?.message || 'Something went wrong');
            }
        } catch (err) {
            CustomToast('e', 'An unexpected error occurred.');
        }
    }
    return (
        <div className='auth-main-div'>
            <div className='text-center auth-form px-4 py-14'>
                <AntdComponents.Typography className='titleMedium text-center text-White'>Welcome Admin!</AntdComponents.Typography>
                <AntdComponents.Typography className='titleMedium text-center text-White'>Login</AntdComponents.Typography>
                <div className="form_container mt-7">
                    <AntdComponents.Form name="Auth" initialValues={{ remember: true, }} onFinish={handleSubmit} requiredMark={false} layout='vertical'>
                        <AntdComponents.Form.Item name="email" autoComplete="off"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email!',
                                },
                                {
                                    required: true,
                                    message: 'Please Enter your email!',
                                },
                            ]}>
                            <AntdComponents.Input className='input-box' placeholder='Email' />
                        </AntdComponents.Form.Item>
                        <AntdComponents.Form.Item name="password" autoComplete="off"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter password!',
                                },
                            ]}
                            extra={<div>
                                <AntdComponents.Typography className='text-end font-semibold text-White' role='button' onClick={() => navigate(`/${RouterKeys.AUTH.FORGOT_PASSWORD}`)}>Forgot password?</AntdComponents.Typography>
                            </div>}
                        >
                            <AntdComponents.Input.Password className='input-box' placeholder='Password' iconRender={(visible) => (visible ? <AntdComponents.Image role='button' src={STATIC_IMAGES.EYE_ONN} preview={false} /> : <AntdComponents.Image role='button' src={STATIC_IMAGES.EYE_OFF} preview={false} />)} />
                        </AntdComponents.Form.Item>

                        <div className="mt-14">
                            <CustomButton className={'bg-Blue'} isLoading={isLoading} htmlType='submit' title='Login' />
                        </div>
                    </AntdComponents.Form>
                </div>
            </div>
        </div>
    )
}

export default Login
