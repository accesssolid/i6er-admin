import React from 'react'
import { RouterKeys } from '../../../Routes/RouterKeys';
import * as AntdComponents from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import CustomTable from '../../../components/CustomTable';
import { fileUrl, getSorterConfig, userStatus } from '../../../utils/Constant';
import { STATIC_IMAGES } from '../../../utils/StaticImages';
import OutlineButton from '../../../components/OutlineButton';
import AddEditModal from './AddEditModal';
import { useDynamicMutationMutation, useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import { Endpoints } from '../../../utils/Endpoints';
import { QueryKeys } from '../../../utils/RTKKeys';
import CustomToast from '../../../utils/CustomToast';
import DeleteModal from '../../../components/DeleteModal';

const Community = () => {
    const navigate = useNavigate()
    const breadcrumbItems = [
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <AntdComponents.Typography className='active'>Community</AntdComponents.Typography> }
    ];
    const [particularDetail, setParticularDetail] = React.useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 10,
    });
    const [openModal, setOpenModal] = React.useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    // DELETE MUTATION
    const [deleteMutation, { isLoading: statusUpdateLoading }] = useDynamicMutationMutation();

    // listing get api
    const { data: listData, isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.COMMUNITY_LIST,
        params: { page: pagination?.current, limit: pagination?.pageSize },
        key: QueryKeys.COMMUNITY_LIST,
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
            title: 'Name',
            dataIndex: 'name',
            render: (name, record) => {
                return (
                    <div className='flex items-center gap-3'>
                        <AntdComponents.Avatar size={40} src={`${fileUrl}${record?.image_url}`} className='' />
                        <span className='font-bold'>{name ? name : "---"}</span>
                    </div>
                )
            },
            ...getSorterConfig('name', 'alpha'),
            key: 'name',
            width: 250,
        },
        {
            title: 'Followers',
            dataIndex: 'followers_count',
            key: 'followers_count',
            render: (value) => <span className='font-bold'>{value}</span>,
            width: 150,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <div className="flex gap-2 justify-center">
                    <AntdComponents.Switch checked={status === 1 ? true : false} loading={particularDetail?._id === record?._id && statusUpdateLoading} onChange={(value) => handleSwitch(value, record)} />
                </div>
            ),
            width: 150,
            align: 'center'
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: '_id',
            // align: 'center',
            render: (Id, record) => (
                <div className="flex gap-2">
                    <AntdComponents.Avatar
                        size={35}
                        src={STATIC_IMAGES.TABLE.VIEW_ICON}
                        onClick={() => { navigate(`${RouterKeys.NON_Auth.COMMUNITY_DETAIL}?id=${Id}`) }}
                    />
                    <AntdComponents.Avatar
                        size={35}
                        src={STATIC_IMAGES.TABLE.EDIT}
                        onClick={() => { setParticularDetail(record); setOpenModal(true) }}
                    />
                    {!(selectedRowKeys?.length > 0) && <AntdComponents.Avatar
                        size={35}
                        src={STATIC_IMAGES.TABLE.DELETE_CIRCLE_ICON}
                        onClick={() => { setDeleteModalOpen(true); setParticularDetail(record) }}
                    />}
                </div>
            ),
            width: 100,
        },
    ];

    // STATUS COMMON UPDATE
    const handleStatusUpdate = async (payload, type) => {
        let requestData = {
            endpoint: `${Endpoints.NON_AUTH.COMMUNITY_DELETE}?community_id=${payload.community_id}&&status=${payload.status}`,
            method: type,
            body: {},
            key: QueryKeys.COMMUNITY_LIST
        };

        try {
            const { data, error } = await deleteMutation(requestData);
            if (data) {
                CustomToast('s', data?.message);
                setDeleteModalOpen(false)
                setParticularDetail({})
            } else {
                setParticularDetail({})
                setDeleteModalOpen(false)
                CustomToast('e', error?.data?.message);
            }
        } catch (err) {
            CustomToast('e', 'An unexpected error occurred.');
        }
    }
    // MODAL DELETE BUTTON FUNCTION
    const handleDelete = () => {
        let payload = {
            community_id: particularDetail?._id,
            status: userStatus.DELETE
        }
        handleStatusUpdate(payload, 'delete')
    }
    // HANDLE ACTIVE OR DEACTIVATE
    const handleSwitch = (value, record) => {
        setParticularDetail(record)
        let status = value ? userStatus.ACTIVE : userStatus.DEACTIVATED
        let payload = {
            community_id: record?._id,
            status: status
        }
        handleStatusUpdate(payload, 'delete')
    }

    return (
        <div>
            <AntdComponents.Breadcrumb items={breadcrumbItems} separator={<h4 className='text-White'>/</h4>} />
            <div className="flex w-full justify-end mt-4 md:0">
                <div className="">
                    <OutlineButton className={'bg-Black'} title={'Create New'} onClick={() => { setParticularDetail({}); setOpenModal(true) }} />
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
                openModal &&
                <AddEditModal openModal={openModal} setOpenModal={setOpenModal} particularDetail={particularDetail} setParticularDetail={setParticularDetail} />
            }

            {
                deleteModalOpen &&
                <DeleteModal deleteModal={deleteModalOpen} setDeleteModal={setDeleteModalOpen} deleteMessage={`Are you sure want to delete this?`} deleteFunc={handleDelete} loading={statusUpdateLoading} />
            }
        </div >
    )
}

export default Community
