import React, {useEffect, useState} from 'react';
import {Avatar, Row, Col, Menu, Dropdown, Button, Modal, Form, Input, Select, Empty, message} from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import config from "../../api/config";

const { Option } = Select;

const TeacherClassroom = () => {
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [selectedAvatar, setSelectedAvatar] = useState('https://robohash.org/duck');
    const [currentClass, setCurrentClass] = useState(null);
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        const teacherId = sessionStorage.getItem("teacher_id")
        // 发送HTTP请求
        axios.get(`${config.apiUrl}/classroomhandler/teacher_classrooms/${teacherId}/`)
            .then(response => {
                setClassrooms(response.data.classrooms);
            })
            .catch(error => {
                console.error('Error fetching classrooms:', error);
            });
    }, []);

    const refreshData = () => {
        // 更新状态以触发重新渲染
        setClassrooms([]);
        // 重新发起 HTTP 请求
        const teacherId = sessionStorage.getItem("teacher_id");
        axios.get(`${config.apiUrl}/classroomhandler/teacher_classrooms/${teacherId}/`)
            .then(response => {
                setClassrooms(response.data.classrooms);
            })
            .catch(error => {
                console.error('Error fetching classrooms:', error);
            });
    };

    const showModal = () => {
        setVisible(true);
    };

    const showEditModal = (cls) => {
        setCurrentClass(cls);
        editForm.setFieldsValue({ class_name: cls.class_name, class_avatar: cls.class_avatar }); // Set avatar value
        setEditVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        setEditVisible(false);
    };

    const handleCreate = () => {
        form.validateFields().then(async values => {
            const formData = new FormData();
            formData.append('teacher_id', sessionStorage.getItem('teacher_id'));
            formData.append('class_name', values.class_name);
            formData.append('class_avatar', values.class_avatar);
            try {
                const response = await fetch(`${config.apiUrl}/classroomhandler/create_class/`, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Failed to create classroom');
                }

                // Classroom created successfully
                refreshData();
                console.log('Classroom created successfully!');
            } catch (error) {
                message.error('当前班级名已存在！创建失败');
                console.error('Error creating classroom:', error.message);
            }
            form.resetFields();
            setVisible(false);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    const handleEdit = () => {
        editForm.validateFields().then(values => {
            // Update current class information
            const updatedClass = { class_id: currentClass.class_id, class_name: values.class_name, class_avatar: selectedAvatar };
            // Sending data to backend
            fetch(`${config.apiUrl}/classroomhandler/edit_class/${currentClass.class_id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedClass),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    editForm.resetFields();
                    refreshData();
                    setEditVisible(false);
                })
                .catch(error => {
                    console.error('Edit Class Error:', error);
                });
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };


    const handleAvatarChange = (value) => {
        setSelectedAvatar(value);
    };

    const handleMenuClick = (e, cls) => {
        if (e.key === 'edit') {
            showEditModal(cls);
        } else if (e.key === 'delete') {
            console.log('Delete Class:', cls.class_name);
        }
    };

    const menu = (cls) => (
        <Menu onClick={(e) => handleMenuClick(e, cls)}>
            <Menu.Item key="edit">编辑班级</Menu.Item>
            <Menu.Item key="delete">删除班级</Menu.Item>
        </Menu>
    );
    if(classrooms.length===0){
        return(
            <>
                <Empty description="暂无班级数据" />
                <Row justify="center" style={{ marginTop: '20px' }}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                        创建新的班级
                    </Button>
                </Row>
                <Modal
                    title="创建新的班级"
                    visible={visible}
                    onOk={handleCreate}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="class_name"
                            label="班级名称"
                            rules={[{ required: true, message: '请输入班级名称' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="class_avatar"
                            label="班级头像"
                            rules={[{ required: true, message: '请选择班级头像' }]}
                        >
                            <Select defaultValue="https://robohash.org/duck" onChange={handleAvatarChange}>
                                <Option value="https://robohash.org/duck">Duck</Option>
                                <Option value="https://robohash.org/dog">Dog</Option>
                                <Option value="https://robohash.org/monkey">Monkey</Option>
                                <Option value="https://robohash.org/lion">Lion</Option>
                                <Option value="https://robohash.org/banana">Banana</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
    else{
        return (
            <div>
                <Row gutter={[16, 16]}>
                    {classrooms.map((cls) => (
                        <Col key={cls.class_id} xs={24} sm={12} md={8} lg={6}>
                            <div style={{ textAlign: 'center' }}>
                                <Dropdown overlay={menu(cls)} trigger={['click']}>
                                    <EllipsisOutlined style={{ fontSize: '20px', position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }} />
                                </Dropdown>
                                <Avatar size={100} src={cls.class_avatar} style={{borderColor:"black",border:2}}/>
                                <h3>{cls.class_name}</h3>
                                <a href={`#class/${cls.class_id}`}>查看详情</a>
                            </div>
                        </Col>
                    ))}
                </Row>
                <Row justify="center" style={{ marginTop: '20px' }}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                        创建新的班级
                    </Button>
                </Row>
                <Modal
                    title="创建新的班级"
                    visible={visible}
                    onOk={handleCreate}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="class_name"
                            label="班级名称"
                            rules={[{ required: true, message: '请输入班级名称' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="class_avatar"
                            label="班级头像"
                            rules={[{ required: true, message: '请选择班级头像' }]}
                        >
                            <Select defaultValue="duck" onChange={handleAvatarChange}>
                                <Option value="https://robohash.org/duck">Duck</Option>
                                <Option value="https://robohash.org/dog">Dog</Option>
                                <Option value="https://robohash.org/monkey">Monkey</Option>
                                <Option value="https://robohash.org/lion">Lion</Option>
                                <Option value="https://robohash.org/banana">Banana</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="编辑班级"
                    visible={editVisible}
                    onOk={handleEdit}
                    onCancel={handleCancel}
                >
                    <Form form={editForm} layout="vertical">
                        <Form.Item
                            name="class_name"
                            label="班级名称"
                            rules={[{ required: true, message: '请输入班级名称' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="class_avatar"
                            label="班级头像"
                            rules={[{ required: true, message: '请选择班级头像' }]}
                        >
                            <Select defaultValue={currentClass ? currentClass.class_avatar : "https://robohash.org/dog"} onChange={handleAvatarChange}>
                                <Option value="https://robohash.org/duck">Duck</Option>
                                <Option value="https://robohash.org/dog">Dog</Option>
                                <Option value="https://robohash.org/monkey">Monkey</Option>
                                <Option value="https://robohash.org/lion">Lion</Option>
                                <Option value="https://robohash.org/banana">Banana</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }

};

export default TeacherClassroom;
