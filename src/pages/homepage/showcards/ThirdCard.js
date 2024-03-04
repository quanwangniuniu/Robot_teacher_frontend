import React, {useState} from 'react';
import {Button, Card, Flex, Input, message, Modal, Space, Tooltip, Typography} from 'antd';
import adminImage from '../../contact/images/images/admin.png'
import {EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import config from "../../../api/config";
const cardStyle = {
    width: 900,
    margin:25
};
const imgStyle = {
    display: 'block',
    width: 273,
};

const ThirdCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const [inputValue_admin_username,setInputValue_admin_username] = useState('');
    const [inputValue_admin_pwd,setInputValue_admin_pwd] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const handlePhoneChange=(e)=>{
        const value = e.target.value;
        setInputValue_admin_username(value);
    };
    const handlePwdChange=(e)=>{
        const value = e.target.value;
        setInputValue_admin_pwd(value);
    };
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
            const response = await fetch(`${config.apiUrl}/adminhandler/admin_login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({inputValue_admin_username, inputValue_admin_pwd}),
            });
            if (response.ok) {
                // Login successful
                login_success();
                sessionStorage.setItem('username',inputValue_admin_username)
                const data = await response.json()
                console.log(data.admin_id)
                const user_id = data.admin_id
                sessionStorage.setItem('admin_id',user_id)
                navigate('/adminIndex/application_statics',{replace:true})
            } else {
                // Handle login failure
                console.log(response)
                login_warning()
            }
        } catch (error) {
            console.log(error)
            login_error()
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
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
                    src={adminImage}
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
                        "智能引导，管理智慧！"
                    </Typography.Title>
                    <>
                        {/* eslint-disable-next-line no-undef */}
                        <Button type="primary" onClick={showModal}>
                            管理端
                        </Button>
                        <Modal title="管理员端登录窗口" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} keyboard={true} okText="登录">
                            <Space direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Input
                                    placeholder="请输入管理员用户的手机号"
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
                        </Modal>
                    </>
                </Flex>
            </Flex>
        </Card>
        </>
    )
};
export default ThirdCard;