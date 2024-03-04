import React from "react";
import './Home.css'
import Navibars from "../../conponents/Navigation/Navibars";
import AntCarousel from "./Carousel";
import ThreeCards from "./showcards/ThreeCards";
import ContactUs from "../contact/ContactUs";
import Research from "../Research";
import Estimations from "../Estimations/Estimations";





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

            <div className="four-module-container">
                <div className="module white-bg">
                    <AntCarousel/>
                </div>
                <div className="module black-bg" style={{height:2090}} id="section2">
                   <Estimations></Estimations>
                </div>
                <div className="module white-bg">
                   <Research></Research>
                </div>
                <div className="module black-bg" id="section3">
                    <ContactUs></ContactUs>
                </div>
            </div>
        </div>
    )
}

export default Home;