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
                <section>
                    <h3>Team Members</h3>
                    <ul>
                        <li>Li Guorui: Full Stack</li>
                        <li>Zhang Yue: PM Feedback</li>
                        <li>Wang Ke: UI Feedback</li>
                        <li>Li Xiaobin: Mentor</li>
                    </ul>
                </section>
                <section>
                    <h3>Tech Stack</h3>
                    <ul>
                        <li>Frontend: React</li>
                        <li>Backend: Python</li>
                        <li>Framework: Django</li>
                        <li>Testing: Postman</li>
                        <li>Service: NPM</li>
                        <li>Deployment: Aliyun</li>
                        <li>Training: Pytorch</li>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tensorflow</li>
                    </ul>
                </section>
            </div>


            {/* Middle Column: Member Introduction */}
            <div className="middle-column">
                <section>
                    <h3>个人简介</h3>
                    <p>
                        熟练运用Java、Python、C++等编程语言以及Spring
                        Boot、Flask和Vue.js等开发框架进行应用程序开发。
                    </p>
                    <p>
                        在移动应用开发方面，我熟练使用uni-app移动应用开发框架以及WeChat等开发者工具。
                    </p>
                    <p>
                        我对新技术和工具保持持续学习的态度，以跟上快速变化的技术行业发展。
                    </p>
                    <h3>致谢</h3>
                    <p>
                        感谢我的各位老师和同学，他们在我学习和成长的道路上给予了无私的支持和帮助。
                    </p>
                    <p>
                        在编程领域，我要特别感谢那些与我分享知识、指导我掌握多项编程语言和开发框架的老师和同学们。
                    </p>
                    <p>
                        最后，我要感谢所有与我一同探索新技术、持续学习的老师和同学们。正是因为有了你们的陪伴和共同努力，我才能够保持对新技术和工具持续学习的态度，以跟上快速变化的技术行业发展。
                    </p>
                    <h3>Personal Profile</h3>
                    <p>
                        A software engineer proficient in multiple programming languages and development frameworks. I am skilled in Java, Python, C++, as well as development frameworks such as Spring Boot, Flask, and Vue.js for application development.
                    </p>
                    <p>
                        In mobile app development, I am proficient in using the uni-app mobile app development framework and developer tools like WeChat.
                    </p>
                    <p>
                        I maintain a continuous learning attitude towards new technologies and tools to keep pace with the rapidly evolving tech industry.
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
                    <h3>Geographic Position</h3>
                    <p className="mapfont"> "101 Shanghai Road, Quanshan District, Xuzhou City, Jiangsu Province"</p>
                    <h3>Teaching Overview</h3>
                    <p> Jiangsu Normal University is committed to nurturing outstanding talents with innovative spirit and practical abilities. It has multiple colleges and research institutes covering disciplines such as literature, education, natural sciences, engineering, and more. The university boasts a high-quality faculty team, including some renowned scholars and experts from both domestic and international backgrounds. </p>
                </section>
            </div>
        </div>
    );
};

export default ContactUs;
