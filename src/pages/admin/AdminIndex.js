import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {
    AppstoreOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Route, Routes} from "react-router-dom";
import MessagesManage from '../../conponents/AdminHandler/MessagesManage'
import StudentManage from "../../conponents/AdminHandler/StudentManage"
import TeacherManage from "../../conponents/AdminHandler/TeacherManage"
import ApplicationStatics from "../../conponents/ApplicationStatics/Application_statics";
import AdminNavibars from "../../conponents/AdminNavi/AdminNavi";
import RobotManage from "../../conponents/AdminHandler/RobotManage";



const AdminIndex = () => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const location = useLocation();
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
        getItem('用户管理', 'sub1', <UserOutlined/>, [
            getItem('学生用户管理', 'student_manage'),
            getItem('教师用户管理','teacher_manage'),
        ]),
        getItem('系统使用统计', 'application_statics', <PieChartOutlined/>),
        getItem('应用管理', 'sub3', <AppstoreOutlined />,[
            getItem('聊天机器人管理','robot_manage'),
            getItem('消息管理','messages_manage'),
        ]),
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
            <AdminNavibars></AdminNavibars>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical"/>
                    <Menu onClick={menuClick} theme="light" defaultSelectedKeys={['application_statics']} mode="inline" items={items}>
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
                                minHeight: 1500,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Routes>
                                {/* 用户管理 */}
                                <Route exact path="student_manage" element={<StudentManage/>}></Route>
                                <Route exact path="teacher_manage" element={<TeacherManage/>}></Route>
                                {/* 系统使用统计 */}
                                <Route exact path="application_statics" element={<ApplicationStatics/>}></Route>
                                {/* 机器人管理模块 */}
                                <Route exact path="robot_manage" element={<RobotManage/>}/>
                                <Route exact path="messages_manage" element={<MessagesManage/>}/>
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
export default AdminIndex;