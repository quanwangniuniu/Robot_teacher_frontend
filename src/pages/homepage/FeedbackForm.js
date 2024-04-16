// FeedbackForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import config from "../../api/config";

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${config.apiUrl}/adminhandler/send_feedback/`, {
                name,
                email,
                message
            });
            if (response.data.status === 'success') {
                message.success('Feedback sent successfully!');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                console.error('Failed to send feedback.');
            }
        } catch (error) {
            console.error('An error occurred while sending feedback.');
        }
    };

    return (
        <Form onFinish={handleSubmit} style={{ maxWidth: 600, margin: 'auto' }}>
            <Form.Item
                label="您的名字或绰号"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item
                label="你的邮箱地址"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
                label="反馈内容"
                name="message"
                rules={[{ required: true, message: 'Please input your message!' }]}
            >
                <Input.TextArea value={message} onChange={(e) => setMessage(e.target.value)} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Send Feedback
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FeedbackForm;
