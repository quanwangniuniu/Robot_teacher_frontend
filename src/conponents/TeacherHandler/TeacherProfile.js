// teacherProfile.js
import React, {useEffect, useState} from 'react';
import {Badge, Button, Descriptions, Flex, Form, Modal, Input, message} from 'antd';
import config from "../../api/config";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const TeacherProfile = () => {
    const [teacherData,setteacherData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 注销功能
    const navigate = useNavigate();
    const Logout = ()=> {
        // 清除浏览器session中的值
        sessionStorage.clear();
        alert('注销成功,即将返回首页！');
        navigate('/');
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: '更新成功',
        });
    };

    const update_error = () => {
        messageApi.open({
            type: 'error',
            content: '更新时遇到错误，请重试',
        });
    };

    const onFinish = (values) => {
        // 在这里处理表单提交逻辑
        const teacher_id = sessionStorage.getItem('teacher_id')
        axios.post(`${config.apiUrl}/teacherhandler/update_teacherUser_by_id/${teacher_id}/`,values)
            .then((response)=>{
                   setIsModalOpen(false)
                   sessionStorage.setItem('username',values.username)
                   window.location.reload(); // 刷新整个页面
                   success();
                }
            )
            .catch((error)=>{
                console.error(error);
                update_error();
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(()=>{
        const fetchData = async () => {
            try {
                let teacher_id = sessionStorage.getItem('teacher_id');
                const response = await fetch(`${config.apiUrl}/teacherhandler/get_teacherUser_by_id/${teacher_id}`);
                const data = await response.json();
                setteacherData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        // Call the fetchData function
        fetchData();
    },[]);
    if(!teacherData)
    {
        return <p>加载中...</p>
    }
    const statusText = teacherData.is_active === true ? '正常启用':'状态异常';
    const items = [
    {
        key: '1',
        label: '用户id',
        children: teacherData.teacher_id,
    },
    {
        key: '2',
        label: '用户名',
        children: teacherData.username,
    },
    {
        key: '3',
        label: '手机号',
        children: teacherData.phone_number,
    },
    {
        key: '4',
        label: '邮箱',
        children: teacherData.email,
    },
    {
        key: '5',
        label: '上次登录时间',
        span: 2,
        children: teacherData.last_login_time,
    },
    {
        key: '6',
        label: '用户状态',
        span: 3,
        children: <Badge status={teacherData.is_active === true ? 'processing' : 'error'} text={statusText} />,
    },
    {
        key: '7',
        label: '所在班级',
        children: "设计中",
    },
    {
        key: '8',
        label: '用户权限',
        children: '普通教师用户',
    },
    {
        key: '9',
        label: '用户密码',
        children: '******',
    },
    {
        key: '10',
        label: '聊天机器人使用权限',
        children: (
            <>
                Data disk type: Mysql
                <br />
                Database version: 5.7.44
                <br />
                Package: teacher_normal_pakage
                <br />
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China xuzhou
                <br />
            </>
        ),
    },
];

    return (
        < >
            {contextHolder}
            <Descriptions title="User Info" layout="vertical" bordered items={items}/>
            <Modal title="教师信息修改" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="用户信息修改"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 12 }}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                        initialValue={teacherData.username}
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
                        initialValue={teacherData.email}
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
                        initialValue={teacherData.phone_number}
                    >
                        <Input />
                    </Form.Item>

                    {/*<Form.Item*/}
                    {/*    label="用户班级"*/}
                    {/*    name="in_class"*/}
                    {/*    rules={[{ required: true, message: '请输入用户班级' }]}*/}
                    {/*    initialValue={teacherData.in_class}*/}
                    {/*>*/}
                    {/*    <Input />*/}
                    {/*</Form.Item>*/}

                    <Form.Item
                        label="用户密码"
                        name="password"
                        rules={[{ required: true, message: '请输入用户密码' }]}
                        initialValue={teacherData.password}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                        <Button type="primary" htmlType="submit">
                            确认修改
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div style={{marginTop:30,marginLeft:1200}}>
                <Flex gap="small" align="flex-start" vertical>
                    <Flex gap="small" wrap="wrap">
                        <Button type="primary" size='large' onClick={showModal}>
                            修改信息
                        </Button>
                        <Button size='large' onClick={Logout}>注销登录</Button>
                    </Flex>
                </Flex>
            </div>
        </>
    );
};

export default TeacherProfile;
