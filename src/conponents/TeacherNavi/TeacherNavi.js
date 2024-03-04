import React from 'react';
import './TeacherNavi.css';
import logo_pic from '../images/robotTeacher.png'
import {Avatar,Space} from "antd";
import {UserOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";

const TeacherNavibars = () => {
    const username = sessionStorage.getItem('username')
    const user_id = sessionStorage.getItem('teacher_id')
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src={logo_pic} alt="Logo" />
                </Link>
            </div>
            <div className="menu">
                <Space> <p>欢迎进入教师端！</p></Space>
                <Space></Space>
                <Space> 教师用户id:{user_id}</Space>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Space direction="vertical" size={16}>
                    <Space wrap size={16}>
                        <Avatar shape="square" icon={<UserOutlined />} />
                    </Space>
                </Space>
                <Space></Space>
                <Space> <p>{username}</p></Space>
            </div>
        </nav>
    );
};

export default TeacherNavibars;