import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Select, Tooltip, message} from 'antd';
import config from "../../api/config";

const { Option } = Select;

const ModelManage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${config.apiUrl}/adminhandler/get_model_parameter/`);
            const responseData = await response.json();
            setInitialValues(responseData);
        };
        fetchData();
    }, []);

    const handleSubmit = async (values) => {
        setLoading(true);
        // Send PUT request to update backend data
        fetch(`${config.apiUrl}/adminhandler/edit_model_parameter/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                message.success("参数更新成功！")
            })
            .catch(error => {
                console.error('Error updating student data:', error);
            });
        setLoading(false);
    };

    return (
        <Form form={form} onFinish={handleSubmit} layout="vertical" initialValues={initialValues}>
            <Form.Item
                name="learningRate"
                label={
                    <Tooltip title="常见范围：0.001 - 0.01">
                        <span>学习率</span>
                    </Tooltip>
                }
                rules={[{ required: true, message: '请输入学习率!' }]}
            >
                <Input placeholder="学习率" />
            </Form.Item>
            <Form.Item
                name="batchSize"
                label={
                    <Tooltip title="常见范围：16 - 256">
                        <span>批量大小</span>
                    </Tooltip>
                }
                rules={[{ required: true, message: '请输入批量大小!' }]}
            >
                <Input placeholder="批量大小" />
            </Form.Item>
            <Form.Item
                name="epochs"
                label={
                    <Tooltip title="常见范围：10 - 100">
                        <span>训练周期数</span>
                    </Tooltip>
                }
                rules={[{ required: true, message: '请输入训练周期数!' }]}
            >
                <Input placeholder="训练周期数" />
            </Form.Item>
            <Form.Item
                name="hiddenLayerSize"
                label={
                    <Tooltip title="常见范围：32 - 512">
                        <span>隐藏层大小</span>
                    </Tooltip>
                }
                rules={[{ required: true, message: '请输入隐藏层大小!' }]}
            >
                <Input placeholder="隐藏层大小" />
            </Form.Item>
            <Form.Item
                name="vocabularySize"
                label={
                    <Tooltip title="常见范围：10000 - 100000">
                        <span>词汇表大小</span>
                    </Tooltip>
                }
                rules={[{ required: true, message: '请输入词汇表大小!' }]}
            >
                <Input placeholder="词汇表大小" />
            </Form.Item>
            <Form.Item
                name="maxSeqLength"
                label={
                    <Tooltip title="常见范围：50 - 500">
                        <span>最大序列长度</span>
                    </Tooltip>
                }
                rules={[{ required: true, message: '请输入最大序列长度!' }]}
            >
                <Input placeholder="最大序列长度" />
            </Form.Item>
            <Form.Item
                name="dropoutRate"
                label={
                    <Tooltip title="常见范围：0.1 - 0.5">
                        <span>Dropout率</span>
                    </Tooltip>
                }
                rules={[{ required: true, message: '请输入Dropout率!' }]}
            >
                <Input placeholder="Dropout率" />
            </Form.Item>
            <Form.Item
                name="gradientClippingThreshold"
                label={
                    <Tooltip title="常见范围：1.0 - 5.0">
                        <span>梯度裁剪阈值</span>
                    </Tooltip>
                }
                rules={[{ required: true, message: '请输入梯度裁剪阈值!' }]}
            >
                <Input placeholder="梯度裁剪阈值" />
            </Form.Item>
            <Form.Item
                name="optimizer"
                label="优化器选择"
                rules={[{ required: true, message: '请选择优化器!' }]}
            >
                <Select placeholder="请选择优化器">
                    <Option value="adam">Adam</Option>
                    <Option value="sgd">SGD</Option>
                    <Option value="rmsprop">RMSProp</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="lossFunction"
                label="损失函数选择"
                rules={[{ required: true, message: '请选择损失函数!' }]}
            >
                <Select placeholder="请选择损失函数">
                    <Option value="crossEntropy">交叉熵</Option>
                    <Option value="meanSquaredError">均方误差</Option>
                    <Option value="binaryCrossEntropy">二元交叉熵</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ModelManage;
