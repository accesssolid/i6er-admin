import React from 'react'
import { RouterKeys } from '../../../Routes/RouterKeys';
import * as AntdComponents from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import CustomTable from '../../../components/CustomTable';
import { getSorterConfig, userStatus } from '../../../utils/Constant';
import { STATIC_IMAGES } from '../../../utils/StaticImages';
import MultiColorDiv from '../../../components/MultiColorDiv';
import OutlineButton from '../../../components/OutlineButton';
import { ReactIcons } from '../../../utils/ReactIcons';
import CustomToast from '../../../utils/CustomToast';
import IconButton from '../../../components/IconButton';
import { useDynamicMutationMutation, useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import { Endpoints } from '../../../utils/Endpoints';
import { QueryKeys } from '../../../utils/RTKKeys';
import DeleteModal from '../../../components/DeleteModal';

const Category = () => {
    const navigate = useNavigate()
    const breadcrumbItems = [
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <AntdComponents.Typography className='active'>Category</AntdComponents.Typography> }
    ];
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [particularDetail, setParticularDetail] = React.useState(null);
    console.log('deleteModalOpen', deleteModalOpen, particularDetail);
    const [planSelected, setPlanSelected] = React.useState('')
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 10,
    });
    const [openModal, setOpenModal] = React.useState(false)
    const [addForm] = AntdComponents.Form.useForm()
    // Add Edit mutation
    const [addEditMutation, { isLoading: addEditLoading }] = useDynamicMutationMutation();
    // DELETE MUTATION
    const [deleteMutation, { isLoading: statusUpdateLoading }] = useDynamicMutationMutation();

    // listing get api
    const { data: listData, isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.CATEGORY_LIST,
        params: { page: pagination?.current, limit: pagination?.pageSize, search_key: planSelected },
        key: QueryKeys.CATEGORY_LIST,
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
            title: 'Category Name',
            dataIndex: 'name',
            render: (name) => <AntdComponents.Typography className='table_row_data'>{name ? name : "---"}</AntdComponents.Typography>,
            ...getSorterConfig('name', 'alpha'),
            key: 'name',
            width: 250,
        },
        {
            title: 'Plan Type',
            dataIndex: 'plan_type',
            key: 'plan_type',
            render: (data) => <AntdComponents.Typography className='table_row_data'>{data ? data : "---"}</AntdComponents.Typography>,
            ...getSorterConfig('email', 'alpha'),
            width: 250,
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
            render: (Id, record) => (
                <div className="flex gap-2">
                    <AntdComponents.Avatar
                        size={35}
                        src={STATIC_IMAGES.TABLE.VIEW_ICON}
                        onClick={() => { navigate(`${RouterKeys.NON_Auth.CATEGORY_DETAIL}?id=${Id}`, { state: { data: record } }) }}
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

    // form initial values set
    const initialFormValues = () => {
        addForm.setFieldsValue({
            'plan_type': 'basic',
            'category_name': '',
            'questions': [
                {},
            ]
        })
    }
    // prefilled form
    React.useEffect(() => {
        if (particularDetail?._id) {
            addForm.setFieldsValue({
                'plan_type': particularDetail?.plan_type,
                'category_name': particularDetail?.name,
                'questions': particularDetail?.question?.map((item) => ({ question: item }))
            })
        } else {
            initialFormValues()
        }
    }, [particularDetail])

    // STATUS COMMON UPDATE
    const handleStatusUpdate = async (payload) => {
        let requestData = {
            endpoint: `${Endpoints.NON_AUTH.CATEGORY_UPDATE}`,
            method: 'PUT',
            body: payload,
            key: QueryKeys.CATEGORY_LIST
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

    // form submit handle
    const handleFinish = async (values) => {
        console.log("values", values);
        let payload = {
            "plan_type": values?.plan_type,
            "name": values?.category_name.trim(),
            "question": values?.questions?.map((item) => item?.question.trim())
        }
        let requestData = {
            endpoint: Endpoints.NON_AUTH.CATEGORY_ADD,
            method: 'POST',
            body: payload,
            key: QueryKeys.CATEGORY_LIST
        };
        if (particularDetail?._id) {
            requestData.endpoint = Endpoints.NON_AUTH.CATEGORY_UPDATE
            requestData.method = 'PUT'
            payload.category_id = particularDetail?._id
        }

        try {
            const { data, error } = await addEditMutation(requestData);
            if (data) {
                CustomToast('s', data?.message);
                setOpenModal(false)
                setParticularDetail({})
            } else {
                // setOpenModal(false)
                CustomToast('e', error?.data?.message);
            }
        } catch (err) {
            CustomToast('e', 'An unexpected error occurred.');
        }
    }

    // MODAL DELETE BUTTON FUNCTION
    const handleDelete = () => {
        let payload = {
            category_id: particularDetail?._id,
            status: userStatus.DELETE
        }
        handleStatusUpdate(payload)
    }
    // HANDLE ACTIVE OR DEACTIVATE
    const handleSwitch = (value, record) => {
        setParticularDetail(record)
        let status = value ? userStatus.ACTIVE : userStatus.DEACTIVATED
        let payload = {
            category_id: record?._id,
            status: status
        }
        handleStatusUpdate(payload)
    }

    const PopOverContent = () => {
        return (
            <div className=" border-2 border-Blue rounded-10">
                <AntdComponents.Typography className={`description px-6 rounded-t-10 font-semibold py-3 h-full ${planSelected === '' ? 'bg-GreySecondary text-Black' : 'text-White bg-DarkGrey '}`} role='button' onClick={() => setPlanSelected('')}>All</AntdComponents.Typography>
                <AntdComponents.Typography className={`description px-6  font-semibold py-3 h-full ${planSelected === 'premium' ? 'bg-GreySecondary text-Black' : 'text-White bg-DarkGrey '}`} role='button' onClick={() => setPlanSelected('premium')}>Premium Plan</AntdComponents.Typography>
                <AntdComponents.Typography className={`description px-6 rounded-b-10 font-semibold py-3 h-full ${planSelected === 'basic' ? 'bg-GreySecondary text-Black' : 'text-White bg-DarkGrey '}`} role='button' onClick={() => setPlanSelected('basic')}>Basic Plan</AntdComponents.Typography>
            </div>
        )
    }
    return (
        <div>
            <AntdComponents.Breadcrumb items={breadcrumbItems} separator={<h4 className='text-White'>/</h4>} />
            <div className="flex w-full justify-end mt-4 md:0">
                <div className="flex gap-3">
                    <AntdComponents.Popover arrow={false} placement='bottomLeft' content={PopOverContent}>
                        <div className="">
                            <MultiColorDiv classThirdDiv={'px-5 py-[11px]'} component={<AntdComponents.Avatar src={STATIC_IMAGES.FILTER} size={25} shape='square' />} />
                        </div>
                    </AntdComponents.Popover>
                    <div className="">
                        <OutlineButton className={'bg-Black'} prefixItem={<ReactIcons.PlusIcon />} title={'Add Category'} onClick={() => { setParticularDetail({}); initialFormValues(); setOpenModal(true) }} />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <CustomTable
                    columns={columns}
                    loading={isLoading}
                    pagination={{ ...pagination }}
                    selectedRowKeys={selectedRowKeys}
                    setSelectedRowKeys={setSelectedRowKeys}
                    dataSource={tableData?.response}
                    handlePaginationChange={(currentPage, pageSize) => { setPagination((prev) => ({ ...prev, current: currentPage, pageSize: pageSize })) }}
                />
            </div>
            {
                openModal &&
                <AntdComponents.Modal key={openModal} width={500} open={openModal} onCancel={() => { setOpenModal(false); }} title={<h3 className='text-center font-Poppins'>{particularDetail?._id ? "Edit" : 'Add'} Category</h3>} centered footer={null} closeIcon={<ReactIcons.CloseIcon className={'text-White'} />} >
                    <div className="">
                        <AntdComponents.Form form={addForm} layout='vertical' onFinish={(values) => handleFinish(values)}>
                            <AntdComponents.Row >
                                <AntdComponents.Col xl={20}>
                                    <AntdComponents.Form.Item name={'category_name'} className='mb-4'
                                        label={
                                            <AntdComponents.Typography className='description font-semibold'>
                                                Category
                                            </AntdComponents.Typography>
                                        }
                                        rules={[
                                            { required: true, message: 'Please Enter name!' },
                                            {
                                                validator: (_, value) => {
                                                    if (value && value.trim().length === 0) {
                                                        return Promise.reject(new Error('Whitespace is not allowed!'));
                                                    }
                                                    return Promise.resolve();
                                                },
                                            },
                                        ]}
                                    >
                                        <AntdComponents.Input maxLength={50} className='input-box' />
                                    </AntdComponents.Form.Item>
                                </AntdComponents.Col>
                                <AntdComponents.Col xl={20}>
                                    <AntdComponents.Form.Item name={'plan_type'} className='mb-4'
                                        label={
                                            <AntdComponents.Typography className='description font-semibold'>
                                                Plan type
                                            </AntdComponents.Typography>
                                        }
                                    >
                                        <AntdComponents.Select className='input-box'
                                            suffixIcon={<ReactIcons.ArrowDownIcon />}
                                            options={[
                                                {
                                                    value: 'basic',
                                                    label: 'Basic'
                                                },
                                                {
                                                    value: 'premium',
                                                    label: 'Premium'
                                                },
                                            ]}
                                        />
                                    </AntdComponents.Form.Item>
                                </AntdComponents.Col>

                            </AntdComponents.Row>

                            <AntdComponents.Typography className='paragraph font-semibold mb-2'>Questions</AntdComponents.Typography>
                            <AntdComponents.Form.List name={'questions'} className=''>
                                {
                                    (fields, { add, remove }) => (
                                        <>
                                            {
                                                fields.map(({ key, name, ...restField }, index) => (
                                                    <AntdComponents.Row gutter={[16, 16]} key={key}>
                                                        <AntdComponents.Col xl={20}>
                                                            <AntdComponents.Form.Item
                                                                {...restField}
                                                                name={[name, `question`]}
                                                                // label={`Rule ${key + 1}`}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "Please type answer!",
                                                                    },
                                                                    {
                                                                        validator: (_, value) => {
                                                                            if (value && value.trim().length === 0) {
                                                                                return Promise.reject(new Error('Whitespace is not allowed!'));
                                                                            }
                                                                            return Promise.resolve();
                                                                        },
                                                                    },
                                                                ]}>
                                                                <AntdComponents.Input className='input-box' />
                                                            </AntdComponents.Form.Item>
                                                        </AntdComponents.Col>
                                                        {/* {index != 0 &&
                                                    } */}
                                                        <AntdComponents.Col lg={4} xl={4}>
                                                            {
                                                                index === fields.length - 1 ?
                                                                    <IconButton
                                                                        onClick={() => {
                                                                            const options = addForm.getFieldValue('questions') || [];
                                                                            const firstOption = options[0]?.question;
                                                                            console.log('firstOption', firstOption, options);

                                                                            const lastOption = options[options.length - 1]?.question;
                                                                            if (lastOption && firstOption) {
                                                                                add();
                                                                            } else {
                                                                                CustomToast('e', "Please fill in the previous answer before adding a new one.", 'top-right', 7000);
                                                                            }
                                                                        }}
                                                                        Icon={<ReactIcons.PlusIcon />}
                                                                        className='rounded-lg bg-Black h-12 w-full border-2 border-White p-3'
                                                                    />
                                                                    : <IconButton
                                                                        onClick={() => remove(name)}
                                                                        Icon={<AntdComponents.Image src={STATIC_IMAGES.DELETE} preview={false} height={30} />}
                                                                        className='rounded-lg bg-Black h-12 w-full border-2 border-White p-3'
                                                                    />

                                                            }
                                                        </AntdComponents.Col>
                                                    </AntdComponents.Row>
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </AntdComponents.Form.List>
                            <OutlineButton title={particularDetail?._id ? 'Update' : 'Save'} className={'bg-Black'} htmlType='submit' isLoading={addEditLoading} classNameDiv='my-4' />
                        </AntdComponents.Form>
                    </div>
                </AntdComponents.Modal>
            }
            {
                deleteModalOpen &&
                <DeleteModal deleteModal={deleteModalOpen} setDeleteModal={setDeleteModalOpen} deleteMessage={`Are you sure want to delete this?`} deleteFunc={handleDelete} loading={statusUpdateLoading} />
            }
        </div>
    )
}

export default Category
