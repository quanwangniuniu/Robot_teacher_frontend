import '@chatui/core/es/styles/index.less';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import axios from "axios";
import config from "../../api/config";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

const StudentRobot = () => {
    const {robotId,robotRole} = useParams();
    // 消息列表
    const { messages, appendMsg, setTyping } = useMessages([]);
    useEffect(() => {
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
                        content: { text: `您好，请和您的专属 ${robotRole} 助手开启第一次对话吧！` },
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
            name: '你都可以做哪些事情？',
            isNew: true,
            isHighlight: true,
        },
        {
            name: '写一个斐波那契数列递归程序',
            isNew: true,
        },
        {
            name: '软件工程的课程设计可以做哪些内容？',
            isHighlight: true,
        },
        {
            name: '前端开发框架选angular还是Vue?',
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
                user: { avatar: 'https://robohash.org/duck' },
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

export default StudentRobot