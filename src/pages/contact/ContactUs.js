// ContactUs.js
import React from 'react';
import './ContactUs.css';
import {Image} from 'antd'
import mapPic from './images/mapjsnu.png'

const ContactUs = () => {
    return (
        <div className="contact_us_container">
            {/* Left Column: Team Members and Project Summary */}
            <div className="left-column">
                <section>
                    <h3>团队成员</h3>
                    <ul>
                        <li>李国瑞 : 全栈</li>
                        <li>张越 : pm反馈</li>
                        <li>王科 : ui反馈</li>
                        <li>李小斌: 导师</li>
                    </ul>
                </section>
                <section>
                    <h3>技术栈</h3>
                    <ul>
                        <li>前端 : React</li>
                        <li>后端 : Python</li>
                        <li>框架 : Django</li>
                        <li>测试 : Postman</li>
                        <li>服务 : NPM</li>
                        <li>部署 : Aliyun</li>
                        <li>训练 : Pytorch</li>
                        <li> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tensorflow</li>

                    </ul>
                </section>
            </div>


            {/* Middle Column: Member Introduction */}
            <div className="middle-column">
                <section>
                    <h3>个人简介</h3>
                    <p>
                        一名具备多项编程语言和开发框架技能的软件工程师。我熟练运用Java、Python、C++等编程语言以及Spring
                        Boot、Flask和Vue.js等开发框架进行应用程序开发。
                    </p>
                    <p>
                        在移动应用开发方面，我熟练使用uni-app移动应用开发框架以及WeChat等开发者工具。
                    </p>
                    <p>
                        我对新技术和工具保持持续学习的态度，以跟上快速变化的技术行业发展。
                    </p>
                    <p>
                        &nbsp;
                    </p>
                </section>
            </div>

            {/* Right Column: Map Embedding */}
            <div className="right-column">
                <section>
                    <h3>地理位置</h3>
                    <Image src={mapPic}></Image>
                    <p className="mapfont"> 江苏省徐州市泉山区上海路101号</p>
                    <h3>教学概况</h3>
                    <p> 江苏师范大学致力于培养具有创新精神和实践能力的优秀人才, 设有多个学院和研究所，涵盖了文学、教育学、理学、工学等学科领域, 并拥有一支高素质的教师队伍，其中包括一些国内外知名的学者和专家。 </p>
                </section>
            </div>
        </div>
    );
};

export default ContactUs;
