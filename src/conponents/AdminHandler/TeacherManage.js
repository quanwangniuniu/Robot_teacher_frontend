import React, { useState, useEffect } from 'react';
import {Table, Button, Modal, Form, Input, Space, Select, message} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import config from "../../api/config";

const { Option } = Select;

const TeacherManage = () => {
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
            const response = await fetch(`${config.apiUrl}/adminhandler/get_all_teachers/`);
            const responseData = await response.json();
            setData(responseData);
        };

        fetchData();
    }, []);

    const handleDelete = (record) => {
        // Delete record logic here
        const newData = [...data];
        const index = newData.findIndex((item) => record.teacher_id === item.teacher_id);
        newData.splice(index, 1);
        setData(newData);
    };

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setEditingKey(record.teacher_id);
        setIsModalVisible(true);
    };

    const columns = [
        {
            title: 'teacher ID',
            dataIndex: 'teacher_id',
            sorter: (a, b) => a.teacher_id - b.teacher_id,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Is Active',
            dataIndex: 'is_active',
            render: (text) => (text ? 'Active' : 'Inactive'),
        },
        {
            title: 'Have Classes',
            dataIndex: 'have_classes',
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
            const index = newData.findIndex((item) => editingKey === item.teacher_id);
            if (index > -1) {
                // Update frontend data
                newData[index] = { ...newData[index], ...values };
                setData(newData);

                // Send PUT request to update backend data
                fetch(`${config.apiUrl}/adminhandler/edit_teacher/${editingKey}`, {
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
                        console.log('Updated teacher data:', data);
                    })
                    .catch(error => {
                        console.error('Error updating teacher data:', error);
                    });
            }
            form.resetFields();
            setIsModalVisible(false);
        });
    };

    const handleAddOk = () => {
        addForm.validateFields().then((values) => {
            console.log(values)
            // Send PUT request to update backend data
            fetch(`${config.apiUrl}/adminhandler/add_teacher/`, {
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
                    console.log('Add teacher data:', data);
                    // 弹出成功提示
                    message.success('teacher added successfully');
                    // 重置表单
                    addForm.resetFields();
                    // 关闭弹窗
                    setIsAddModalVisible(false);
                    // 刷新界面
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error updating teacher data:', error);
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
                添加教师
            </Button>
            <Table
                dataSource={data}
                columns={columns}
                rowKey={(record) => record.teacher_id}
                pagination={{ pageSize: 10 }}
            />
            <Modal title="编辑教师信息" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="teacher_id" label="teacher ID" hidden>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="username" label="Username">
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone_number" label="Phone Number">
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input />
                    </Form.Item>
                    <Form.Item name="is_active" label="Is Active">
                        <Select>
                            <Option value={true}>Active</Option>
                            <Option value={false}>Inactive</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="have_classes" label="Have Classes">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="添加教师" visible={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
                <Form form={addForm} layout="vertical">
                    <Form.Item name="teacher_id" label="teacher ID" hidden>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="username" label="Username">
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name="phone_number" label="Phone Number">
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input />
                    </Form.Item>
                    <Form.Item name="is_active" label="Is Active">
                        <Select>
                            <Option value={true}>Active</Option>
                            <Option value={false}>Inactive</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="have_classes" label="have_classes">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TeacherManage;
