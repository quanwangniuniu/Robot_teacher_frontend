import '@chatui/core/es/styles/index.less';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import axios from "axios";
import config from "../../api/config";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const TeacherRobot = () => {
    const {robotId,robotRole} = useParams();
    const [current_teacher_avatar,SetCurrent_teacher_avatar] = useState()

    // 消息列表
    const { messages, appendMsg, setTyping } = useMessages([]);
    useEffect(() => {
        const teacher_id = sessionStorage.getItem('teacher_id')
        // 获得当前教师用户头像
        axios.get(`${config.apiUrl}/classroomhandler/get_teacher_avatar/${teacher_id}/`)
            .then(response => {
                SetCurrent_teacher_avatar(response.data)
            })
            .catch(error => {
                console.error('Error fetching avatar:', error);
            });
        // 清空先前的对话内容
        messages.length = 0
        axios.get(`${config.apiUrl}/conversationhandler/get_messages_by_robot_id/${robotId}`)
            .then((response) => {
                const fetchedMessages = response.data.msg.map((msg) => ({
                    type: 'text',
                    content: { text: msg.content },
                    user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
                    position: msg.position
                }));
                if (fetchedMessages.length === 0) {
                    appendMsg({
                        type: 'text',
                        content: { text: `您好，请和您的专属 ${robotRole} 教学辅助助手，开启第一次对话吧！` },
                        user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
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
    }, [robotId, robotRole, appendMsg]);

    const defaultQuickReplies = [
        {
            icon: 'message',
            name: '如何让学生更容易理解递归函数的意义？',
            isNew: true,
            isHighlight: true,
        },
        {
            name: '怎么把复杂的计算机网络的知识点简单化？',
            isNew: true,
        },
        {
            name: '什么是好的计算机教学方案和路线？',
            isHighlight: true,
        },
        {
            name: '给现代化计算机教学的方针出一个新方案?',
        },
    ];

    // 发送回调
    async function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
            // TODO: 发送请求
            axios.post(`${config.apiUrl}/conversationhandler/conversation_view/${robotId}/${robotRole}`,val)
                .then((response)=>{
                    const content = response.data.messages[2].content
                    if(content) {
                        appendMsg({
                            type: 'text',
                            content: {
                                'text': content
                            },
                            user: {avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg'},
                        });
                    }

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

            setTyping(true);

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
        <div style={{ height: '1200px', overflowY: 'auto' }}>
            <Chat
                navbar={{ title: robotRole }}
                messages={messages}
                renderMessageContent={renderMessageContent}
                quickReplies={defaultQuickReplies}
                onQuickReplyClick={handleQuickReplyClick}
                onSend={handleSend}
            />
        </div>
    );
};

export default TeacherRobot;