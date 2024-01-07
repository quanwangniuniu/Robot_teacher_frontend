import React, {useState} from 'react';
import {Button, Card, Flex, Modal, Typography, Input, Space, Tooltip} from 'antd';
import studentImage from '../../contact/images/images/student.png'
import config from '../../../api/config'
import {EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UserOutlined} from "@ant-design/icons";
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
    const showModal = () => {
        setIsModalOpen(true);
    };
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
                console.log('Login successful');
            } else {
                // Handle login failure
                console.log(response)
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
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
                                    placeholder="请输入学生用户的手机号"
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
                            <p style={{}}>注册学生用户</p>
                        </Modal>
                    </>
                </Flex>
            </Flex>
        </Card>
    )
};
export default FirstCard;