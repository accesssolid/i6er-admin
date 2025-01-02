import React from 'react'
import * as AntdComponents from 'antd'
import { RouterKeys } from '../../Routes/RouterKeys'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Endpoints } from '../../utils/Endpoints'
import CustomToast from '../../utils/CustomToast'
import { EmailStore } from '../../redux/slices/authSlice'
import { useDynamicMutationMutation } from '../../redux/service/apiSlice'
import OutlineButton from '../../components/OutlineButton'
const ForgotPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [triggerDocumentUpload, { isLoading:loading }] = useDynamicMutationMutation();
    const handleSubmit = async (values) => {
        let payload = {
            "email": values?.email
        }
        try{
            const { data, error, } = await triggerDocumentUpload({
                endpoint: Endpoints.AUTH.FORGET_PASSWORD,
                method: 'POST',
                body: payload,
            });
            if (data) {
                CustomToast('s', data?.message)
                dispatch(EmailStore(values.email.trim()));
                navigate(`/${RouterKeys.AUTH.OTP_VERIFY}`)
            } else {
                CustomToast('e', error?.data?.message)
            }
        }catch(error){
            CustomToast('e', 'An unexpected error occurred.');
        }
    }
    return (
        <div className='auth-main-div'>
            <div className='text-center auth-form px-4 py-10'>
                <AntdComponents.Typography className='titleMedium text-center text-White'>Forgot password</AntdComponents.Typography>
                <AntdComponents.Typography className='text-description text-center text-White leading-none mt-3'>Please enter your registered email <br/>address to reset your password</AntdComponents.Typography>
                <div className="form_container mt-10">
                    <AntdComponents.Form name="Auth" initialValues={{ remember: true, }} onFinish={handleSubmit} requiredMark={false} className='mt-2' layout='vertical'>
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
                        <div className="my-14">
                            <OutlineButton className={'bg-DarkGrey'} isLoading={loading} htmlType='submit'  title='Send OTP' />
                        </div>
                    </AntdComponents.Form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
