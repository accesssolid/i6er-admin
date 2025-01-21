import React from 'react'
import { RouterKeys } from '../../../Routes/RouterKeys';
import * as AntdComponents from 'antd'
import { Link } from 'react-router-dom';
import CustomTable from '../../../components/CustomTable';
import { QueryKeys } from '../../../utils/RTKKeys';
import { useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import { Endpoints } from '../../../utils/Endpoints';

const ContactList = () => {
    const breadcrumbItems = [
        { title: <Link className='un_active text-Red' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <AntdComponents.Typography className='active'>Contact</AntdComponents.Typography> },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 10,
    });

    // listing get api
    const { data: listData, isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.CONTACT_US_LIST,
        params: { page: pagination?.current, limit: pagination?.pageSize },
        key: QueryKeys.CONTACT_US_LIST,
    }, { skip: false, refetchOnMountOrArgChange: true })

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
            render: (name, record) => <AntdComponents.Typography className='table_row_data'>{name ? name : "---"}</AntdComponents.Typography>,
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
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            render: (message) => <AntdComponents.Typography className='table_row_data'>{message ? message : "---"}</AntdComponents.Typography>,
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
                    dataSource={tableData?.result}
                    handlePaginationChange={(currentPage, pageSize) => { setPagination((prev) => ({ ...prev, current: currentPage, pageSize: pageSize })) }}
                />
            </div>
        </div>
    )
}

export default ContactList
