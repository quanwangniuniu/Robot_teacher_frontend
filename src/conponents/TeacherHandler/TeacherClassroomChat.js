import React, {useEffect, useState} from 'react';
import Chat, { Bubble, useMessages } from '@chatui/core';
import {Avatar, Col, List, Row} from 'antd';
import axios from "axios";
import config from "../../api/config";


const TeacherClassroomChat = () => {
    const [users_data,setUsersData] = useState([])
    useEffect(() => {
        // 待修改
        const class_id = sessionStorage.getItem("teacher_id")
        // 发送HTTP请求
        axios.get(`${config.apiUrl}/classroomhandler/get_users_in_classrooms/${class_id}/`)
            .then(response => {
                setUsersData(response.data.classrooms);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const user_data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    const initialMessages = [
        {
            type: 'text',
            content: { text: '主人好，我是智能助理，你的贴心小助手~' },
            user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
        },
        {
            type: 'image',
            content: {
                picUrl: '//img.alicdn.com/tfs/TB1p_nirYr1gK0jSZR0XXbP8XXa-300-300.png',
            },
        },
    ];

// 默认快捷短语，可选
    const defaultQuickReplies = [
        {
            icon: 'message',
            name: '联系人工服务',
            isNew: true,
            isHighlight: true,
        },
        {
            name: '短语1',
            isNew: true,
        },
        {
            name: '短语2',
            isHighlight: true,
        },
        {
            name: '短语3',
        },
    ];
    // 消息列表
    const { messages, appendMsg, setTyping } = useMessages(initialMessages);

    // 发送回调
    function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
            // TODO: 发送请求
            appendMsg({
                type: 'text',
                content: { text: val },
                position: 'right',
            });

            setTyping(true);

            // 模拟回复消息
            setTimeout(() => {
                appendMsg({
                    type: 'text',
                    content: { text: '亲，您遇到什么问题啦？请简要描述您的问题~' },
                });
            }, 1000);
        }
    }

    // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
    function handleQuickReplyClick(item) {
        handleSend('text', item.name);
    }

    function renderMessageContent(msg) {
        const { type, content } = msg;

        // 根据消息类型来渲染
        switch (type) {
            case 'text':
                return <Bubble content={content.text} />;
            case 'image':
                return (
                    <Bubble type="image">
                        <img src={content.picUrl} alt="" />
                    </Bubble>
                );
            default:
                return null;
        }
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={18}>
                    <div style={{ height: '1200px', overflowY: 'auto' }}>
                        <Chat
                            navbar={{ title: '智能助理' }}
                            messages={messages}
                            renderMessageContent={renderMessageContent}
                            quickReplies={defaultQuickReplies}
                            onQuickReplyClick={handleQuickReplyClick}
                            onSend={handleSend}
                        />
                    </div>
                </Col>
                <Col span={6}>
                    <List
                        itemLayout="horizontal"
                        dataSource={user_data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </Col>

            </Row>
        </>
    );
}

export default TeacherClassroomChat;