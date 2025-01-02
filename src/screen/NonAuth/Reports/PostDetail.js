import React from 'react'
import * as AntdComponents from 'antd'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { RouterKeys } from '../../../Routes/RouterKeys';
import MultiColorDiv from '../../../components/MultiColorDiv';
import CustomButton from '../../../components/CustomButton';
import { Endpoints } from '../../../utils/Endpoints';
import { QueryKeys } from '../../../utils/RTKKeys';
import { useDynamicMutationMutation, useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import CustomTable from '../../../components/CustomTable';
import { fileUrl, getSorterConfig, userStatus } from '../../../utils/Constant';
import moment from 'moment';
import { STATIC_IMAGES } from '../../../utils/StaticImages';
import CustomToast from '../../../utils/CustomToast';
const PostDetail = () => {
    const breadcrumbItems = [
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <AntdComponents.Typography className='un_active'>Report</AntdComponents.Typography> },
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.REPORT_POST}>Post</Link> },
        { title: <AntdComponents.Typography className='active'>Detail</AntdComponents.Typography> }
    ];
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const Id = searchParams.get('id');
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 10,
    });
    const [updateMutation] = useDynamicMutationMutation();
    // DETAIL get api
    const { data: listData, isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.REPORT_POST_DETAIL,
        params: { report_id: Id },
        key: QueryKeys.REPORT_POST_DETAIL,
        skip: false,
    })
    const mainData = listData?.data
    React.useEffect(() => {
        setPagination({
            ...pagination,
            total: mainData?.totalCount
        })
    }, [listData])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (data,record) => <AntdComponents.Typography className='font-bold capitalize text-White'>{data ? data : "---"}</AntdComponents.Typography>,
            ...getSorterConfig('name', 'alpha'),
            key: 'name',
            minWidth: 150,
        },
        {
            title: 'Date',
            dataIndex: 'reportedAt',
            key: 'reportedAt',
            render: (data) => <span className='font-bold'>{data ? moment(data).format('DD/MM/YYYY') : "---"}</span>,
            ...getSorterConfig('reportedAt', 'date'),
            minWidth: 150,
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
            render: (data) => <span className='font-bold capitalize'>{data ? data : "---"}</span>,
            ...getSorterConfig('reason', 'alpha'),
            align: 'center',
            minWidth: 180,
        },
    ];

    const handleStatusUpdate = async (requestData,type) => {
        try {
            const { data, error } = await updateMutation(requestData);
            console.log('data>>', data);
            if (data) {
                if(type==='post'){
                    navigate(-1)
                }
                CustomToast('s', data?.message);
            } else {
                CustomToast('e', error?.data?.message);
            }
        } catch (err) {
            CustomToast('e', 'An unexpected error occurred.');
        }
    }
    const handleDeactivate = (status) => {
        console.log('status',status);
        
        let requestData = {
            endpoint: Endpoints.NON_AUTH.USER_STATUS_UPDATE,
            method: 'PUT',
            body: {
                user_id:mainData?.reported_to?._id,
                status:userStatus.DEACTIVATED===status?userStatus.ACTIVE:userStatus.DEACTIVATED
            },
            key:QueryKeys.REPORT_POST_DETAIL
        };
        handleStatusUpdate(requestData,'user')
    }
    const handleDeletePost = () => {
        let requestData = {
            endpoint: Endpoints.NON_AUTH.REPORT_POST_DELETE,
            method: 'PUT',
            body: {
                post_id:mainData?._id
            },
            key:QueryKeys.REPORT_POST_DETAIL
        };
        handleStatusUpdate(requestData,'post')
     }
    return (
        <div>
            <AntdComponents.Breadcrumb items={breadcrumbItems} separator={<h4 className='text-White'>/</h4>} />
            <div className="bg-DarkGrey mt-4 rounded-10 px-8 py-3">
                <div className="flex items-center flex-col md:flex-row justify-center md:justify-end gap-4 mt-5">
                    <div className="">
                        <MultiColorDiv component={<AntdComponents.Button className='bg-Black border-none text-White common-button h-[3.0rem] w-48' onClick={() => handleDeactivate(mainData?.reported_to?.status)}>{mainData?.reported_to?.status===userStatus.DEACTIVATED?'Activate':'Deactivate'}</AntdComponents.Button>} />
                    </div>
                    <CustomButton title={'Delete Post'} className={'bg-Black border-2 border-White hover:border-White h-[3.2rem] w-48'} onClick={() => handleDeletePost()} />
                </div>
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <AntdComponents.Avatar role='button' src={mainData?.reported_to?.profile_pic ? `${fileUrl}${mainData?.reported_to?.profile_pic}` : STATIC_IMAGES.LOGO} size={60} onClick={()=> navigate(`${RouterKeys?.NON_Auth.USER_Detail}?id=${mainData?.reported_to?._id}`) }/>
                        <AntdComponents.Typography className='titleSmall cursor-pointer' onClick={()=> navigate(`${RouterKeys?.NON_Auth.USER_Detail}?id=${mainData?.reported_to?._id}`) }>{mainData?.reported_to?.name}</AntdComponents.Typography>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <AntdComponents.Typography className='titleSmall font-normal'>Community name - {mainData?.reported_to?.name ? mainData?.reported_to?.name : '---'}</AntdComponents.Typography>
                    </div>
                </div>
                <div className="mt-8 bg-Black p-7 max-h-32 overflow-y-auto rounded-10">
                    <AntdComponents.Typography className='paragraph'>{mainData?.post?.description ? mainData?.post?.description : '---'}
                    </AntdComponents.Typography>
                </div>
                <div className="mt-5">
                    <AntdComponents.Typography className='titleSmall'>Reported by:</AntdComponents.Typography>
                    <div className="mt-5">
                        <CustomTable
                            columns={columns}
                            loading={isLoading}
                            pagination={{ ...pagination }}
                            selectedRowKeys={selectedRowKeys}
                            setSelectedRowKeys={setSelectedRowKeys}
                            dataSource={mainData?.report_by}
                            handlePaginationChange={(currentPage,pageSize) => { setPagination((prev) => ({ ...prev, current: currentPage,pageSize:pageSize })) }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetail
