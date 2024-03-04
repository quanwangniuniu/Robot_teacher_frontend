import React, {useState} from 'react';
import {Button, Card, Flex, Modal, Typography, Input, Space, Tooltip, message, Form} from 'antd';
import studentImage from '../../contact/images/images/student.png'
import config from '../../../api/config'
import {EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const cardStyle = {
    width: 900,
    margin:25
};
const imgStyle = {
    display: 'block',
    width: 273,
};

const FirstCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue_stu_phone,setInputValue_stu_phone] = useState('');
    const [inputValue_stu_pwd,setInputValue_stu_pwd] = useState('');
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const showRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };
    const [messageApi, contextHolder] = message.useMessage();
    const login_success = () => {
        messageApi.open({
            type: 'success',
            content: '登录成功',
        });
    };
    const login_error = () => {
        messageApi.open({
            type: 'error',
            content: '登录中遇到了问题，请重试',
        });
    };
    const login_warning = () => {
        messageApi.open({
            type: 'warning',
            content: '用户不存在或账号密码不匹配',
        });
    };

    const navigate = useNavigate()
    const handleOk = async () => {
        setIsModalOpen(false);
        try {
            const response = await fetch(`${config.apiUrl}/studenthandler/student_login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({inputValue_stu_phone, inputValue_stu_pwd}),
            });
            if (response.ok) {
                // Login successful
                login_success();
                sessionStorage.setItem('username',inputValue_stu_phone)
                const data = await response.json()
                console.log(data.student_id)
                const user_id = data.student_id
                sessionStorage.setItem('student_id',user_id)
                navigate('/studentIndex/student_newRobot',{replace:true})
            } else {
                // Handle login failure
                console.log(response)
                login_warning()
            }
        } catch (error) {
            login_error()
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleRegister = async (values) => {
        setIsRegisterModalOpen(false);
        console.log("handleRegister:",values)
        axios.post(`${config.apiUrl}/studenthandler/student_register/`,values)
            .then((response)=>{
                alert("新的学生用户创建成功！现在可以登录啦！")
                console.log('成功创建新的学生用户',response.data);
            })
            .catch((error)=>{
                alert("创建失败,用户已存在,请尝试更换用户名、邮箱或手机号,并重试",)
                console.error('创建新的学生用户失败:',error)
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleRegisterCancel = () => {
        setIsRegisterModalOpen(false);
    };
    const handlePhoneChange=(e)=>{
        const value = e.target.value;
        setInputValue_stu_phone(value);
    };
    const handlePwdChange=(e)=>{
        const value = e.target.value;
        setInputValue_stu_pwd(value);
    };
    return(
        <>
            {contextHolder}
        <Card
            hoverable
            style={cardStyle}
            bodyStyle={{
                padding: 0,
                overflow: 'hidden',
            }}
        >
            <Flex justify="space-between">
                <img
                    alt="avatar"
                    src={studentImage}
                    style={imgStyle}
                />
                <Flex
                    vertical
                    align="flex-end"
                    justify="space-between"
                    style={{
                        padding: 32,
                    }}
                >
                    <Typography.Title level={3}>
                        "智能伴侣，与你共享学习旅程"
                    </Typography.Title>
                    <>
                        <Button type="primary" onClick={showModal}>
                            学生端
                        </Button>
                        <Modal title="学生端登录窗口" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} keyboard={true} okText="登录">
                            <Space direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Input
                                    placeholder="请输入学生用户的用户名"
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    suffix={
                                        <Tooltip title="手机号必须符合中国大陆手机号格式">
                                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                    style={{width:300}}
                                    onChange={handlePhoneChange}
                                />
                                <Input.Password
                                    placeholder="输入匹配的密码"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    style={{width:300}}
                                    onChange={handlePwdChange}
                                />
                            </Space>
                            <p style={{color:"orange"}} onClick={showRegisterModal}>没有账户？那就点我注册成为一个学生用户</p>
                        </Modal>
                        <Modal title="学生用户注册窗口" open={isRegisterModalOpen}  onCancel={handleRegisterCancel} keyboard={true} okText="注册" footer={null}>
                                <Form
                                    name="学生用户注册"
                                    onFinish={handleRegister}
                                    onFinishFailed={onFinishFailed}
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    <Form.Item
                                        label="用户名"
                                        name="username"
                                        rules={[{ required: true, message: '请输入用户名' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="用户邮箱"
                                        name="email"
                                        rules={[
                                            { required: true, message: '请输入用户邮箱' },
                                            { type: 'email', message: '请输入有效的邮箱地址' },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="用户手机号"
                                        name="phone_number"
                                        rules={[
                                            { required: true, message: '请输入用户手机号' },
                                            {
                                                pattern: /^1[3456789]\d{9}$/,
                                                message: '请输入有效的手机号码',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="用户班级"
                                        name="in_class"
                                        rules={[{ required: true, message: '请输入用户班级' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="设置密码"
                                        name="password"
                                        rules={[{ required: true, message: '请输入用户密码' }]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item
                                        label="确认密码"
                                        name="password"
                                        rules={[{ required: true, message: '请确认用户密码' }]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                                        <Button type="primary" htmlType="submit" onClick={handleRegister}>
                                            注册用户
                                        </Button>
                                    </Form.Item>
                                </Form>
                        </Modal>
                    </>
                </Flex>
            </Flex>
        </Card>
        </>
    )
};
export default FirstCard;