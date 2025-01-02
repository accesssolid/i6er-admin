import React from 'react'
import { RouterKeys } from '../../../Routes/RouterKeys';
import * as AntdComponents from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import CustomTable from '../../../components/CustomTable';
import { getSorterConfigForObject } from '../../../utils/Constant';
import { QueryKeys } from '../../../utils/RTKKeys';
import { useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import { Endpoints } from '../../../utils/Endpoints';
import { STATIC_IMAGES } from '../../../utils/StaticImages';

const Comments = () => {
    const breadcrumbItems = [
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <AntdComponents.Typography className='un_active'>Report</AntdComponents.Typography> },
        { title: <AntdComponents.Typography className='active'>Comment</AntdComponents.Typography> }
    ];
    const navigate = useNavigate()
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 10,
    });

    // listing get api
    const { data: listData, isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.REPORT_COMMENT_LIST,
        params: { page: pagination?.current, limit: pagination?.pageSize },
        key: QueryKeys.REPORT_COMMENT_LIST,
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
            title: 'Users',
            dataIndex: 'reported_to',
            render: (data) => <AntdComponents.Typography className='font-bold capitalize text-White' onClick={()=> navigate(`${RouterKeys?.NON_Auth.USER_Detail}?id=${data?.id}`) }>{data?.name ? data?.name : "---"}</AntdComponents.Typography>,
            ...getSorterConfigForObject('reported_to', 'alpha','name'),
            key: 'name',
            minWidth: 150,
        },
        {
            title: 'Post',
            dataIndex: 'comment',
            key: 'comment',
            render: (data) => <AntdComponents.Typography className='table_row_data'>{data?.comment ? data?.comment : "---"}</AntdComponents.Typography>,
            ...getSorterConfigForObject('comment', 'alpha','comment'),
            minWidth: 150,
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: '_id',
            align: 'center',
            render: (Id, record) => (
                <div className="flex gap-2">
                    <AntdComponents.Avatar
                        size={40}
                        src={STATIC_IMAGES.TABLE.VIEW_ICON}
                        onClick={() => { navigate(`${RouterKeys.NON_Auth.REPORT_COMMENTS_DETAIL}?id=${Id}`) }} />
                </div>
            ),
            width: 100,
        },
    ];
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

export default Comments
