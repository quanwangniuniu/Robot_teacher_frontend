import React, {useEffect, useState} from 'react';
import {Avatar, Row, Col, Button, Modal, Form, Input, Select, Empty, message} from 'antd';
import {  PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import config from "../../api/config";
import {useNavigate} from "react-router-dom";


const StudentClassroom = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        const studentId = sessionStorage.getItem("student_id")
        // 发送HTTP请求
        axios.get(`${config.apiUrl}/classroomhandler/student_classrooms/${studentId}/`)
            .then(response => {
                setClassrooms(response.data.classrooms);
            })
            .catch(error => {
                console.error('Error fetching classrooms:', error);
            });
    }, []);
    const navigate = useNavigate()
    const navigateToClass = (class_id) => {
        navigate(`/studentIndex/student_classroom_chat/${class_id}`,{replace:true})
    };
    const refreshData = () => {
        // 更新状态以触发重新渲染
        setClassrooms([]);
        // 重新发起 HTTP 请求
        const studentId = sessionStorage.getItem("student_id");
        axios.get(`${config.apiUrl}/classroomhandler/student_classrooms/${studentId}/`)
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


    const handleCancel = () => {
        setVisible(false);
    };

    const handleParticipate = () => {
        form.validateFields().then(async values => {
            const formData = new FormData();
            formData.append('student_id', sessionStorage.getItem('student_id'));
            formData.append('class_name', values.class_name);
            try {
                const response = await fetch(`${config.apiUrl}/classroomhandler/student_participate/`, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Failed to participate in any classroom');
                }

                // Classroom created successfully
                message.success('加入成功！')
                refreshData();
                console.log('Classroom participated successfully!');
            } catch (error) {
                message.error('该班级不存在！加入失败');
                console.error('Error creating classroom:', error.message);
            }
            form.resetFields();
            setVisible(false);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };



    if(classrooms.length===0){
        return(
            <>
                <Empty description="暂无班级数据" />
                <Row justify="center" style={{ marginTop: '20px' }}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                        加入新的班级
                    </Button>
                </Row>
                <Modal
                    title="加入新的班级"
                    visible={visible}
                    onOk={handleParticipate}
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
                                <Avatar size={100} src={cls.class_avatar} style={{borderColor:"black",border:2}}/>
                                <h3>{cls.class_name}</h3>
                                <Button onClick={() => navigateToClass(cls.class_id)}>查看详情</Button>                            </div>
                        </Col>
                    ))}
                </Row>
                <Row justify="center" style={{ marginTop: '20px' }}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                        加入新的班级
                    </Button>
                </Row>
                <Modal
                    title="加入新的班级"
                    visible={visible}
                    onOk={handleParticipate}
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
                    </Form>
                </Modal>
            </div>
        );
    }

};

export default StudentClassroom;
