import React, {useState} from 'react';
import {Button, Form, Input, Switch, TreeSelect} from 'antd';
import axios from "axios";
import config from "../../api/config";
import { Image } from 'antd';

const HistChart = () => {
    const [imageData, setImageData] = useState('');

    const onFinish = (values) => {
        console.log('Received values of form:', values);
        axios.post(`${config.apiUrl}/charthandler/histchart/`,values)
            .then(async (response) => {
                console.log(response)
                if (response.data.success) {
                    console.log(response.data.image_data)
                    // 从响应中提取图像的 Base64 编码数据
                    const image_data = response.data.image_data;
                    setImageData(image_data);
                }
            })
            .catch((error)=>{
                console.error(error)
            })
    };
    const [status,setStatus] = useState(false)
    const onSwitchChange = (checked) => {
        console.log(`switch to ${checked}`);
        setStatus(!status)
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
                <Form.Item label="直方图标题" name="hist_title" rules={[{ required: true , message:'需要填入当前直方图的标题'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="x轴标签" name="hist_xlabel" rules={[{ required: true , message:'需要填入当前直方图的x轴标签'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="y轴标签" name="hist_ylabel" rules={[{ required: true , message:'需要填入当前直方图的y轴标签'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="样本最小值" name="hist_low" rules={[{ required: true , message:'需要填入当前直方图的样本最小值'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="样本最大值" name="hist_high" rules={[{ required: true , message:'需要填入当前直方图的样本最大值'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="样本量" name="hist_size" rules={[{ required: true , message:'需要填入当前直方图的样本量'}]} >
                    <Input />
                </Form.Item>
                是否开启网格线：
                <Form.Item lable="是否开启网格线" name="hist_status">
                    <Switch defaultChecked={true} onChange={onSwitchChange} />
                </Form.Item>
                <Form.Item
                    label="网格线线体类型"
                    style={{width: 200}}
                    name="hist_gridtype"
                >
                    <TreeSelect
                        treeData={[
                            {title: '--', value: '--'},
                            {title: '-', value: '-'},
                            {title: ':', value: ':'},
                            {title: '-.', value: '-.'},
                        ]}
                        disabled={status}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        生成直方图
                    </Button>
                </Form.Item>
            </Form>
            {imageData && <Image src={`data:image/png;base64,${imageData}`} alt="Histogram" />}

        </>
    )
};
export default HistChart;