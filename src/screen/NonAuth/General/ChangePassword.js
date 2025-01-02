import React from 'react'
import { Endpoints } from '../../../utils/Endpoints'
import CustomToast from '../../../utils/CustomToast'
import { useDynamicMutationMutation } from '../../../redux/service/apiSlice'
import * as AntdComponents from 'antd'
import { STATIC_IMAGES } from '../../../utils/StaticImages'
import OutlineButton from '../../../components/OutlineButton'

const ChangePassword = () => {
    const [form] = AntdComponents.Form.useForm()
    const [triggerDocumentUpload, { isLoading }] = useDynamicMutationMutation();

    const handleSubmit = async (values) => {
        if (values.password === values?.confirm_password) {
            let payload = {
                "new_password": values?.password,
                "old_password":values?.old_password
            }
            try {
                const { data, error } = await triggerDocumentUpload({
                    endpoint: Endpoints.NON_AUTH.CHANGE_PASSWORD,
                    method: 'POST',
                    body: payload,
                });
                if (data) {
                    CustomToast('s', data?.message)
                    form.resetFields()
                } else {
                    CustomToast('e', error?.data?.message )
                }
            } catch (error) {
                CustomToast('e', 'An unexpected error occurred.');
            }
        } else {
            CustomToast('e', 'New and confirm password not matched!');
        }
    }
    return (
        <div className='flex items-center justify-center'>
            <div className='text-center auth-form px-4 py-8'>
                <AntdComponents.Typography className='titleMedium text-center text-White'>Change Password</AntdComponents.Typography>
                <div className="form_container mt-7">
                    <AntdComponents.Form form={form} name="Auth" initialValues={{ remember: true, }} onFinish={handleSubmit} requiredMark={false} className='mt-2' layout='vertical'>
                        <AntdComponents.Form.Item name="old_password" autoComplete="off"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter password!',
                                },
                            ]}
                        >
                            <AntdComponents.Input.Password className='input-box' placeholder='Old Password' iconRender={(visible) => (visible ? <AntdComponents.Image role='button' src={STATIC_IMAGES.EYE_ONN} preview={false} /> : <AntdComponents.Image role='button' src={STATIC_IMAGES.EYE_OFF} preview={false} />)} />
                        </AntdComponents.Form.Item>
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

                        <div className="mt-14 mb-3">
                            <OutlineButton className={'bg-DarkGrey'} isLoading={isLoading} htmlType='submit' title='Save' />
                        </div>
                    </AntdComponents.Form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
