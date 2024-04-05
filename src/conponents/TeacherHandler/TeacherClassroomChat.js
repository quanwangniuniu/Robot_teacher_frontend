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
    const [current_teacher_avatar,SetCurrent_teacher_avatar] = useState()
    const location = useLocation();
    const pathname = location.pathname;
    // 使用字符串处理方法提取最后一个斜杠后面的内容
    const class_id= pathname.substring(pathname.lastIndexOf('/') + 1);
    // 消息列表
    const { messages, appendMsg} = useMessages([]);
    useEffect(() => {
        const teacher_id = sessionStorage.getItem('teacher_id')
        // 获得标签信息
        axios.get(`${config.apiUrl}/classroomhandler/substract_tags/`)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
        // 获得用户信息
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
        // 获得当前教师用户头像
        axios.get(`${config.apiUrl}/classroomhandler/get_teacher_avatar/${teacher_id}/`)
            .then(response => {
                SetCurrent_teacher_avatar(response.data)
            })
            .catch(error => {
                console.error('Error fetching avatar:', error);
            });
        // 获得当前班级所有消息
        // 清空先前的对话内容
        messages.length = 0
        axios.get(`${config.apiUrl}/classroomhandler/get_classroom_messages/${class_id}`)
            .then((response) => {
                const fetchedMessages = response.data.classroom_info.map((classroom_info) => ({
                    type: 'text',
                    content: { text: classroom_info.message_content },
                    user: { avatar: classroom_info.message_avatar,name:classroom_info.user_name},
                    position: sessionStorage.getItem('username')=== classroom_info.user_name ? 'right':'left'
                }));
                if (fetchedMessages.length === 0) {
                    appendMsg({
                        type: 'text',
                        content: { text: `还没有人发言哦` },
                        user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg',name:'群助手' },
                        position: 'left'
                    });
                } else {
                    fetchedMessages.forEach((msg) => {
                        appendMsg(msg);
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, [appendMsg]);


// 默认快捷短语，可选
    const defaultQuickReplies = [
        {
            icon: 'message',
            name: '递归数组',
            isNew: true,
            isHighlight: true,
        },
        {
            name: '卷积神经网络',
            isNew: true,
        },
        {
            name: '决策树具体的场景应用',
            isHighlight: true,
        },
        {
            name: '计算机网络中的各种协议',
        },
    ];

    // 发送回调
    async function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
            let username = sessionStorage.getItem("username")
            // TODO: 发送请求
            axios.post(`${config.apiUrl}/classroomhandler/send_messages/${class_id}/${username}`,val)
                .then((response)=>{
                   console.log(response.data)
                })
                .catch((error)=>{
                    console.error(error)
                })
            appendMsg({
                type: 'text',
                content: {text: val},
                position: 'right',
                user: { avatar: current_teacher_avatar },
            });
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
                    <div style={{ height: '1200px', overflowY: 'auto'}}>
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
                                    avatar={<Avatar src={item.avatar} />}
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