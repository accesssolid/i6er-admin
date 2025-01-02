import React from 'react'
import { RouterKeys } from '../../Routes/RouterKeys'
import { useNavigate } from 'react-router-dom'
import { Endpoints } from '../../utils/Endpoints'
import CustomToast from '../../utils/CustomToast'
import { useDynamicMutationMutation } from '../../redux/service/apiSlice'
import * as AntdComponents from 'antd'
import { STATIC_IMAGES } from '../../utils/StaticImages'
import OutlineButton from '../../components/OutlineButton'
import { useSelector } from 'react-redux'
const NewPassword = () => {
    const email = useSelector((state) => state?.auth?.email)
    console.log('emailemail',email);
    
    const navigate = useNavigate()
    const [triggerDocumentUpload, { isLoading }] = useDynamicMutationMutation();

    const handleSubmit = async (values) => {
        if(values.password===values?.confirm_password){
            let payload = {
                "new_password": values?.password,
                'email':email
            }
            try{
                const { data, error } = await triggerDocumentUpload({
                    endpoint: Endpoints.AUTH.RESET_PASSWORD,
                    method: 'POST',
                    body: payload,
                });
                if (data) {
                    CustomToast('s', data?.message)
                    navigate(`${RouterKeys.AUTH.LOGIN}`)
                } else {
                    CustomToast('e', error?.data?.message || 'Login failed')
                }
            }catch(error){
                CustomToast('e', 'An unexpected error occurred.');
            }
        }else{
            CustomToast('e', 'Password not matched!');
        }
    }
    return (
        <div className='auth-main-div'>
            <div className='text-center auth-form px-4 py-8'>
                <AntdComponents.Typography className='titleMedium text-center text-White'>New Password</AntdComponents.Typography>
                <AntdComponents.Typography className='text-descriptionSmall text-center text-White leading-none mt-3'>Please enter new password</AntdComponents.Typography>
                <div className="form_container mt-7">
                    <AntdComponents.Form name="Auth" initialValues={{ remember: true, }} onFinish={handleSubmit} requiredMark={false} className='mt-2' layout='vertical'>
                        <AntdComponents.Form.Item name="password" autoComplete="off"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter password!',
                                },
                            ]}
                        >
                            <AntdComponents.Input.Password className='input-box' placeholder='New Password' iconRender={(visible) => (visible ? <AntdComponents.Image role='button' src={STATIC_IMAGES.EYE_ONN} preview={false} /> : <AntdComponents.Image role='button' src={STATIC_IMAGES.EYE_OFF} preview={false} />)} />
                        </AntdComponents.Form.Item>
                        <AntdComponents.Form.Item name="confirm_password" autoComplete="off"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter password!',
                                },
                            ]}
                        >
                            <AntdComponents.Input.Password className='input-box' placeholder='Confirm Password' iconRender={(visible) => (visible ? <AntdComponents.Image role='button' src={STATIC_IMAGES.EYE_ONN} preview={false} /> : <AntdComponents.Image role='button' src={STATIC_IMAGES.EYE_OFF} preview={false} />)} />
                        </AntdComponents.Form.Item>

                        <div className="mt-14 mb-8">
                            <OutlineButton className={'bg-DarkGrey'} isLoading={isLoading} htmlType='submit' title='Create new password' />
                        </div>
                    </AntdComponents.Form>
                </div>
            </div>
        </div>
    )
}

export default NewPassword
