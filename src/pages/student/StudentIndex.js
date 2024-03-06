import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {
    AppstoreOutlined,
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import StudentNavi from "../../conponents/StudentNavi/StudentNavi";
import {Route, Routes} from "react-router-dom";
import Pdf2Docx from "../../conponents/FileHandler/Pdf2Docx";
import Pdf2Excel from "../../conponents/FileHandler/Pdf2Excel"
import Docx2Pdf from "../../conponents/FileHandler/Docx2Pdf"
import Excel2Pdf from "../../conponents/FileHandler/Excel2Pdf"
import Excel2Docx from "../../conponents/FileHandler/Excel2Docx"
import LanguageTranslation from "../../conponents/Translation/LanguageTranslation"
import QRcodeGeneration from "../../conponents/QRcodeGeneration/QRcodeGeneration";
import StudentProfile from "../../conponents/StudentHandler/StudentProfile"
import StudentRobot from "./RobotStudent";
import PieChart from "../../conponents/ChartHandler/PieChart";
import BoxChart from "../../conponents/ChartHandler/BoxChart";
import HistChart from "../../conponents/ChartHandler/HistChart";
import LineChart from "../../conponents/ChartHandler/LineChart";
import NewRobot from "../../conponents/NewRobot/NewRobot";
import config from "../../api/config";
import StudentClassroom from "../../conponents/StudentHandler/StudentClassroom";



const StudentIndex = () => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const location = useLocation();
    const {Content, Footer, Sider} = Layout;
    const [robots,setRobots] = useState([]);
    const fetchRobots = async () =>{
        try {
            const student_id = sessionStorage.getItem('student_id')
            const response = await fetch(`${config.apiUrl}/conversationhandler/get_studentRobots_by_id/${student_id}`);
            const data = await response.json();
            console.log(data)
            // 更新状态以反映从后端获取的机器人数据
            setRobots(data.robots);
        } catch (error) {
            console.error('Error fetching robots:', error);
        }
    };
    useEffect(() => {
        fetchRobots();
    }, []);
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [
        getItem('用户中心', 'sub1', <UserOutlined/>, [
            getItem('个人信息', 'student_profile'),
            getItem('我的班级','student_classroom'),
            getItem('设置','student_settings'),
            getItem('创建聊天机器人','student_newRobot')
        ]),
        getItem('图表生成', 'sub2', <PieChartOutlined/>, [
            getItem('饼图生成', 'student_piechart'),
            getItem('折线图生成', 'student_linechart'),
            getItem('箱型图生成', 'student_boxchart'),
            getItem('直方图生成', 'student_histchart'),
        ]),
        getItem('文件转换', 'sub3', <FileOutlined/>,[
            //getItem('pdf转docx','student_pdf2docx'),
            getItem('docx转pdf','student_docx2pdf'),
            getItem('excel转pdf','student_excel2pdf'),
            getItem('pdf转excel','student_pdf2excel'),
        ]),
        getItem('二维码生成','student_qrcode_generation',<AppstoreOutlined />),
        getItem('机器翻译', 'student_translation', <DesktopOutlined/>),
        getItem('聊天机器人', 'student_robot', <TeamOutlined/>,
            robots.map((robot, index) => (
                getItem(robot.title, 'student_robot/'+robot.id.toString()+'/'+robot.role.toString())
            ))
        ),
    ];

    React.useEffect(() => {
        const pathname = location.pathname;
        const encodedPathname = decodeURIComponent(pathname);
        const paths = encodedPathname.split('/').filter(Boolean);
        setBreadcrumbs(paths);
    }, [location]);
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    // 设置点击事件跳转
    const navigate = useNavigate()
    // 点击函数测试
    const menuClick = (e)=>{
        navigate(e.key,{replace:true})
    };
    return (
        <div>
            <StudentNavi></StudentNavi>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical"/>
                    <Menu onClick={menuClick} theme="dark" defaultSelectedKeys={['0']} mode="inline" items={items}>
                    </Menu>
                </Sider>
                <Layout>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {breadcrumbs.map((item, index) => (
                                <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 1000,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Routes>
                                {/* 用户中心 */}
                                <Route exact path="student_profile" element={<StudentProfile/>}></Route>
                                <Route exact path="student_newRobot" element={<NewRobot/>}></Route>
                                <Route exact path="student_classroom" element={<StudentClassroom/>}></Route>
                                {/* 文件转换模块 */}
                                {/* 图表生成模块 */}
                                <Route exact path="student_piechart" element={<PieChart/>}/>
                                <Route exact path="student_boxchart" element={<BoxChart/>}/>
                                <Route exact path="student_histchart" element={<HistChart/>}/>
                                <Route exact path="student_linechart" element={<LineChart/>}/>
                                {/* 二维码生成处理模块 */}
                                <Route exact path="student_qrcode_generation" element={<QRcodeGeneration/>}></Route>
                                {/* 文件转换模块 */}
                                <Route exact path="student_pdf2docx" element={<Pdf2Docx/>}></Route>
                                <Route exact path="student_docx2pdf" element={<Docx2Pdf/>}></Route>
                                <Route exact path="student_excel2pdf" element={<Excel2Pdf/>}></Route>
                                <Route exact path="student_excel2docx" element={<Excel2Docx/>}></Route>
                                <Route exact path="student_pdf2excel" element={<Pdf2Excel/>}></Route>
                                {/* 机器翻译模块 */}
                                <Route exact path="student_translation" element={<LanguageTranslation/>}/>
                                {/* 聊天机器人模块 */}
                                <Route exact path="student_robot/:robotId/:robotRole" element={<StudentRobot/>}/>
                            </Routes>
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
};
export default StudentIndex;