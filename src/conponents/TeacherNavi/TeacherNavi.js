import React from 'react';
import './TeacherNavi.css';
import logo_pic from '../images/robotTeacher.png'
import {Link} from 'react-router-dom'
import {Avatar,Space} from "antd";
import {UserOutlined} from '@ant-design/icons'

const TeacherNavibars = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                {/*  website logo */}
                <img src={logo_pic} alt="Logo" />
            </div>
            <div className="menu">
                <Link className="menu-item" to="/robotStudent">聊天机器人</Link>
                <div className="spacer"></div>
                <Link className="menu-item" to="/equipment">工具使用</Link>
                <Link className="menu-item" to="/contact2Teacher">教学沟通</Link>
                <Space direction="vertical" size={16}>
                    <Space wrap size={16}>
                        <Avatar shape="square" icon={<UserOutlined />} />
                    </Space>
                </Space>
            </div>
        </nav>
    );
};

export default TeacherNavibars;