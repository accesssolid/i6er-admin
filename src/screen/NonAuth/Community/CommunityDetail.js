import React from 'react'
import * as AntdComponents from 'antd'
import { Link, useSearchParams } from 'react-router-dom';
import { RouterKeys } from '../../../Routes/RouterKeys';
// import OutlineButton from '../../../components/OutlineButton';
import { useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import { Endpoints } from '../../../utils/Endpoints';
import { QueryKeys } from '../../../utils/RTKKeys';
import Loader from '../../../components/Loader';
import { fileUrl } from '../../../utils/Constant';
import { STATIC_IMAGES } from '../../../utils/StaticImages';
import moment from 'moment';

const CommunityDetail = () => {
    const breadcrumbItems = [
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.COMMUNITY} >Community</Link> },
        { title: <AntdComponents.Typography className='active'>Abc</AntdComponents.Typography> },
    ];
    const [searchParams] = useSearchParams()
    const Id = searchParams.get('id');

    const { data, isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.COMMUNITY_DETAIL,
        params: { community_id: Id },
        key: QueryKeys.COMMUNITY_DETAIL,
        skip: false,
    })
    let detailData = data?.data

    return (
        <div>
            <AntdComponents.Breadcrumb items={breadcrumbItems} separator={<h4 className='text-White'>/</h4>} />
            {
                isLoading ? <Loader />
                    :
                    <>
                        {/* <div className="flex justify-end mt-3 md:mt-0">
                            <div className="">
                                <OutlineButton className={'bg-Black'} title={'Deactivate Account'} />
                            </div>
                        </div> */}

                        {/* section 1 */}
                        <div className="mt-5">
                            <AntdComponents.Row gutter={[20, 20]}>
                                <AntdComponents.Col xs={24} sm={24} md={24} lg={9} xl={9}>
                                    <div className="border-2 border-Purple bg-DarkGrey rounded-10">
                                        <div className="rounded-10 bg-Black rounded-b-10  pt-3 text-center">
                                            <AntdComponents.Typography className='titleMedium'>{detailData?.name}</AntdComponents.Typography>
                                            <AntdComponents.Avatar size={110} src={detailData?.image_url ? `${fileUrl}${detailData?.image_url}` : STATIC_IMAGES.LOGO} className='mb-[-19px] md:mb-[-50px] mt-3' />
                                        </div>
                                        <div className="bg-DarkGrey rounded-b-10 px-5 pt-8">
                                            <AntdComponents.Typography className='titleSmall'>Description</AntdComponents.Typography>
                                            <AntdComponents.Typography className='description pt-1 pb-4 px-3 h-[133px] overflow-y-auto capitalize'>{detailData?.description}
                                            </AntdComponents.Typography>
                                        </div>
                                    </div>
                                </AntdComponents.Col>
                                <AntdComponents.Col xs={24} sm={24} md={24} lg={15} xl={15}>
                                    <div className="border-2 border-Purple bg-DarkGrey rounded-10 px-5 py-3 h-80 overflow-y-auto">
                                        <AntdComponents.Typography className='titleSmall capitalize'>About {detailData?.name} Community</AntdComponents.Typography>
                                        <AntdComponents.Row gutter={[16, 16]} className='px-4'>
                                            <AntdComponents.Col xs={24} sm={24} md={8} lg={10} xl={10}>
                                                <div className="mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Name</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1'>{detailData?.name}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={8} lg={4} xl={4}>
                                                <div className="mt-0 md:mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Followers</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1'>{detailData?.followers_count}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={8} lg={10} xl={10} className=''>
                                                <div className="mt-0 md:mt-3 text-end">
                                                    <AntdComponents.Typography className='paragraphSmall'>Created on</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1'>{moment(detailData?.createdAt).format('DD/MM/YYYY')}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                        </AntdComponents.Row>
                                    </div>
                                </AntdComponents.Col>
                            </AntdComponents.Row>
                        </div>
                        {/* section 2 */}
                        <div className="border-2 border-Purple bg-DarkGrey rounded-10 mt-8 px-5 py-3 min-h-60 overflow-y-auto">
                            <AntdComponents.Typography className='titleSmall'>Guidelines</AntdComponents.Typography>
                            <div className="px-4">
                                <AntdComponents.Typography className='text-White' dangerouslySetInnerHTML={{ __html: detailData?.guidelines }}>
                                </AntdComponents.Typography>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default CommunityDetail
