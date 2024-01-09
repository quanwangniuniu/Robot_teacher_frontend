import '@chatui/core/es/styles/index.less';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import axios from "axios";
import config from "../../api/config";

const StudentRobot = () => {
    const initialMessages = [
        {
            type: 'text',
            content: { text: '学生您好，我是学生端助理瑞瑞，你的贴心小助手~' },
            user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
        },

    ];
    // 默认快捷短语，可选
    const defaultQuickReplies = [
        {
            icon: 'message',
            name: '你都可以做哪些事情？',
            isNew: true,
            isHighlight: true,
        },
        {
            name: '爷爷年纪大嘴里没了牙，给他策划过生日',
            isNew: true,
        },
        {
            name: '奶奶年纪大爱酗酒，影响考研怎么办',
            isHighlight: true,
        },
        {
            name: '孙子早恋不学习爱旅游，定制一个去苏州的旅游计划',
        },
    ];
    // 消息列表
    const { messages, appendMsg, setTyping } = useMessages(initialMessages);

    // 发送回调
    async function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
            // TODO: 发送请求
            axios.post(`${config.apiUrl}/conversationhandler/conversation_view/`,val)
                .then((response)=>{
                    // console.log(response.data.messages[2].content);
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
        <Chat
            navbar={{ title: '学生端机器人' }}
            messages={messages}
            renderMessageContent={renderMessageContent}
            quickReplies={defaultQuickReplies}
            onQuickReplyClick={handleQuickReplyClick}
            onSend={handleSend}
        />
    );
};

export default StudentRobot