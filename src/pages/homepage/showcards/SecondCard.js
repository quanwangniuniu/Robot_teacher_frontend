import React, {useState} from 'react';
import {Button, Card, Flex, Input, Modal, Space, Tooltip, Typography} from 'antd';
import teacherImage from '../../contact/images/images/teacher.png'
import {EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UserOutlined} from "@ant-design/icons";
const cardStyle = {
    width: 900,
    margin:25
};
const imgStyle = {
    display: 'block',
    width: 273,
};

const SecondCard = () => {
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
                    src={teacherImage}
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
                        "教学良伴，开启教育智慧！"
                    </Typography.Title>
                    <>
                        <Button type="primary" onClick={showModal}>
                            教师端
                        </Button>
                        <Modal title="教师端登录窗口" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} keyboard={true} okText="登录">
                            <Space direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Input
                                    placeholder="请输入教师用户的手机号"
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
                            <p style={{}}>注册教师用户</p>
                        </Modal>
                    </>
                </Flex>
            </Flex>
        </Card>
    )
};
export default SecondCard;