import React, {useState} from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Form, Input,Space,TreeSelect} from 'antd';
import axios from "axios";
import config from "../../api/config";

const LineChart = () => {
    const [image, setImage] = useState(null);
    const onFinish = (values) => {
        console.log('Received values of form:', values);
        axios.post(`${config.apiUrl}/charthandler/linechart/`,values)
            .then((response)=>{
                console.log(response)
                if (response.data.success && response.data.image) {
                    setImage(`data:image/png;base64,${response.data.image}`);
                } else {
                    console.error('Failed to receive image from the backend');
                }
            })
            .catch((error)=>{
                console.error(error)
            })
    };
    return(
        <>
            <Form
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                autoComplete="off"
            >
                <Form.Item label="折线图标题" name="line_title" rules={[{ required: true , message:'需要填入当前折线图的标题'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="x轴标签" name="line_xlabel" rules={[{ required: true , message:'需要填入当前折线图的x轴标签'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="y轴标签" name="line_ylabel" rules={[{ required: true , message:'需要填入当前折线图的y轴标签'}]} >
                    <Input />
                </Form.Item>
                <Form.List name="linecharts_data">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                        width:1800
                                    }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'line_label']}
                                        rules={[
                                            {
                                                required: true,
                                                message: '缺少当前折线图标签',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="当前样本标签"/>
                                    </Form.Item>
                                    <Form.Item {...restField} label="本组数据起始值" name={[name, 'line_start']} rules={[{ required: true , message:'需要填入当前折线图的数据起始值'}]} >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item {...restField} label="本组数据终止值" name={[name, 'line_stop']} rules={[{ required: true , message:'需要填入当前折线图的数据终止值'}]} >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item {...restField} label="本组数据生成数量" name={[name, 'line_num']} rules={[{ required: true , message:'需要填入当前折线图的数据量'}]} >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="折线函数类型"
                                        style={{width: 200}}
                                        name={[name, 'line_functiontype']}
                                        rules={[
                                            {
                                                required: true,
                                                message: '缺少当前样函数类型',
                                            },
                                        ]}
                                    >
                                        <TreeSelect
                                            treeData={[
                                                {title: 'sin(x)', value: 'sin(x)'},
                                                {title: 'cos(x)', value: 'cos(x)'},
                                                {title: 'sin(2x)', value: 'sin(2x)'},
                                                {title: 'cos(2x)', value: 'cos(2x)'},
                                                {title: 'exp(x)', value: 'exp(x)'},
                                                {title: 'log(x)', value: 'log(x)'},
                                            ]}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="折线线体类型"
                                        style={{width: 200}}
                                        name={[name, 'line_gridtype']}
                                        rules={[
                                            {
                                                required: true,
                                                message: '缺少当前样网格类型',
                                            },
                                        ]}
                                    >
                                        <TreeSelect
                                            treeData={[
                                                {title: '--', value: '--'},
                                                {title: '-', value: '-'},
                                                {title: ':', value: ':'},
                                                {title: '-.', value: '-.'},
                                            ]}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="当前图例颜色"
                                        {...restField} name={[name, 'line_colors']}
                                        rules={[
                                            {
                                                required: true,
                                                message: '缺少图例颜色',
                                            },
                                        ]}
                                        style={{width: 200}}
                                    >
                                        <TreeSelect
                                            treeData={[
                                                {title: '绿色', value: 'green'},
                                                {title: '红色', value: 'red'},
                                                {title: '蓝色', value: 'blue'},
                                                {title: '橙色', value: 'orange'},
                                                {title: '黄色', value: 'yellow'},
                                                {title: '紫色', value: 'purple'}
                                            ]}
                                        />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    添加一组折线图数据
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        生成
                    </Button>
                </Form.Item>
            </Form>
            {/* Display the image */}
            {image && <img src={`data:image/png;base64,${image}`} alt="Matplotlib Chart" />}
        </>
    )
};
export default LineChart;