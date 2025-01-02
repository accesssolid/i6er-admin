import React from 'react'
import { RouterKeys } from '../../../Routes/RouterKeys';
import * as AntdComponents from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import DebouncedSearch from '../../../components/DebouncedSearch';
import { ReactIcons } from '../../../utils/ReactIcons';
import CustomTable from '../../../components/CustomTable';
import { userStatus } from '../../../utils/Constant';
import { QueryKeys } from '../../../utils/RTKKeys';
import { useDynamicMutationMutation, useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import { Endpoints } from '../../../utils/Endpoints';
import DeleteModal from '../../../components/DeleteModal';
import CustomToast from '../../../utils/CustomToast';
const Users = () => {
    const breadcrumbItems = [
        { title: <Link className='un_active text-Red' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <AntdComponents.Typography className='active'>Users</AntdComponents.Typography> },
    ];
    const [updateMutation, { isLoading: statusUpdateLoading }] = useDynamicMutationMutation();
    const navigate = useNavigate()
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [particularDetail, setParticularDetail] = React.useState(null);
    const [searchText, setSearchText] = React.useState('')
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 10,
    });

    // listing get api
    const { data: listData, isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.USER_LIST,
        params: { ...(!searchText ? { page: pagination?.current, limit: pagination?.pageSize } : {}), ...(searchText ? { search_key: searchText } : {})},
        key: QueryKeys.USER_LIST,
    },{skip:false,refetchOnMountOrArgChange:true}
)
    const tableData = listData?.data
    React.useEffect(() => {
        setPagination({
            ...pagination,
            total: tableData?.totalCount
        })
    }, [listData])

    const handleSearch = (value) => {
        console.log('value', value);
        setSearchText(value)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (name, record) => <AntdComponents.Typography className='table_row_data' onClick={() => { navigate(`${RouterKeys?.NON_Auth.USER_Detail}?id=${record?._id}`) }}>{record?.first_name ? `${record?.first_name} ${record?.last_name}` : "---"}</AntdComponents.Typography>,
            // ...getSorterConfig('name', 'alpha'),
            key: 'name',
            minWidth: 250,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => <AntdComponents.Typography className='font-bold text-White'>{email ? email : "---"}</AntdComponents.Typography>,
            // ...getSorterConfig('email', 'alpha'),
            minWidth: 250,
        },
        {
            title: 'Display Name',
            dataIndex: 'display_name',
            key: 'display_name',
            render: (display_name) => <AntdComponents.Typography className='table_row_data'>{display_name ? display_name : "---"}</AntdComponents.Typography>,
            // ...getSorterConfig('community_name', 'alpha'),
            minWidth: 180,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <div className="flex gap-2 justify-center">
                    <AntdComponents.Switch loading={particularDetail?._id === record?._id && statusUpdateLoading} checked={status === 1 ? true : false} onChange={(e) => { handleActive(e, record) }} />
                </div>
            ),
            minWidth: 150,
            align: 'center'
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: '_id',
            render: (Id, record) => (
                <div className="flex gap-2">
                    <ReactIcons.EyeIcon
                        style={{ fontSize: 35 }}
                        onClick={() => { navigate(`${RouterKeys?.NON_Auth.USER_Detail}?id=${Id}`) }} />
                    {!(selectedRowKeys?.length > 0) && <ReactIcons.DeleteIcon style={{ fontSize: 40 }}
                        onClick={() => { setDeleteModal(true); setParticularDetail(record) }}
                    />}
                </div>
            ),
            width: 100,
        },
    ];

    const handleStatusUpdate = async (payload) => {
        let requestData = {
            endpoint: Endpoints.NON_AUTH.USER_STATUS_UPDATE,
            method: 'PUT',
            body: payload,
            key: QueryKeys.USER_LIST
        };

        try {
            const { data, error } = await updateMutation(requestData);
            if (data) {
                CustomToast('s', data?.message);
                setDeleteModal(false)
                setParticularDetail({})
            } else {
                setDeleteModal(false)
                setParticularDetail({})
                CustomToast('e', error?.data?.message);
            }
        } catch (err) {
            CustomToast('e', 'An unexpected error occurred.');
        }
    }
    const handleActive = (value, record) => {
        setParticularDetail(record);
        let status = value ? userStatus.ACTIVE : userStatus.DEACTIVATED
        let payload = {
            "status": status,
            "user_id": record?._id
        }
        handleStatusUpdate(payload)
    }
    const handleDelete = () => {
        let payload = {
            "status": userStatus.DELETE,
            "user_id": particularDetail?._id
        }
        handleStatusUpdate(payload)
    }
    return (
        <div>
            <AntdComponents.Breadcrumb items={breadcrumbItems} separator={<h4 className='text-White'>/</h4>} />
            <div className="flex w-full justify-center md:justify-end search">
                <DebouncedSearch onSearch={handleSearch} delay={500} />
            </div>
            <div className="mt-5">
                <CustomTable
                    columns={columns}
                    loading={isLoading}
                    pagination={{ ...pagination }}
                    selectedRowKeys={selectedRowKeys}
                    setSelectedRowKeys={setSelectedRowKeys}
                    dataSource={tableData?.result}
                    handlePaginationChange={(currentPage, pageSize) => { setPagination((prev) => ({ ...prev, current: currentPage, pageSize: pageSize })) }}
                />
            </div>
            {
                deleteModal &&
                <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} deleteMessage={`Are you sure want to delete this?`} deleteFunc={handleDelete} loading={statusUpdateLoading} />
            }
        </div>
    )
}

export default Users
