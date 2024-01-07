import React, {useState} from 'react';
import {Button, Card, Flex, Input, Modal, Space, Tooltip, Typography} from 'antd';
import adminImage from '../../contact/images/images/admin.png'
import {EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UserOutlined} from "@ant-design/icons";
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
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
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
                                />
                                <Input.Password
                                    placeholder="输入匹配的密码"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    style={{width:300}}
                                />
                            </Space>
                        </Modal>
                    </>
                </Flex>
            </Flex>
        </Card>
    )
};
export default ThirdCard;