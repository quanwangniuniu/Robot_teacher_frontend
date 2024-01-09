import React, {useState} from 'react';
import {
    AppstoreOutlined,
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import TeacherNavi from "../../conponents/TeacherNavi/TeacherNavi";
import {Route, Routes, useNavigate} from "react-router-dom";
import QRcodeGeneration from "../../conponents/QRcodeGeneration/QRcodeGeneration";
import Pdf2Docx from "../../conponents/FileHandler/Pdf2Docx";
import Docx2Pdf from "../../conponents/FileHandler/Docx2Pdf";
import Excel2Pdf from "../../conponents/FileHandler/Excel2Pdf";
import Excel2Docx from "../../conponents/FileHandler/Excel2Docx";
import Pdf2Excel from "../../conponents/FileHandler/Pdf2Excel";
import LanguageTranslation from "../../conponents/Translation/LanguageTranslation";
import TeacherProfile from "../../conponents/TeacherHandler/TeacherProfile";
import HistChart from "../../conponents/ChartHandler/HistChart";
import PieChart from "../../conponents/ChartHandler/PieChart";
import BoxChart from "../../conponents/ChartHandler/BoxChart";
import LineChart from "../../conponents/ChartHandler/LineChart";

const {Content, Footer, Sider} = Layout;

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
        getItem('个人信息', 'teacher_profile'),
        getItem('使用统计', '2'),
        getItem('班级管理','3'),
        getItem('设置','4')
    ]),
    getItem('图表生成', 'sub2', <PieChartOutlined/>, [
        getItem('饼图生成', 'teacher_piechart'),
        getItem('折线图生成', 'teacher_linechart'),
        getItem('箱型图生成', 'teacher_boxchart'),
        getItem('直方图生成', 'teacher_histchart'),
    ]),
    getItem('文件转换', 'sub3', <FileOutlined/>,[
        getItem('pdf转docx','teacher_pdf2docx'),
        getItem('docx转pdf','teacher_docx2pdf'),
        getItem('excel转pdf','teacher_excel2pdf'),
        getItem('pdf转excel','teacher_pdf2excel'),
    ]),
    getItem('二维码生成','teacher_qrcode_generation',<AppstoreOutlined />),
    getItem('机器翻译', 'teacher_translation', <DesktopOutlined/>),
    getItem('聊天机器人', 'sub5', <TeamOutlined/>, [
        getItem('机器人1', '12'),
        getItem('机器人2', '13')
    ]),
];
const TeacherIndex = () => {
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
            <TeacherNavi></TeacherNavi>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical"/>
                    <Menu onClick={menuClick} theme="dark" defaultSelectedKeys={['0']} mode="inline" items={items}/>
                </Sider>
                <Layout>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 1000,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            教师端展现部分！！！！！！！！！！！！！！！！！
                            <Routes>
                                {/* 用户中心 */}
                                <Route exact path="teacher_profile" element={<TeacherProfile/>}></Route>

                                {/* 文件转换模块 */}
                                {/* 图表生成模块 */}
                                <Route exact path="teacher_piechart" element={<PieChart/>}/>
                                <Route exact path="teacher_boxchart" element={<BoxChart/>}/>
                                <Route exact path="teacher_histchart" element={<HistChart/>}/>
                                <Route exact path="teacher_linechart" element={<LineChart/>}/>
                                {/* 二维码生成处理模块 */}
                                <Route exact path="teacher_qrcode_generation" element={<QRcodeGeneration/>}></Route>
                                {/* 文件转换模块 */}
                                <Route exact path="teacher_pdf2docx" element={<Pdf2Docx/>}></Route>
                                <Route exact path="teacher_docx2pdf" element={<Docx2Pdf/>}></Route>
                                <Route exact path="teacher_excel2pdf" element={<Excel2Pdf/>}></Route>
                                <Route exact path="teacher_excel2docx" element={<Excel2Docx/>}></Route>
                                <Route exact path="teacher_pdf2excel" element={<Pdf2Excel/>}></Route>
                                {/* 机器翻译模块 */}
                                <Route exact path="teacher_translation" element={<LanguageTranslation/>}/>
                                {/* 聊天机器人模块 */}
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
export default TeacherIndex;