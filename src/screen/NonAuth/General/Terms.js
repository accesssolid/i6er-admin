import React, { useEffect, useRef, useState } from 'react'
import JoditEditor from "jodit-react"
import { RouterKeys } from '../../../Routes/RouterKeys'
import * as AntdComponents from 'antd'
import { Link } from 'react-router-dom'
import { useDynamicMutationMutation, useDynamicQueryQuery } from '../../../redux/service/apiSlice'
import { Endpoints } from '../../../utils/Endpoints'
import { QueryKeys } from '../../../utils/RTKKeys'
import CustomToast from '../../../utils/CustomToast'
import Loader from '../../../components/Loader'
import CustomButton from '../../../components/CustomButton'


const buttons = [
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "superscript",
    "subscript",
    "brush",
    "|",
    "align",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "paragraph",
    "|",
    "link",
    "table",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "selectall",
    "print"
]

const config = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    defaultTextAlignment: 'left',
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    buttons: buttons,
    width: 'auto',
    height: 600,
    style: {
        color: 'var(--defaultWhiteColor)',
        textAlign: 'left',
        background: 'var(--darkGrey)'
    },
    placeholder: ''
}

const Terms = () => {
    const breadcrumbItems = [
        { title: <Link className='un_active text-Red' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <AntdComponents.Typography className='active'>Terms & Conditions</AntdComponents.Typography> }
    ];
    const [updateMutation, { isLoading: statusUpdateLoading }] = useDynamicMutationMutation();
    const editor = useRef()
    const [mainData, setMainData] = useState({
        data: ''
    })

    const { data, isLoading } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.COMMON_CONTENT,
        params: {},
        key: QueryKeys.COMMON_CONTENT,
    },{skip:false,refetchOnMountOrArgChange:true}
)
    let allData = data?.data

    useEffect(() => {
        if (allData?.terms_conditions) {
            setMainData({ data: allData?.terms_conditions })
        }
    }, [data])

    const updateFunc = async () => {
        let requestData = {
            endpoint: Endpoints.NON_AUTH.COMMON_CONTENT_UPDATE,
            method: 'PUT',
            body: { terms_conditions: mainData?.data },
            key: QueryKeys.COMMON_CONTENT
        };

        try {
            const { data, error } = await updateMutation(requestData);
            if (data) {
                CustomToast('s', data?.message);
            } else {
                CustomToast('e', error?.data?.message);
            }
        } catch (err) {
            CustomToast('e', 'An unexpected error occurred.');
        }
    }
    const handleBlur = (newContent) => {
        // Replace background colors with transparent and black text (rgb(0, 0, 0)) with white (#ffffff)
        const sanitizedContent = newContent
            .replace(/background-color:\s*[^;]+;/g, 'background-color:transparent;') // Replace any background color
            .replace(/color:\s*rgb\(0,\s*0,\s*0\);/g, 'color:#ffffff;'); // Replace black color in RGB format with white
        setMainData((prevData) => ({
            ...prevData,
            data: sanitizedContent
        }))
    };
    return (
        <div>
            <div className="flex flex-col md:flex-row w-full justify-between md:items-center mt-4 md:0">
                <AntdComponents.Breadcrumb items={breadcrumbItems} separator={<h4 className='text-White'>/</h4>} />
                <div className="mt-3 md:mt-0">
                    <CustomButton isLoading={statusUpdateLoading} className={'bg-Blue w-2/3 md:w-60'} title={'Update'} onClick={() => updateFunc()} />
                </div>
            </div>
            <div className="mt-4 bg-DarkGrey p-5 rounded-10">
                {
                    isLoading ? <Loader />
                        :
                        <JoditEditor ref={editor} value={mainData?.data} config={config} style={{ textAlign: 'left' }} tabIndex={0}
                            onChange={(newContent) => handleBlur(newContent)}
                        />
                }
            </div>

        </div>
    )
}

export default Terms
