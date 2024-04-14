import React, { useState } from 'react';
import { Form, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import moment from 'moment'; // 引入moment库
import {useLocation} from 'react-router-dom'
import config from "../../api/config";

const { Option } = Select;
const NewRobot = (props) => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const isStudentService = location.pathname.includes('student')
    const [finishTime, setFinishTime] = useState(null)
    const handleFinishTimeChange = (date,dateString)=>{
        setFinishTime(dateString)
    }
    const getFormattedDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const startTime = getFormattedDateTime();
    const onFinish = async (values) => {
        delete values.finishTime
        values.start_time = startTime
        values.end_time = finishTime
        values.user_id = sessionStorage.getItem("student_id")
        setLoading(true);
        try {
            const response = await axios.post(`${config.apiUrl}/conversationhandler/create_robot/`, values);
            message.success(response.data.message);
            //alert(response.data.message);
        } catch (error) {
            message.error('Failed to create chatbot');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            name="create_chatbot_form"
            onFinish={onFinish}
            initialValues={{
                startTime: moment(),
                role: 'student',
            }}
        >
            <Form.Item
                name="title"
                label="机器人名称"
                rules={[
                    { required: true, message: '请输入机器人名称' },
                ]}
            >
                <Input placeholder="请输入机器人名称" />
            </Form.Item>
            <Form.Item
                name="robot_model"
                label="模型选择"
                rules={[{ required: true, message: '请选择模型' }]}
            >
                <Select placeholder="请选择模型">
                    <Option value="qwen-max">Meicy-1.8B</Option>
                    <Option value="qwen-2b">qwen-2b</Option>
                    <Option value="qwen-turbo">qwen-turbo</Option>
                    <Option value="qwen-plus">qwen-plus</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="roles"
                label="角色选择"
                rules={[{ required: true, message: '请选择机器人需要扮演的角色' }]}
            >
                <Select placeholder="请选择角色">
                    <Option value="代码工程师">代码工程师</Option>
                    <Option value="设计助手">设计助手</Option>
                    <Option value="专业课程助手">专业课程助手</Option>
                    <Option value="概念解释助手">概念解释助手</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="robot_prompt"
                label="提示词"
                rules={[
                    { required: true, message: '请输入提示词' },
                    { max: 100, message: '提示词最多100个字符' },
                ]}
            >
                <Input.TextArea placeholder="设定机器人的行为并告知他们如何回应用户消息，请尽可能详细说明" rows={4} />
            </Form.Item>
            <Form.Item
                name="finishTime"
                label="结束时间"
                initialValue={finishTime}
                rules={[{ required: true, message: '请选择结束时间' }]}
            >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={handleFinishTimeChange}/>
            </Form.Item>
            <Form.Item
                name="user_type"
                label="机器人创建服务对象"
                initialValue={isStudentService ? 'student' : 'teacher'}
            >
                <Input disabled defaultValue={isStudentService ? '学生' : '老师'} /> {/* 根据路径设置服务对象 */}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    创建机器人
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NewRobot;


