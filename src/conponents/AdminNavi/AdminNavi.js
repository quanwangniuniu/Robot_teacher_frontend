import React from 'react';
import './AdminNavi.css';
import logo_pic from '../images/robotAdmin.png'
import {Avatar,Space} from "antd";
import {UserOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";

const AdminNavibars = () => {
    const username = sessionStorage.getItem('username')
    const user_id = sessionStorage.getItem('admin_id')
    return (
        <nav className="admin_navbar">
            <div className="logo">
                <Link to="/">
                    <img src={logo_pic} alt="Logo" />
                </Link>
            </div>
            <div className="menu">
                <Space> <p>欢迎进入管理员端！</p></Space>
                <Space></Space>
                <Space> 管理员用户id:{user_id}</Space>
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

export default AdminNavibars;