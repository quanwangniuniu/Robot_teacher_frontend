import React, {useState} from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Form, Image, Input, Slider, Space, TreeSelect} from 'antd';
import axios from "axios";
import config from "../../api/config";

const PieChart = () => {
    const [imageData, setImageData] = useState('');
    const onFinish = (values) => {
        console.log('Received values of form:', values);
        axios.post(`${config.apiUrl}/charthandler/piechart/`,values)
            .then((response)=>{
                console.log(response)
                // 从响应中提取图像的 Base64 编码数据
                const image_data = response.data.image_data;
                setImageData(image_data);
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
        <Form.Item label="饼图标题" name="pie_title" rules={[{ required: true , message:'需要填入当前饼图的标题'}]} >
            <Input />
        </Form.Item>
        <Form.List name="piecharts_data">
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
                                name={[name, 'pie_sizes']}
                                rules={[
                                    {
                                        required: true,
                                        message: '缺少当前扇区大小值',
                                    },
                                ]}
                            >
                                <Input placeholder="扇区大小"/>
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'pie_labels']}
                                rules={[
                                    {
                                        required: true,
                                        message: '缺少当前扇区标签',
                                    },
                                ]}
                            >
                                <Input placeholder="扇区标签"/>
                            </Form.Item>
                            <Form.Item
                                label="扇区颜色"
                                {...restField} name={[name, 'pie_colors']}
                                rules={[
                                    {
                                        required: true,
                                        message: '缺少扇区颜色',
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
                            <div style={{width:100}}>扇区偏移量:</div>
                            <Form.Item
                                {...restField}
                                name={[name, 'pie_explodes']}
                                rules={[
                                    {
                                        required: true,
                                        message: '缺少当前扇区偏移量',
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
                            添加一组饼图数据
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
        <Form.Item>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
            {imageData && <Image src={`data:image/png;base64,${imageData}`} alt="piegram" />}

        </>
    )
};
export default PieChart;