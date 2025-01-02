import React from 'react'
import { RouterKeys } from '../../../Routes/RouterKeys';
import * as AntdComponents from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import CustomTable from '../../../components/CustomTable';
import { getSorterConfig, getSorterConfigForObject, userStatus } from '../../../utils/Constant';
import { QueryKeys } from '../../../utils/RTKKeys';
import { useDynamicMutationMutation, useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import { Endpoints } from '../../../utils/Endpoints';
import CustomToast from '../../../utils/CustomToast';
const ReportUser = () => {
    const breadcrumbItems = [
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <AntdComponents.Typography className='un_active'>Report</AntdComponents.Typography> },
        { title: <AntdComponents.Typography className='active'>Users</AntdComponents.Typography> }
    ];
    const navigate = useNavigate()
    const [updateMutation, { isLoading: statusUpdateLoading }] = useDynamicMutationMutation();
    const [particularDetail, setParticularDetail] = React.useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 10,
    });

    // listing get api
    const { data: listData,isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.REPORT_USER_LIST,
        params: {page: pagination?.current, limit: pagination?.pageSize},
        key: QueryKeys.REPORT_USER_LIST,
        skip: false,
    })
    const tableData = listData?.data
    React.useEffect(() => {
        setPagination({
            ...pagination,
            total: tableData?.totalCount
        })
    }, [listData])


    const columns = [
        {
            title: 'Reported To',
            dataIndex: 'reported_user',
            render: (data) => <AntdComponents.Typography className='text-White font-bold capitalize' onClick={()=> navigate(`${RouterKeys?.NON_Auth.USER_Detail}?id=${data?._id}`) }>{data?.name ? data?.name : "---"}</AntdComponents.Typography>,
            ...getSorterConfigForObject('reported_user', 'alpha','name'),
            key: 'name',
            width: 250,
        }, 
        {
            title: 'Email',
            dataIndex: 'reported_user',
            key: 'reported_user',
            render: (data) => <AntdComponents.Typography className='text-White font-bold'onClick={()=> navigate(`${RouterKeys?.NON_Auth.USER_Detail}?id=${data?._id}`) }>{data?.email ? data?.email : "---"}</AntdComponents.Typography>,
            ...getSorterConfigForObject('reported_user', 'alpha','email'),
            width: 250,
        },
        {
            title: 'Reported By',
            dataIndex: 'reported_by',
            render: (data) => <AntdComponents.Typography className='text-White font-bold capitalize' onClick={()=> navigate(`${RouterKeys?.NON_Auth.USER_Detail}?id=${data?._id}`) }>{data?.name ? data?.name : "---"}</AntdComponents.Typography>,
            ...getSorterConfigForObject('reported_by', 'alpha','name'),
            key: 'name',
            width: 250,
        }, 
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
            render: (data) => <AntdComponents.Typography className='table_row_data'>{data ? data : "---"}</AntdComponents.Typography>,
            ...getSorterConfig('reason', 'alpha'),
            width: 150,
        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <div className="flex gap-2 justify-center">
                    <AntdComponents.Switch loading={particularDetail?.reported_user?._id===record?.reported_user?._id&&statusUpdateLoading} checked={record?.reported_user?.status === 1 ? true : false} onChange={(e) => { handleActive(e,record) }} />
                </div>
            ),
            width: 150,
            align: 'center'
        },
    ];

    const handleStatusUpdate = async (payload) => {
        let requestData = {
            endpoint: Endpoints.NON_AUTH.USER_STATUS_UPDATE,
            method: 'PUT',
            body: payload,
            key:QueryKeys.REPORT_USER_LIST
        };

        try {
            const { data, error } = await updateMutation(requestData);
            if (data) {
                CustomToast('s', data?.message);
                setParticularDetail({})
            } else {
                setParticularDetail({})
                CustomToast('e', error?.data?.message);
            }
        } catch (err) {
            CustomToast('e', 'An unexpected error occurred.');
        }
    }
    const handleActive = (value,record) => {
        setParticularDetail(record);
        let status = value ? userStatus.ACTIVE : userStatus.DEACTIVATED
        let payload = {
            "status": status,
            "user_id": record?.reported_user?._id
        }
        handleStatusUpdate(payload)
    }
    return (
        <div>
            <AntdComponents.Breadcrumb items={breadcrumbItems} separator={<h4 className='text-White'>/</h4>} />
            <div className="mt-5">
                <CustomTable
                    columns={columns}
                    loading={isLoading}
                    pagination={{ ...pagination }}
                    selectedRowKeys={selectedRowKeys}
                    setSelectedRowKeys={setSelectedRowKeys}
                    dataSource={tableData?.response}
                    handlePaginationChange={(currentPage,pageSize) => { setPagination((prev) => ({ ...prev, current: currentPage,pageSize:pageSize })) }}
                />
            </div>
        </div>
    )
}

export default ReportUser
