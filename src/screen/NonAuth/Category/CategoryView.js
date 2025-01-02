import React from 'react'
import * as AntdComponents from 'antd'
import { Link, useLocation } from 'react-router-dom';
import { RouterKeys } from '../../../Routes/RouterKeys';

const CategoryView = () => {
    const location = useLocation()
    const detailData =location.state.data
    console.log('detailData',detailData);
    
    const breadcrumbItems = [
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.HOME} >Home</Link> },
        { title: <Link className='un_active text-White' to={RouterKeys.NON_Auth.CATEGORY}>Category</Link> },
        { title: <AntdComponents.Typography className='active'>Category name</AntdComponents.Typography> },
    ];
    const [form] = AntdComponents.Form.useForm()
    React.useEffect(() => {
        form.setFieldsValue({
            'category_name': detailData?.name,
            'plan_type': detailData?.plan_type,
            'questions': detailData?.question?.map((item)=>({question:item}))
        })
    }, [])
    return (
        <div>
            <AntdComponents.Breadcrumb items={breadcrumbItems} separator={<h4 className='text-White'>/</h4>} />
            <div className="bg-DarkGrey rounded-10 px-4 py-3 mt-5">
                <AntdComponents.Form form={form} layout='vertical'>
                    <AntdComponents.Row gutter={{ xs: 0, lg: 20 }}>
                        <AntdComponents.Col xs={24} sm={24} md={12} lg={8} xl={8} >
                            <AntdComponents.Form.Item name={'category_name'}
                                label={
                                    <AntdComponents.Typography className='paragraph font-semibold'>
                                        Category name
                                    </AntdComponents.Typography>
                                }
                            >
                                <AntdComponents.Input className='input-box' readOnly />
                            </AntdComponents.Form.Item>
                        </AntdComponents.Col>
                        <AntdComponents.Col xs={24} sm={24} md={12} lg={8} xl={8} >
                            <AntdComponents.Form.Item name={'plan_type'}
                                label={
                                    <AntdComponents.Typography className='paragraph font-semibold'>
                                        Plan Type
                                    </AntdComponents.Typography>
                                }
                            >
                                <AntdComponents.Input className='input-box capitalize' readOnly />
                            </AntdComponents.Form.Item>
                        </AntdComponents.Col>
                    </AntdComponents.Row>
                    <div className="md:pe-14">
                        <AntdComponents.Typography className='paragraph font-semibold mb-2'>Questions</AntdComponents.Typography>
                        <AntdComponents.Form.List name={'questions'} className=''>
                            {
                                (fields, { add, remove }) => (
                                    <>
                                        {
                                            fields.map(({ key, name, ...restField }, index) => (
                                                <AntdComponents.Row gutter={[16, 16]} key={key}>
                                                    <AntdComponents.Col xl={24}>
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
                                                            <AntdComponents.Input className='input-box' readOnly />
                                                        </AntdComponents.Form.Item>
                                                    </AntdComponents.Col>
                                                </AntdComponents.Row>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </AntdComponents.Form.List>
                    </div>
                </AntdComponents.Form>
            </div>

           
        </div>
    )
}

export default CategoryView
