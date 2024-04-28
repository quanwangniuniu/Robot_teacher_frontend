// Navibars.js
import React, {useState} from 'react';
import './Navibars.css';
import logo_pic from './logo.png'
import {Link} from 'react-router-dom'
import {Modal} from "antd";
import FeedbackForm from "../../pages/homepage/FeedbackForm";
const Navibars = () => {
    const [modalVisible,setModalVisible] = useState(false);

    const handleOpenModal =()=>{
        setModalVisible(true);
    }
    const handleCloseModal = () =>{
        setModalVisible(false);
    }
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
                <Link className="menu-item" to="/" onClick={handleOpenModal}>联系我们</Link>
            </div>
            <div>
                <Modal
                   title={"用户反馈"}
                   visible={modalVisible}
                   onCancel={handleCloseModal}
                   footer={null}
                >
                    <FeedbackForm></FeedbackForm>
                </Modal>
            </div>
        </nav>
    );
};

export default Navibars;
