import React from 'react'
import * as AntdComponents from 'antd'
import { Link, useSearchParams } from 'react-router-dom';
import { RouterKeys } from '../../../Routes/RouterKeys';
import Loader from '../../../components/Loader';
import { Endpoints } from '../../../utils/Endpoints';
import { useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import { QueryKeys } from '../../../utils/RTKKeys';
import CustomTable from '../../../components/CustomTable';

const UserDetailView = () => {
    const breadcrumbItems = [
        { title: <Link className='un_active text-Red' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <Link className='un_active text-Red' to={RouterKeys.NON_Auth.USERS}>Users</Link> },
        { title: <AntdComponents.Typography className='active'>Jennie</AntdComponents.Typography> },
    ];
    const [searchParams] = useSearchParams()
    const Id = searchParams.get('id');

    const { data, isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.USER_DETAILS,
        params: { user_id: Id },
        key: QueryKeys.USER_DETAIL,
    },{skip:false,refetchOnMountOrArgChange:true}
)
    let userData = data?.data

    // contact column
    const contactColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (name) => <AntdComponents.Typography className='table_row_data'>{name ? name : "---"}</AntdComponents.Typography>,
            key: 'name',
            minWidth: 250,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => <AntdComponents.Typography className='font-bold text-White'>{email ? email : "---"}</AntdComponents.Typography>,
            minWidth: 250,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => <AntdComponents.Typography className='table_row_data'>{phone ? phone : "---"}</AntdComponents.Typography>,
            minWidth: 180,
        },
    ];
    // medications column
    const medicationColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (name) => <AntdComponents.Typography className='table_row_data'>{name ? name : "---"}</AntdComponents.Typography>,
            key: 'name',
            minWidth: 250,
        },
        {
            title: 'Dose',
            dataIndex: 'dose',
            key: 'dose',
            render: (dose) => <AntdComponents.Typography className='font-bold text-White'>{dose ? dose : "---"}</AntdComponents.Typography>,
            minWidth: 250,
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
            render: (reason) => <AntdComponents.Typography className='table_row_data'>{reason ? reason : "---"}</AntdComponents.Typography>,
            minWidth: 180,
        },
    ];
    return (
        <div>
            <AntdComponents.Breadcrumb items={breadcrumbItems} separator={<h4 className='text-White'>/</h4>} />
            {
                isLoading ? <Loader />
                    :
                    <>
                        {/* section 1 */}
                        <div className="mt-5 border-2 border-Blue bg-DarkGrey rounded-10 px-5">
                            <AntdComponents.Row gutter={[20, 20]}>
                                {/* <AntdComponents.Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <div className="border-2 border-Blue bg-DarkGrey rounded-10 px-5 py-3 min-h-80 overflow-y-auto">
                                        <AntdComponents.Typography className='titleSmall'>About {userData?.name}</AntdComponents.Typography>
                                        <AntdComponents.Row gutter={[16, 16]} className='px-4'>
                                            <AntdComponents.Col xs={24} sm={8} md={12} lg={12} xl={12}>
                                                <div className="mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Name</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1 capitalize'>{userData?.first_name} {userData?.last_name}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <div className="mt-0 md:mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Email</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1'>{userData?.email}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={12} lg={12} xl={12} className=''>
                                                <div className="mt-0 md:mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Display Name</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1 capitalize'>{userData?.display_name ? userData?.display_name : '---'}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <div className="mt-0 md:mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Blood Group</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1 capitalize'>{userData?.blood_group ? userData?.blood_group : '---'}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={12} lg={24} xl={24} className='mt-5'>
                                                <AntdComponents.Typography className='titleSmall'>Allergies</AntdComponents.Typography>
                                                <div className="flex flex-wrap items-center gap-3 mt-3">
                                                    {
                                                        userData?.allergies?.map((item, index) => {
                                                            return (
                                                                <div className="about_content_tags" key={index}>
                                                                    <AntdComponents.Typography className='description'>{item?.name ?<>{item?.name} {userData?.allergies?.length>1&&','}</> : '---'}</AntdComponents.Typography>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </AntdComponents.Col>
                                        </AntdComponents.Row>
                                    </div>
                                </AntdComponents.Col> */}
                                {/* 1st section */}
                                <AntdComponents.Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <div className="px-5 py-5">
                                        <AntdComponents.Typography className='titleSmall'>About</AntdComponents.Typography>
                                        <AntdComponents.Row gutter={[16, 16]} className='px-4'>
                                            <AntdComponents.Col xs={24} sm={8} md={12} lg={12} xl={12}>
                                                <div className="mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Name</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1 capitalize'>{userData?.first_name} {userData?.last_name}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <div className="mt-0 md:mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Email</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1'>{userData?.email}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={12} lg={12} xl={12} className=''>
                                                <div className="mt-0 md:mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Display Name</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1 capitalize'>{userData?.display_name ? userData?.display_name : '---'}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                            <AntdComponents.Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <div className="mt-0 md:mt-3">
                                                    <AntdComponents.Typography className='paragraphSmall'>Blood Group</AntdComponents.Typography>
                                                    <AntdComponents.Typography className='paragraphSmall font-semibold mt-1 capitalize'>{userData?.blood_group ? userData?.blood_group : '---'}</AntdComponents.Typography>
                                                </div>
                                            </AntdComponents.Col>
                                        </AntdComponents.Row>

                                    </div>
                                </AntdComponents.Col>
                                {/* 2nd section */}
                                <AntdComponents.Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <div className="px-5 py-5 lg:border-l-2 border-Blue h-full">
                                        <AntdComponents.Typography className='titleSmall'>Allergies</AntdComponents.Typography>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="flex flex-wrap items-center gap-3 mt-3">
                                                {
                                                    userData?.allergies?.map((item, index) => {
                                                        return (
                                                            <div className="flex items-center gap-3" key={index}>
                                                                <div className="about_content_tags">
                                                                    <AntdComponents.Typography className='description'>{item?.name ? <>{item?.name}</> : '---'}</AntdComponents.Typography>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </AntdComponents.Col>
                            </AntdComponents.Row>
                        </div>
                        {/* contacts */}
                        <div className="mt-10 border-2 border-Blue bg-DarkGrey rounded-10 px-5 py-3">
                            <AntdComponents.Typography className='titleSmall'>Contacts</AntdComponents.Typography>
                            <div className="mt-5">
                                <CustomTable
                                    columns={contactColumns}
                                    loading={false}
                                    pagination={false}
                                    dataSource={userData?.contacts}
                                />
                            </div>
                        </div>
                        {/* medications */}
                        <div className="mt-10 border-2 border-Blue bg-DarkGrey rounded-10 px-5 py-3">
                            <AntdComponents.Typography className='titleSmall'>Medications</AntdComponents.Typography>
                            <div className="mt-5">
                                <CustomTable
                                    columns={medicationColumns}
                                    loading={false}
                                    pagination={false}
                                    dataSource={userData?.medications}
                                />
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default UserDetailView
