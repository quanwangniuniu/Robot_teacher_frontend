import React, {useEffect, useState} from 'react';
import Chat, {Bubble, useMessages} from '@chatui/core';
import {Avatar, Col, List, Row} from 'antd';
import axios from "axios";
import config from "../../api/config";
import {useLocation, useNavigate} from "react-router-dom";
import {LeftOutlined} from "@ant-design/icons";


const TeacherClassroomChat = () => {
    const [users_data,setUsersData] = useState([])
    const [classroom_name,setClassRoomName] = useState()

    const location = useLocation();
    const pathname = location.pathname;
    // 使用字符串处理方法提取最后一个斜杠后面的内容
    const class_id= pathname.substring(pathname.lastIndexOf('/') + 1);
    useEffect(() => {
        // 发送HTTP请求
        axios.get(`${config.apiUrl}/classroomhandler/get_users_in_classrooms/${class_id}/`)
            .then(response => {
                setUsersData(response.data.users_info);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
        // 获得当前班级名称
        axios.get(`${config.apiUrl}/classroomhandler/get_classroom_name_byId/${class_id}/`)
            .then(response => {
                setClassRoomName(response.data)
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);


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
    const navigate = useNavigate()
    const navigateBack=()=>{
        navigate(`/teacherIndex/teacher_classroom`,{replace:true})
    };
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
            <div style={{  top: '10px', left: '10px' }}>
                <LeftOutlined onClick={navigateBack} style={{ fontSize: '24px' }} />
            </div>
            <Row gutter={[16, 16]}>
                <Col span={18}>
                    <div style={{ height: '1200px', overflowY: 'auto' }}>
                        <Chat
                            navbar={{ title: classroom_name }}
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
                        dataSource={users_data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                    title={<a href="https://ant.design">{item.user_name}</a>}
                                    description ={item.user_email}
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