import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Form, Input, Slider, Space, TreeSelect} from 'antd';
import axios from "axios";
import config from "../../api/config";
const onFinish = (values) => {
    console.log('Received values of form:', values);
    axios.post(`${config.apiUrl}/charthandler/boxchart/`,values)
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.error(error)
        })
};
const BoxChart = () => {
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
                <Form.Item label="箱型图标题" name="box_title" rules={[{ required: true , message:'需要填入当前箱型图的标题'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="x轴标签" name="box_xlabel" rules={[{ required: true , message:'需要填入当前箱型图的x轴标签'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="y轴标签" name="box_ylabel" rules={[{ required: true , message:'需要填入当前箱型图的y轴标签'}]} >
                    <Input />
                </Form.Item>
                <Form.List name="boxcharts_data">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                        width:800
                                    }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'box_label']}
                                        rules={[
                                            {
                                                required: true,
                                                message: '缺少当前样本标签',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="当前样本标签"/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'box_loc']}
                                        rules={[
                                            {
                                                required: true,
                                                message: '缺少当前样本起始值',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="loc"/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'box_scale']}
                                        rules={[
                                            {
                                                required: true,
                                                message: '缺少当前样本刻度',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="scale"/>
                                    </Form.Item>
                                    <Form.Item
                                        label="当前图例颜色"
                                        {...restField} name={[name, 'box_colors']}
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
                                    <div style={{width:100}}>样本总量:</div>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'box_size']}
                                        rules={[
                                            {
                                                required: true,
                                                message: '缺少当前样本总量',
                                            },
                                        ]}
                                        style={{width: 200}}
                                    >
                                        {/*偏移量:*/}
                                        <Slider initialValues={0} disabled={false} max={100} style={{marginTop:8}} />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    添加一组箱型图数据
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
        </>
    )
};
export default BoxChart;