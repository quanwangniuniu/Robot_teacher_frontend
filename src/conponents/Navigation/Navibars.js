// Navibars.js
import React from 'react';
import './Navibars.css';
import logo_pic from './logo.png'
import {Link} from 'react-router-dom'
const Navibars = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                {/*  website logo */}
                <img src={logo_pic} alt="Logo" />
            </div>
            <div className="menu">
                <Link className="menu-item" to="/">研究领域</Link>
                <div className="spacer"></div>
                <Link className="menu-item" to="/">用户登录</Link>
                <Link className="menu-item" to="/">联系我们</Link>
            </div>
        </nav>
    );
};

export default Navibars;
