import React from 'react'
import * as AntdComponents from 'antd'
import { ReactIcons } from '../../../utils/ReactIcons';
import OutlineButton from '../../../components/OutlineButton';
import { acceptImageType, fileUrl } from '../../../utils/Constant';
import { STATIC_IMAGES } from '../../../utils/StaticImages';
import CustomToast from '../../../utils/CustomToast';
import { useDynamicMutationMutation } from '../../../redux/service/apiSlice';
import { Endpoints } from '../../../utils/Endpoints';
import { QueryKeys } from '../../../utils/RTKKeys';
import JoditEditorCommon from '../../../components/JoditEditor';

const AddEditModal = ({ openModal, setOpenModal, particularDetail, setParticularDetail }) => {
    const [addForm] = AntdComponents.Form.useForm()
    const [file, setFile] = React.useState({})
    const [blobUrl, setBlobUrl] = React.useState('')
    // const [editorData, setEditorData] = React.useState({
    //     data: ''
    // })
    const [addEditMutation, { isLoading }] = useDynamicMutationMutation();

    React.useEffect(() => {
        if (particularDetail?._id) {
            addForm.setFieldsValue({
                'community_name': particularDetail?.name,
                'description': particularDetail?.description,
                'guideline': particularDetail?.guidelines,
            })
            setBlobUrl(`${fileUrl}${particularDetail?.image_url}`)
            setFile(particularDetail?.image_url)
            // setEditorData({ data: particularDetail?.guidelines })
        }
    }, [particularDetail])

    const onFileUpload = (e) => {
        const file = e.target.files[0]
        console.log('file', file);
        setFile(file)
        setBlobUrl(URL.createObjectURL(file))
    }
    console.log("blobUrl", blobUrl);

    const handleFinish = async (values) => {
        console.log('values', values);
        if (blobUrl) {
            let formData = new FormData()
            formData.append('name', values?.community_name.trim())
            formData.append('description', values?.description.trim())
            formData.append('guidelines', values?.guideline)
            if (file?.name) {
                formData.append('community_pic', file)
            }
            let requestData = {
                endpoint: Endpoints.NON_AUTH.COMMUNITY_ADD,
                method: 'POST',
                body: formData,
                key: QueryKeys.COMMUNITY_LIST
            };
            if (particularDetail?._id) {
                requestData.endpoint = Endpoints.NON_AUTH.COMMUNITY_UPDATE
                requestData.method = 'PUT'
                formData.append('community_id', particularDetail?._id)
            }

            try {
                const { data, error } = await addEditMutation(requestData);
                if (data) {
                    CustomToast('s', data?.message);
                    setOpenModal(false)
                    setParticularDetail({})
                } else {
                    setOpenModal(false)
                    CustomToast('e', error?.data?.message);
                }
            } catch (err) {
                CustomToast('e', 'An unexpected error occurred.');
            }
        } else {
            CustomToast('e', 'Picture is required!')
        }
    }
    return (
        <div>
            <AntdComponents.Modal key={openModal} width={650} open={openModal} onCancel={() => { setOpenModal(false); }} title={<h3 className='text-center font-Poppins'>Create Community</h3>} centered footer={null} closeIcon={<ReactIcons.CloseIcon className={'text-White'} />} >
                <div className="">
                    <input id="imageInput" multiple className='hidden' aria-label="Upload Image" accept={acceptImageType} type="file" onChange={onFileUpload} />
                    <label htmlFor="imageInput" className="cursor-pointer">
                        {
                            blobUrl ?
                                <div className="text-center">
                                    <AntdComponents.Avatar src={blobUrl} size={100} />
                                </div>
                                :
                                <div className="text-center text-DarkGrey m-auto my-5"
                                    style={{
                                        backgroundImage: `url(${STATIC_IMAGES.UPLOAD})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        height: 100,
                                        width: 100,
                                        color: `var(--darkGrey)`
                                    }}
                                >
                                    Upload
                                </div>
                        }
                    </label>
                    <AntdComponents.Form form={addForm} layout='vertical' onFinish={handleFinish}>
                        <AntdComponents.Form.Item name={'community_name'} className=''
                            label={
                                <AntdComponents.Typography className='description font-semibold'>
                                    Community name
                                </AntdComponents.Typography>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Community name is required!'
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
                        <AntdComponents.Form.Item name={'description'} className=''
                            label={
                                <AntdComponents.Typography className='description font-semibold'>
                                    Description
                                </AntdComponents.Typography>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Description name is required!'
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
                        <AntdComponents.Form.Item name={'guideline'} className=''
                            label={
                                <AntdComponents.Typography className='description font-semibold'>
                                    Guideline
                                </AntdComponents.Typography>
                            }
                        >
                            {/* <AntdComponents.Input.TextArea rows={4} className='input-box' /> */}
                            <JoditEditorCommon
                                value={addForm.getFieldValue('guideline')} // Synchronize with form's field value
                                onChange={(newValue) => addForm.setFieldsValue({ guideline: newValue })}
                            />
                        </AntdComponents.Form.Item>
                        <OutlineButton title={particularDetail?._id ? 'Update' : 'Create'} isLoading={isLoading} htmlType='submit' className={'bg-Black'} classNameDiv='my-5' />
                    </AntdComponents.Form>
                </div>
            </AntdComponents.Modal >
        </div >
    )
}

export default AddEditModal
