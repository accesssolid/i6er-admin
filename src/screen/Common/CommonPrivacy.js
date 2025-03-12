import React from 'react'
import { useDynamicQueryQuery } from '../../redux/service/apiSlice'
import { Endpoints } from '../../utils/Endpoints'
import * as AntdComponent from 'antd';
import { QueryKeys } from '../../utils/RTKKeys';

const CommonPrivacy = () => {

  const { data, isLoading } = useDynamicQueryQuery({
    endpoint: Endpoints.COMMON.COMMON_CONTENT,
    params: {},
    key: QueryKeys.COMMON_CONTENT,
  }, { skip: false, refetchOnMountOrArgChange: true })

  const content = data?.data?.privacy_policy||''
  return (
    <div>
      {/* <AntdComponent.Image preview={false} src={STATIC_IMAGES.LOGO} alt="logo" height={75} width={'auto'} /> */}
      <AntdComponent.Spin spinning={isLoading} >
        <div className="">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </AntdComponent.Spin>
    </div>
  )
}
export default CommonPrivacy
