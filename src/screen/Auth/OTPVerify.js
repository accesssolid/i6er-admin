import * as AntdComponents from 'antd'
import OTPInput from "react-otp-input"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useDynamicMutationMutation } from "../../redux/service/apiSlice"
import { Endpoints } from "../../utils/Endpoints"
import CustomToast from "../../utils/CustomToast"
import { useNavigate } from 'react-router-dom';
import { RouterKeys } from '../../Routes/RouterKeys'
import CustomButton from '../../components/CustomButton'

const OTPVerify = () => {
  const [triggerDocumentUpload, { isLoading: verifyLoading }] = useDynamicMutationMutation();
  const [resendOtpFunc] = useDynamicMutationMutation();
  const navigate = useNavigate()
  const email = useSelector((state) => state?.auth?.email)
  const [otp, setOtp] = useState('');
  const handleSendOtp = async () => {
    let payload = {
      "otp": otp,
      "email": email
    }
    try {
      const { data, error } = await triggerDocumentUpload({
        endpoint: Endpoints.AUTH.VERIFY_OTP,
        method: 'POST',
        body: payload,
      });
      if (data) {
        CustomToast('s', data?.message)
        navigate(`/${RouterKeys.AUTH.CREATE_PASSWORD}`, { replace: true })
      } else {
        CustomToast('e', error?.data?.message)
      }
    } catch (err) {
      CustomToast('e', 'An unexpected error occurred.');
    }
  }
  const resendOtp = async () => {
    setOtp('')
    let payload = {
      "email": email
    }
    try{
      const { data, error } = await resendOtpFunc({
        endpoint: Endpoints.AUTH.RESENT_OTP,
        method: 'POST',
        body: payload,
      });
      if (data?.message) {
        CustomToast('s', data?.message)
      } else {
        CustomToast('e', error?.data?.message)
      }
    }catch(err){
      CustomToast('e', 'An unexpected error occurred.');
    }
  }

  return (
    <div className='auth-main-div'>
      <div className='text-center auth-form px-0 md:px-4 py-10'>
        <AntdComponents.Typography className='titleMedium text-center text-White'>Verification</AntdComponents.Typography>
        <AntdComponents.Typography className='text-description text-center text-White leading-none mt-3'>Please enter the 4-digit verification code <br />sent on your email address.</AntdComponents.Typography>
        <div className="form_container mt-10">
          <AntdComponents.Typography className='text-start text-White text-para font-Poppins font-semibold w-300 mb-2 mx-auto'>Verification Code</AntdComponents.Typography>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            placeholder=""
            containerStyle="otp_container"
            inputStyle="otp_input_container"
            shouldAutoFocus={true}
            renderInput={(props) => <input {...props} />}
          />
          <div className="flex items-center justify-between w-300 m-auto">
            <small className='' style={{ fontWeight: 400 }}>Didn&apos;t receive the code?</small>
            <div className="flex gap-2" role="button" style={{ cursor: 'pointer' }} tabIndex={0} onClick={() => resendOtp()} onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                resendOtp();
              }
            }} >
              <AntdComponents.Typography className='text-Red font-bold'>Resend</AntdComponents.Typography>
            </div>
          </div>
          <div className="mt-10 mb-20">
            <CustomButton className='bg-Blue' isLoading={verifyLoading} onClick={() => handleSendOtp()} title='Verify and Continue' />
          </div>
        </div>
      </div>
    </div>
  )
}
export default OTPVerify