import React from 'react'
import * as AntdComponent from 'antd'
import CustomToast from '../../utils/CustomToast';
import { useDynamicMutationMutation } from '../../redux/service/apiSlice';
import { Endpoints } from '../../utils/Endpoints';
import CustomButton from '../../components/CustomButton';
import { STATIC_IMAGES } from '../../utils/StaticImages';

const DeleteAccount = () => {
  const [deleteMutation, { isLoading }] = useDynamicMutationMutation();

  const handleSubmit = async (values) => {
    let payload = {
      "password": values.password,
      "email": values.email,
      "reason": values.reason
    }

    let requestData = {
      endpoint: Endpoints.COMMON.COMMON_DELETE_ACCOUNT,
      method: 'DELETE',
      body: payload,
    };

    try {
      const { data, error } = await deleteMutation(requestData);
      if (data?.data?.token) {
        CustomToast('s', data?.message);
      } else {
        CustomToast('e', error?.data?.message || 'Something went wrong');
      }
    } catch (err) {
      CustomToast('e', 'An unexpected error occurred.');
    }
  }
  return (
    <div className='auth-main-div'>
      <div className="form_container mt-7 shadow-customShadow p-5 rounded-xl">
        <AntdComponent.Form disabled={isLoading} name="Auth" initialValues={{ remember: true, }} onFinish={handleSubmit} requiredMark={false} layout='vertical'>
          <AntdComponent.Form.Item label={<dt className='text-White'>Email</dt>} name={'email'} rules={[
            {
              type: 'email',
              message: 'Please enter a valid email!',
            },
            {
              required: true,
              message: 'Please Enter your email!',
            },
          ]}>
            <AntdComponent.Input className='input-box' />
          </AntdComponent.Form.Item>
          <AntdComponent.Form.Item label={<dt className='text-White'>Password</dt>} name={'password'} rules={[{
            type: 'password',
            message: 'Please enter password!',
          },]}>
            <AntdComponent.Input.Password className='input-box' iconRender={(visible) => (visible ? <AntdComponent.Image role='button' src={STATIC_IMAGES.EYE_ONN} preview={false} /> : <AntdComponent.Image role='button' src={STATIC_IMAGES.EYE_OFF} preview={false} />)} />
          </AntdComponent.Form.Item>
          <AntdComponent.Form.Item label={<dt className='text-White'>Reason</dt>} name={'reason'}>
            <AntdComponent.Input.TextArea className='input-box bg-White text-Black' />
          </AntdComponent.Form.Item>
          <AntdComponent.Form.Item className='flex justify-center'>
            <CustomButton className={'bg-Blue'} isLoading={isLoading} htmlType='submit' title='Delete Account' />
          </AntdComponent.Form.Item>
        </AntdComponent.Form>
      </div>
    </div>
  )
}

export default DeleteAccount
