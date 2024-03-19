import React, { useState, useEffect } from 'react';
import {Table, Button, Modal, Form, Input, Space, Select, message, Avatar, Badge} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import config from "../../api/config";

const { Option } = Select;

const ClassManage = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddModalVisible,setIsAddModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [addForm] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');


    useEffect(() => {
        // Fetch data from backend here
        const fetchData = async () => {
            // Example: Replace this with your actual fetch logic
            const response = await fetch(`${config.apiUrl}/adminhandler/get_all_class/`);
            const responseData = await response.json();
            setData(responseData);
        };

        fetchData();
    }, []);

    const handleDelete = (record) => {
        // Delete record logic here
        const newData = [...data];
        const index = newData.findIndex((item) => record.class_id === item.class_id);
        newData.splice(index, 1);
        setData(newData);
    };

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setEditingKey(record.class_id);
        setIsModalVisible(true);
    };

    const columns = [
        {
            title: 'Class Room ID',
            dataIndex: 'class_id',
            sorter: (a, b) => a.class_id - b.class_id,
        },
        {
            title: 'Class Room Name',
            dataIndex: 'class_name',
            sorter: (a, b) => a.class_name.localeCompare(b.class_name),
        },
        {
            title: 'Class Room Avatar',
            dataIndex: 'class_avatar',
            render: (text) => (
                <Avatar src={text} />
            ),
        },
        {
            title: 'Class Type',
            render: (text) => ("普通班级"),
        },
        {
            title: '状态',
            render:(text)=>(<Badge status={ 'processing'} />),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
                </Space>
            ),
        },
    ];

    const handleOk = () => {
        form.validateFields().then((values) => {
            const newData = [...data];
            const index = newData.findIndex((item) => editingKey === item.class_id);
            if (index > -1) {
                // Update frontend data
                newData[index] = { ...newData[index], ...values };
                setData(newData);

                // Send PUT request to update backend data
                fetch(`${config.apiUrl}/adminhandler/edit_class/${editingKey}`, {
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
                        console.log('Updated classroom data:', data);
                    })
                    .catch(error => {
                        console.error('Error updating student data:', error);
                    });
            }
            form.resetFields();
            setIsModalVisible(false);
        });
    };

    const handleAddOk = () => {
        addForm.validateFields().then((values) => {
            // Send PUT request to update backend data
            fetch(`${config.apiUrl}/adminhandler/add_class/`, {
                method: 'Post',
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
                    // 弹出成功提示
                    message.success('ClassRoom added successfully');
                    // 重置表单
                    addForm.resetFields();
                    // 关闭弹窗
                    setIsAddModalVisible(false);
                    // 刷新界面
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error updating classroom data:', error);
                });
            addForm.resetFields();
            setIsAddModalVisible(false);
        });
    };


    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const handleAddCancel = () =>{
        addForm.resetFields();
        setIsAddModalVisible(false);
    };

    return (
        <div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginBottom: 16 }}
                onClick={() => setIsAddModalVisible(true)}
            >
                添加班级
            </Button>
            <Table
                dataSource={data}
                columns={columns}
                rowKey={(record) => record.student_id}
                pagination={{ pageSize: 10 }}
            />
            <Modal title="编辑班级信息" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="class_id" label="班级ID" hidden>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="class_name" label="班级名">
                        <Input />
                    </Form.Item>
                    <Form.Item name="class_avatar" label="班级头像">
                        <Select>
                            <Option value={"https://robohash.org/lion "}>狮子</Option>
                            <Option value={"https://robohash.org/monkey "}>猴子</Option>
                            <Option value={"https://robohash.org/tree "}>大树</Option>
                            <Option value={"https://robohash.org/pandas "}>熊猫</Option>
                            <Option value={"https://robohash.org/duck "}>鸭子</Option>
                            <Option value={"https://robohash.org/robot "}>机器人</Option>
                            <Option value={"https://robohash.org/rabbit "}>兔子</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="添加班级" visible={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
                <Form form={addForm} layout="vertical">
                    <Form.Item name="class_id" label="Class ID" hidden>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="class_name" label="班级名称">
                        <Input />
                    </Form.Item>
                    <Form.Item name="class_avatar" label="班级头像">
                        <Select>
                            <Option value={"https://robohash.org/lion "}>狮子</Option>
                            <Option value={"https://robohash.org/monkey "}>猴子</Option>
                            <Option value={"https://robohash.org/tree "}>大树</Option>
                            <Option value={"https://robohash.org/pandas "}>熊猫</Option>
                            <Option value={"https://robohash.org/duck "}>鸭子</Option>
                            <Option value={"https://robohash.org/robot "}>机器人</Option>
                            <Option value={"https://robohash.org/rabbit "}>兔子</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ClassManage;
