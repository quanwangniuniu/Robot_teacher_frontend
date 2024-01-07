import React from "react";
import './Home.css'
import Navibars from "../../conponents/Navigation/Navibars";
import {Link} from "react-router-dom";
import AntCarousel from "./Carousel";
import ThreeCards from "./showcards/ThreeCards";
import ContactUs from "../contact/ContactUs";





const Home = () =>{
    return (
        <div>
         <Navibars/>
            <div className="welcome-container">
                <h2 className="home_title">Welcome to Home Pages</h2>
                <p className="home_description">欢迎来到教学辅助聊天机器人系统！</p>
            </div>
            <div className="home_container">
            </div>
                <ThreeCards></ThreeCards>
            <div>
                <div>
                    <Link to="/studentIndex">学生端入口</Link>
                </div>
                <div>
                    <Link to="/teacherIndex">教师端入口</Link>
                </div>
                <div>
                    <Link to="/teacherIndex">管理员端入口</Link>
                </div>
            </div>

            <div className="four-module-container">
                <div className="module white-bg">
                    <AntCarousel/>
                </div>
                <div className="module black-bg">

                </div>
                <div className="module white-bg">

                </div>
                <div className="module black-bg">
                    <ContactUs></ContactUs>
                </div>
            </div>
        </div>
    )
}

export  default Home;