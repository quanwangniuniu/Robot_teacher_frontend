import React from 'react';
import './StudentNavi.css';
import logo_pic from '../images/robotStudent.png'
import {Avatar,Space} from "antd";
import {UserOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";

const StudentNavibars = () => {
    const username = sessionStorage.getItem('username')
    const user_id = sessionStorage.getItem('student_id')
    return (
        <nav className="navbar">
            <div className="logo">
                {/*  website logo */}
                <Link to="/">
                    <img src={logo_pic} alt="Logo" />
                </Link>
            </div>
            <div className="menu">
                <Space> <p>欢迎进入学生端！</p></Space>
                <Space></Space>
                <Space> 学生用户id:{user_id}</Space>
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

export default StudentNavibars;


