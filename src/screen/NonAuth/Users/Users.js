import React from 'react'
import { RouterKeys } from '../../../Routes/RouterKeys';
import * as AntdComponents from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import DebouncedSearch from '../../../components/DebouncedSearch';
import { ReactIcons } from '../../../utils/ReactIcons';
import CustomTable from '../../../components/CustomTable';
import { getSorterConfig, userStatus } from '../../../utils/Constant';
import { STATIC_IMAGES } from '../../../utils/StaticImages';
import MultiColorDiv from '../../../components/MultiColorDiv';
import { QueryKeys } from '../../../utils/RTKKeys';
import { useDynamicMutationMutation, useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import { Endpoints } from '../../../utils/Endpoints';
import DeleteModal from '../../../components/DeleteModal';
import CustomToast from '../../../utils/CustomToast';
const Users = () => {
    const breadcrumbItems = [
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <AntdComponents.Typography className='active'>Users</AntdComponents.Typography> },
    ];
    const [updateMutation, { isLoading: statusUpdateLoading }] = useDynamicMutationMutation();
    const navigate = useNavigate()
    const [dropdownValue, setDropdownValue] = React.useState('')
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [particularDetail, setParticularDetail] = React.useState(null);
    const [searchText,setSearchText] = React.useState('')
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 10,
    });

    // listing get api
    const { data: listData,isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.USER_LIST,
        params: { ...(!searchText&&!dropdownValue?{page: pagination?.current, limit: pagination?.pageSize}:{}),...(searchText ? { search_key: searchText } : {}),  ...(dropdownValue ? { status: dropdownValue } : {}),},
        key: QueryKeys.USER_LIST,
        skip: false,
    })
    const tableData = listData?.data
    React.useEffect(() => {
        setPagination({
            ...pagination,
            total: tableData?.totalCount
        })
    }, [listData])

    const handleSearch = (value) => { 
        console.log('value',value);
        setSearchText(value)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (name,record) => <AntdComponents.Typography className='table_row_data'  onClick={() => { navigate(`${RouterKeys?.NON_Auth.USER_Detail}?id=${record?._id}`) }}>{name ? name : "---"}</AntdComponents.Typography>,
            ...getSorterConfig('name', 'alpha'),
            key: 'name',
            minWidth: 250,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => <AntdComponents.Typography className='font-bold text-White'>{email ? email : "---"}</AntdComponents.Typography>,
            ...getSorterConfig('email', 'alpha'),
            minWidth: 250,
        },
        {
            title: 'Community Thread Name',
            dataIndex: 'community_name',
            key: 'community_name',
            render: (community_name) => <AntdComponents.Typography className='table_row_data'>{community_name ? community_name : "---"}</AntdComponents.Typography>,
            ...getSorterConfig('community_name', 'alpha'),
            minWidth: 180,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <div className="flex gap-2 justify-center">
                    <AntdComponents.Switch loading={particularDetail?._id===record?._id&&statusUpdateLoading} checked={status === 1 ? true : false} onChange={(e) => { handleActive(e,record) }} />
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
                    <AntdComponents.Avatar
                        size={40}
                        src={STATIC_IMAGES.TABLE.VIEW_ICON}
                        onClick={() => { navigate(`${RouterKeys?.NON_Auth.USER_Detail}?id=${Id}`) }}
                    />
                    {!(selectedRowKeys?.length > 0) && <AntdComponents.Avatar
                        size={40}
                        src={STATIC_IMAGES.TABLE.DELETE_CIRCLE_ICON}
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
            key:QueryKeys.USER_LIST
        };

        try {
            const { data, error } = await updateMutation(requestData);
            console.log('data>>', data);
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
    const handleActive = (value,record) => {
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
            <div className="flex w-full justify-center md:justify-end">
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <AntdComponents.Select
                        value={dropdownValue}
                        onChange={(value) => setDropdownValue(value)}
                        className='input-box mt-4 md:mt-0 w-full md:w-44'
                        popupClassName='border-2 border-Blue p-0'
                        suffixIcon={<ReactIcons.ArrowDownIcon />}
                        options={[
                            {
                                value: '',
                                label: 'All'
                            },
                            {
                                value: userStatus.ACTIVE,
                                label: 'Active'
                            },
                            {
                                value: userStatus.DEACTIVATED,
                                label: 'Inactive'
                            },
                        ]}
                    />
                    <MultiColorDiv component={<DebouncedSearch onSearch={handleSearch} delay={500} />} />
                </div>
            </div>
            <div className="mt-5">
                <CustomTable
                    columns={columns}
                    loading={isLoading}
                    pagination={{ ...pagination }}
                    selectedRowKeys={selectedRowKeys}
                    setSelectedRowKeys={setSelectedRowKeys}
                    dataSource={tableData?.result}
                    handlePaginationChange={(currentPage,pageSize) => { setPagination((prev) => ({ ...prev, current: currentPage,pageSize:pageSize })) }}
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
