import React, { useState } from 'react';
import { Form, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import moment from 'moment'; // 引入moment库
import {useLocation} from 'react-router-dom'
import config from "../../api/config";
import {ClockCircleTwoTone, SmileTwoTone} from "@ant-design/icons";

const { Option } = Select;
const NewTeacherRobot = (props) => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const isTeacherService = location.pathname.includes('teacher')
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
        values.user_id = sessionStorage.getItem("teacher_id")
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
                role: 'teacher',
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
                    <Option value="销售总监">销售总监</Option>
                    <Option value="客户服务经理">客户服务经理</Option>
                    <Option value="网络工程师">网络工程师</Option>
                    <Option value="系统管理员">系统管理员</Option>
                    <Option value="财务分析师">财务分析师</Option>
                    <Option value="会计">会计</Option>
                    <Option value="出纳员">出纳员</Option>
                    <Option value="审计员">审计员</Option>
                    <Option value="市场营销经理">市场营销经理</Option>
                    <Option value="公关经理">公关经理</Option>
                    <Option value="广告策划师">广告策划师</Option>
                    <Option value="内容创作者">内容创作者</Option>
                    <Option value="数据分析师">数据分析师</Option>
                    <Option value="数据科学家">数据科学家</Option>
                    <Option value="商业智能分析师">商业智能分析师</Option>
                    <Option value="数据工程师">数据工程师</Option>
                    <Option value="项目经理">项目经理</Option>
                    <Option value="产品经理">产品经理</Option>
                    <Option value="项目协调员">项目协调员</Option>
                    <Option value="项目分析师">项目分析师</Option>
                    <Option value="软件架构师">软件架构师</Option>
                    <Option value="数据库管理员">数据库管理员</Option>
                    <Option value="DevOps工程师">DevOps工程师</Option>
                    <Option value="系统分析师">系统分析师</Option>
                    <Option value="平面设计师">平面设计师</Option>
                    <Option value="UI/UX设计师">UI/UX设计师</Option>
                    <Option value="交互设计师">交互设计师</Option>
                    <Option value="动画设计师">动画设计师</Option>
                    <Option value="前端开发工程师">前端开发工程师</Option>
                    <Option value="后端开发工程师">后端开发工程师</Option>
                    <Option value="移动开发工程师">移动开发工程师</Option>
                    <Option value="全栈开发工程师">全栈开发工程师</Option>
                    <Option value="运维工程师">运维工程师</Option>
                    <Option value="网络安全工程师">网络安全工程师</Option>
                    <Option value="系统运维工程师">系统运维工程师</Option>
                    <Option value="云计算工程师">云计算工程师</Option>
                    <Option value="销售代表">销售代表</Option>
                    <Option value="渠道销售">渠道销售</Option>
                    <Option value="客户关系经理">客户关系经理</Option>
                    <Option value="市场拓展经理">市场拓展经理</Option>
                    <Option value="行政助理">行政助理</Option>
                    <Option value="人力资源专员">人力资源专员</Option>
                    <Option value="招聘专员">招聘专员</Option>
                    <Option value="培训专员">培训专员</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="robot_prompt"
                label="提示词"
                rules={[
                    { required: true, message: '请输入提示词' },
                    { max: 200, message: '提示词最多200个字符' },
                ]}
            >
                <Input.TextArea placeholder="设定机器人的行为并告知他们如何回应用户消息，请尽可能详细说明" rows={4} />
            </Form.Item>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ClockCircleTwoTone style={{ marginRight: '8px' ,marginBottom:22}} />
                <Form.Item
                    name="finishTime"
                    label="结束时间"
                    initialValue={finishTime}
                    rules={[{ required: true, message: '请选择结束时间' }]}
                >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={handleFinishTimeChange}/>
                </Form.Item>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <SmileTwoTone style={{ marginRight: '8px' ,marginBottom:22}} />
                <Form.Item
                    name="user_type"
                    label="机器人创建服务对象"
                    initialValue={isTeacherService ? 'teacher' : 'teacher'}
                >
                    <Input disabled defaultValue={isTeacherService ? '老师' : '学生'} /> {/* 根据路径设置服务对象 */}
                </Form.Item>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} style={{justifyContent: 'center' }}>
                    创建机器人
                </Button>
            </Form.Item>
            </div>
        </Form>
    );
};

export default NewTeacherRobot;


