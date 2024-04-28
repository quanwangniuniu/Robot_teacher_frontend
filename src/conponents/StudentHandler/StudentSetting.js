import React, { useState, useEffect } from 'react';
import {Table, Button, Modal, Form, Input, message, Rate} from 'antd';
import axios from 'axios';
import config from "../../api/config";


const StudentSetting = () => {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const student_id = sessionStorage.getItem("student_id");
            const response = await axios.get(`${config.apiUrl}/studenthandler/get_studentRobot_by_id/${student_id}`); // Replace API_URL with your backend API endpoint
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (record) => {
        try {
            await axios.delete(`API_URL/${record.conversation_id}`); // Replace API_URL with your backend API endpoint
            fetchData();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleModalOk = () => {
        form.validateFields().then(async (values) => {
            try {
                await axios.put(`${config.apiUrl}/adminhandler/edit_robot/${values.conversation_id}`, values); // Replace API_URL with your backend API endpoint
                message.success("更新成功！")
                setModalVisible(false);
                fetchData();
            } catch (error) {
                console.error('Error updating record:', error);
            }
        });
    };
    const columns = [
        {
            title: 'Conversation ID',
            dataIndex: 'conversation_id',
            key: 'conversation_id',
        },
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            key: 'start_time',
        },
        {
            title: 'End Time',
            dataIndex: 'end_time',
            key: 'end_time',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'User Type',
            dataIndex: 'user_type',
            key: 'user_type',
        },
        {
            title: 'Robot Model',
            dataIndex: 'robot_model',
            key: 'robot_model',
            render: (text) => {
                if (text === 'qwen-turbo') {
                    return 'meicy-1.0B';
                } else {
                    return "qwen-turbo";
                }
            }
        },
        {
            title: 'Robot Prompt',
            dataIndex: 'robot_prompt',
            key: 'robot_prompt',
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
            render:(rate)=>(
                <Rate allowHalf value={rate} disabled/>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
          <Button onClick={() => handleEdit(record)}>修改</Button>
          <Button style={{color:"yellow",backgroundColor:"black"}} onClick={() => handleDelete(record)}>删除</Button>
        </span>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data} />

            <Modal
                title="Edit Record"
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={() => setModalVisible(false)}
            >
                <Form form={form}>
                    <Form.Item name="conversation_id" label="Conversation ID">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="user_id" label="User ID">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name="start_time" label="Start Time">
                        <Input />
                    </Form.Item>
                    <Form.Item name="end_time" label="End Time">
                        <Input />
                    </Form.Item>
                    <Form.Item name="title" label="Title">
                        <Input />
                    </Form.Item>
                    <Form.Item name="status" label="Status">
                        <Input />
                    </Form.Item>
                    <Form.Item name="user_type" label="User Type">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name="robot_model" label="Robot Model">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name="robot_prompt" label="Robot Prompt">
                        <Input.TextArea rows={8}/>
                    </Form.Item>
                    <Form.Item name="roles" label="Roles">
                        <Input />
                    </Form.Item>
                    <Form.Item name="rate" label="Rate">
                        <Rate allowHalf/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default StudentSetting;
