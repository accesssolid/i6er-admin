import React from 'react'
import * as AntdComponents from 'antd'
import { Link, useSearchParams } from 'react-router-dom';
import { RouterKeys } from '../../../Routes/RouterKeys';
// import OutlineButton from '../../../components/OutlineButton';
import { STATIC_IMAGES } from '../../../utils/StaticImages';
import Loader from '../../../components/Loader';
import { Endpoints } from '../../../utils/Endpoints';
import { useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import { QueryKeys } from '../../../utils/RTKKeys';
import { fileUrl } from '../../../utils/Constant';

const UserDetailView = () => {
    const breadcrumbItems = [
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.USERS}>Users</Link> },
        { title: <AntdComponents.Typography className='active'>Jennie</AntdComponents.Typography> },
    ];
    const [searchParams] = useSearchParams()
    const Id = searchParams.get('id');

    const { data, isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.USER_DETAILS,
        params: { user_id: Id },
        key: QueryKeys.USER_DETAIL,
        skip: false,
    })
    let userData = data?.data
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
                                    <div className="border-2 border-Purple bg-DarkGrey rounded-10 h-80">
                                        <div className="rounded-10 bg-Black rounded-b-10  pt-3 text-center">
                                            <AntdComponents.Typography className='titleMedium capitalize'>{userData?.name}{userData?.age&&`, ${userData?.age}`}{userData?.gender&&`, ${userData?.gender}`}</AntdComponents.Typography>
                                            <AntdComponents.Avatar src={userData?.profile_pic?.length>0?`${fileUrl}${userData?.profile_pic?.[0]}` :STATIC_IMAGES.LOGO} size={110} className='mb-[-39px] md:mb-[-50px] mt-3' />
                                        </div>
                                        <div className="bg-DarkGrey rounded-b-10 px-5 pt-8">
                                            <AntdComponents.Typography className='titleSmall'>Bio</AntdComponents.Typography>
                                            <AntdComponents.Typography className='description pt-1 pb-4 px-3 h-[133px] overflow-y-auto'>{userData?.about_me ? userData?.about_me : '---'}
                                            </AntdComponents.Typography>
                                        </div>
                                    </div>
                                </AntdComponents.Col>
                                <AntdComponents.Col xs={24} sm={24} md={24} lg={15} xl={15}>
                                    <div className="border-2 border-Purple bg-DarkGrey rounded-10 px-5 py-3 h-80 overflow-y-auto">
                                        <AntdComponents.Typography className='titleSmall'>About {userData?.name}</AntdComponents.Typography>
                                        <AntdComponents.Row gutter={[16, 16]} className='px-4'>
                                            <AntdComponents.Col xs={24} sm={8} md={8} lg={5} xl={5}>
                                                <div className="mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Name</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1 capitalize'>{userData?.name}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={8} lg={10} xl={10}>
                                                <div className="mt-0 md:mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Email</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1'>{userData?.email}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={8} lg={9} xl={9} className=''>
                                                <div className="mt-0 md:mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Community Thread Name</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1 capitalize'>{userData?.community_name?userData?.community_name:'---'}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={8} lg={5} xl={5}>
                                                <div className="mt-0 md:mt-14">
                                                    <AntdComponents.Typography className='paragraphSmall'>Location</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1 capitalize'>{userData?.location?.name?userData?.location?.name:'---'}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={8} lg={10} xl={10}>
                                                <div className="mt-0 md:mt-14">
                                                    <AntdComponents.Typography className='paragraphSmall'>Subscription</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1'>{userData?.subscription_details?.is_subscribed === 1 ? "Premium" : 'Basic'}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={8} lg={9} xl={9} className=''>
                                                <div className="mt-0 md:mt-14">
                                                    <AntdComponents.Typography className='paragraphSmall'>Sexual Orientation</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1'>{userData?.sexual_orientation?.[0]?userData?.sexual_orientation?.[0]:"---"}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                        </AntdComponents.Row>
                                    </div>
                                </AntdComponents.Col>
                            </AntdComponents.Row>
                        </div>
                        {/* section 2 */}
                        <div className="mt-8 border-2 border-Purple bg-DarkGrey rounded-10">
                            <AntdComponents.Row>
                                {/* 1st section */}
                                <AntdComponents.Col xs={24} sm={24} md={24} lg={9} xl={9}>
                                    <div className="px-5 py-5">
                                        <AntdComponents.Typography className='titleSmall'>About</AntdComponents.Typography>
                                        <div className="flex flex-wrap items-center gap-3 mt-3">
                                            <div className="about_content_tags">
                                                <AntdComponents.Avatar src={STATIC_IMAGES.USER.HEIGHT} size={20} />
                                                <AntdComponents.Typography className='description'>{userData?.height} cm</AntdComponents.Typography>
                                            </div>
                                            <div className="about_content_tags">
                                                <AntdComponents.Avatar src={STATIC_IMAGES.USER.MONOGAMY} size={20} />
                                                <AntdComponents.Typography className='description'>{userData?.relationship_type?.length > 0 ? userData?.relationship_type?.[0] : '---'}</AntdComponents.Typography>
                                            </div>
                                            <div className="about_content_tags">
                                                <AntdComponents.Avatar src={STATIC_IMAGES.USER.ALCOHOL} size={20} />
                                                <AntdComponents.Typography className='description'>{userData?.alcohol ? userData?.alcohol : '---'}</AntdComponents.Typography>
                                            </div>
                                            <div className="about_content_tags">
                                                <AntdComponents.Avatar src={STATIC_IMAGES.USER.KIDS} size={20} />
                                                <AntdComponents.Typography className='description'>{userData?.kids ? userData?.kids : '---'}</AntdComponents.Typography>
                                            </div>
                                            <div className="about_content_tags">
                                                <AntdComponents.Avatar src={STATIC_IMAGES.USER.SMOKE} size={20} />
                                                <AntdComponents.Typography className='description'>{userData?.smoke ? userData?.smoke : '---'}</AntdComponents.Typography>
                                            </div>
                                            <div className="about_content_tags">
                                                <AntdComponents.Avatar src={STATIC_IMAGES.USER.TABLETS} size={20} />
                                                <AntdComponents.Typography className='description'>{userData?.drugs ? userData?.drugs : '---'}</AntdComponents.Typography>
                                            </div>
                                        </div>

                                    </div>
                                </AntdComponents.Col>
                                {/* 2nd section */}
                                <AntdComponents.Col xs={24} sm={24} md={24} lg={9} xl={9}>
                                    <div className="px-5 py-5 lg:border-l-2 border-Purple h-full">
                                        <AntdComponents.Typography className='titleSmall'>Interest</AntdComponents.Typography>
                                        <div className="flex flex-wrap items-center gap-3 mt-3">
                                            {
                                                userData?.might_like?.length > 0 ? <>
                                                    {
                                                        userData?.might_like?.map((item, index) => {
                                                            return (
                                                                <div className="about_content_tags" key={index}>
                                                                    <AntdComponents.Typography className='description'>{item}</AntdComponents.Typography>
                                                                </div>

                                                            )
                                                        })
                                                    }
                                                </>
                                                :
                                                <AntdComponents.Typography className='titleSmall text-center w-full'>No Interest data available!</AntdComponents.Typography>
                                            }
                                        </div>
                                    </div>
                                </AntdComponents.Col>
                                {/* 3rd section */}
                                <AntdComponents.Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                    <div className="px-5 py-5 lg:border-l-2 border-Purple h-full">
                                        <AntdComponents.Typography className='titleSmall'>BY-THE-WAY</AntdComponents.Typography>
                                        <div className="mt-3 bg-Black rounded-10 max-h-20 min-h-20 overflow-y-auto p-2">
                                            <AntdComponents.Typography className='paragraph'>{userData?.btw_description}</AntdComponents.Typography>
                                            {/* <AntdComponents.Input readOnly className='input-box p-3 h-10' value={userData?.btw_description ? userData?.btw_description : '---'} /> */}
                                        </div>
                                    </div>
                                </AntdComponents.Col>
                            </AntdComponents.Row>
                        </div>
                    </>
            }
        </div>
    )
}

export default UserDetailView
