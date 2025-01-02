import { Table, Typography } from 'antd';
import * as React from 'react';
import PropTypes from 'prop-types';
import { TableItemRenderer } from '../utils/Constant';
import Loader from './Loader';

const CustomTable = ({
    columns,
    dataSource,
    pagination,
    loading,
    handlePaginationChange,
    showHeader = true,
    rowHoverable = true,
    bordered = false,
    scroll,
    rowClassName = '',
    setSelectedRowKeys,
    selectedRowKeys,
    ...restProps
}) => {
    // const onSelectChange = (newSelectedRowKeys) => {
    //     setSelectedRowKeys?.(newSelectedRowKeys);
    // };

    // const rowSelection = selectedRowKeys ? { selectedRowKeys, onChange: onSelectChange } : null;

    return (
        <div className='custom_table'>
            {
                loading ?
                    <Loader/>
                    :
                    <Table
                        {...restProps}
                        locale={{
                            emptyText: loading ? (
                                <h4 className="min-h-28 items-center titleMedium">Hang On!</h4>
                            ) : (
                                <Typography className='titleMedium'>No Data Found!</Typography>
                            ),
                        }}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={pagination?.total > 10 ? {
                            ...pagination,
                            itemRender: (current, type) => TableItemRenderer(current, type, pagination),
                            onChange: handlePaginationChange,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '25', '50','75' ,'100'],
                        } : false}
                        showHeader={showHeader}
                        rowClassName={`cursor-pointer hover:bg-green-100  ${rowHoverable ? 'hoverable' : ''} ${rowClassName}`}
                        bordered={bordered}
                        rowKey={(record) => record?._id}
                        className="custom-table bg-white rounded-xl"
                        scroll={scroll}
                    // rowSelection={rowSelection}
                    />
            }
        </div>

    );
};

CustomTable.defaultProps = {
    showHeader: true,
    rowHoverable: true,
    bordered: false,
    loading: false,
    scroll: { x: 300 },
    handlePaginationChange: () => null,
    rowClassName: '',
};

CustomTable.propTypes = {
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
    pagination: PropTypes.object,
    handlePaginationChange: PropTypes.func,
    showHeader: PropTypes.bool,
    rowHoverable: PropTypes.bool,
    bordered: PropTypes.bool,
    loading: PropTypes.bool,
    scroll: PropTypes.object,
    rowClassName: PropTypes.string,
    setSelectedRowKeys: PropTypes.func,
    selectedRowKeys: PropTypes.array,
};

export default CustomTable;
