import React from 'react'
import * as AntdComponents from 'antd'
import { RouterKeys } from '../../../Routes/RouterKeys';
import { Link } from 'react-router-dom';
import OutlineButton from '../../../components/OutlineButton';
import CustomButton from '../../../components/CustomButton';
import { ReactIcons } from '../../../utils/ReactIcons';
import MultiColorDiv from '../../../components/MultiColorDiv';
import { useDynamicMutationMutation, useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import Loader from '../../../components/Loader';
import { Endpoints } from '../../../utils/Endpoints';
import { QueryKeys } from '../../../utils/RTKKeys';
import CustomToast from '../../../utils/CustomToast';
import DeleteModal from '../../../components/DeleteModal';
import { userStatus } from '../../../utils/Constant';

const FAQList = () => {
    const breadcrumbItems = [
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <AntdComponents.Typography className='active'>FAQ</AntdComponents.Typography> }
    ];
    const [editDetail, setEditDetail] = React.useState({})
    const [openModal, setOpenModal] = React.useState(false)
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [addForm] = AntdComponents.Form.useForm()
    const [updateMutation, { isLoading: buttonLoading }] = useDynamicMutationMutation();
    const [deleteMutation, { isLoading: statusUpdateLoading }] = useDynamicMutationMutation();
    const { data, isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.FAQ_LIST,
        params: {},
        key: QueryKeys.FAQ_LIST,
        skip: false,
    })
    let mainData = Array.isArray(data?.data) ? data?.data : []
    React.useEffect(() => {
        if (editDetail?.question != '') {
            addForm.setFieldsValue({
                'question': editDetail?.question,
                'answer': editDetail?.answer,
            })
        }
    }, [editDetail])

    const handleFinish = async (values) => {
        let payload = {
            question: values?.question.trim(),
            answer: values?.answer.trim(),
        }
        if (editDetail?._id) {
            payload.question_id = editDetail?._id
        }
        let requestData = {
            endpoint: Endpoints.NON_AUTH.FAQ_Add_UPDATE,
            method: editDetail?._id ? 'PUT' : "POST",
            body: payload,
            key: QueryKeys.FAQ_LIST
        };

        try {
            const { data, error } = await updateMutation(requestData);
            if (data) {
                CustomToast('s', data?.message);
                setOpenModal(false)
                setEditDetail({})
            } else {
                setEditDetail({})
                setOpenModal(false)
                CustomToast('e', error?.data?.message);
            }
        } catch (err) {
            CustomToast('e', 'An unexpected error occurred.');
        }
    }

    const handleStatusUpdate = async (payload, type) => {
        let requestData = {
            endpoint: `${Endpoints.NON_AUTH.FAQ_Add_UPDATE}?question_id=${payload.question_id}&&status=${payload.status}`,
            method: type,
            body: {},
            key: QueryKeys.FAQ_LIST
        };

        try {
            const { data, error } = await deleteMutation(requestData);
            if (data) {
                CustomToast('s', data?.message);
                setDeleteModal(false)
                setEditDetail({})
            } else {
                setEditDetail({})
                setDeleteModal(false)
                CustomToast('e', error?.data?.message);
            }
        } catch (err) {
            CustomToast('e', 'An unexpected error occurred.');
        }
    }
    const handleDelete = () => {
        let payload = {
            question_id: editDetail?._id,
            status: userStatus.DELETE
        }
        handleStatusUpdate(payload, 'delete')
    }
    const handleSwitch = (value, id) => {
        let status = value ? userStatus.ACTIVE : userStatus.DEACTIVATED
        let payload = {
            question_id: id,
            status: status
        }
        handleStatusUpdate(payload, 'delete')
    }
    return (
        <div>
            <AntdComponents.Breadcrumb items={breadcrumbItems} separator={<h4 className='text-White'>/</h4>} />
            <div className="flex w-full justify-end mt-4 md:0">
                <div className="">
                    <OutlineButton className={'bg-Black'} title={'Add New'} onClick={() => { setOpenModal(true); setEditDetail({}) }} />
                </div>
            </div>
            <div className="mt-5">
                {
                    isLoading ? <Loader />
                        :
                        <>
                            {
                                mainData?.length > 0 ?
                                    <>
                                        {
                                            mainData?.map((item, index) => {
                                                return (
                                                    <div className="bg-DarkGrey rounded-10 p-4 mt-3" key={index}>
                                                        {/* Question */}
                                                        <div className="flex w-full">
                                                            <AntdComponents.Typography className='description font-semibold min-w-11'>Q {index + 1}.</AntdComponents.Typography>
                                                            <div className="flex items-stretch justify-between w-full">
                                                                <AntdComponents.Typography className='description font-semibold'>{item?.question}?</AntdComponents.Typography>
                                                                <AntdComponents.Switch checked={item?.status == 1 ? true : false} onChange={(value) => handleSwitch(value, item?._id)} />
                                                            </div>
                                                        </div>
                                                        {/* answer */}
                                                        <div className="flex mt-2 w-full">
                                                            <AntdComponents.Typography className='description font-semibold min-w-11'>Ans.</AntdComponents.Typography>
                                                            <AntdComponents.Typography className='description h-32 overflow-y-auto'>{item?.answer}
                                                            </AntdComponents.Typography>
                                                        </div>
                                                        <div className="flex items-center gap-4 mt-5 ms-10">
                                                            <div className="">
                                                                <MultiColorDiv component={<AntdComponents.Button className='bg-Black border-none text-White common-button h-[2.9rem] w-28' onClick={() => { setEditDetail(item); setOpenModal(true) }}>Edit</AntdComponents.Button>} />
                                                            </div>
                                                            <CustomButton title={'Delete'} className={'bg-Black border-2 border-White hover:border-White h-[3.2rem] w-28'} onClick={() => { setEditDetail(item); setDeleteModal(true) }} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <AntdComponents.Typography className='titleMedium text-center'>No Data Found!</AntdComponents.Typography>
                        }
                        </>
                }
            </div>

            {/* add edit modal */}
            {
                openModal &&
                <AntdComponents.Modal key={openModal} width={500} open={openModal} onCancel={() => { setOpenModal(false); }} title={<h3 className='text-center font-Poppins'>FAQ</h3>} centered footer={null} closeIcon={<ReactIcons.CloseIcon className={'text-White'} />} >
                    <div className="">
                        <AntdComponents.Form form={addForm} layout='vertical' onFinish={handleFinish}>
                            <AntdComponents.Form.Item name={'question'} className=''
                                label={
                                    <AntdComponents.Typography className='description font-semibold'>
                                        Question
                                    </AntdComponents.Typography>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Question is required!'
                                    },
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
                                <AntdComponents.Input className='input-box' />
                            </AntdComponents.Form.Item>
                            <AntdComponents.Form.Item name={'answer'} className=''
                                label={
                                    <AntdComponents.Typography className='description font-semibold'>
                                        Answer
                                    </AntdComponents.Typography>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Question is required!'
                                    },
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
                                <AntdComponents.Input.TextArea rows={4} className='input-box' />
                            </AntdComponents.Form.Item>
                            <OutlineButton title={editDetail?._id ? 'Update' : 'Submit'} isLoading={buttonLoading} htmlType='submit' className={'bg-Black'} classNameDiv='my-5' />
                        </AntdComponents.Form>
                    </div>
                </AntdComponents.Modal >
            }
            {
                deleteModal &&
                <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} deleteMessage={`Are you sure want to delete this?`} deleteFunc={handleDelete} loading={statusUpdateLoading} />
            }
        </div>
    )
}

export default FAQList
