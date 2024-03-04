import {Route, Routes} from "react-router-dom";
import './App.css';
import React from 'react'
// import routes from './routes'
import CopyRight from "./conponents/CopyRight/CopyRight";
import Home from "./pages/homepage/Home";
import StudentIndex from "./pages/student/StudentIndex";
import Pdf2Docx from "./conponents/FileHandler/Pdf2Docx";
import Pdf2Excel from "./conponents/FileHandler/Pdf2Excel"
import Docx2Pdf from "./conponents/FileHandler/Docx2Pdf"
import Excel2Pdf from "./conponents/FileHandler/Excel2Pdf"
import LanguageTranslation from './conponents/Translation/LanguageTranslation'
import QRcodeGeneration from "./conponents/QRcodeGeneration/QRcodeGeneration";
import TeacherIndex from "./pages/teacher/TeacherIndex";
import StudentProfile from "./conponents/StudentHandler/StudentProfile"
import TeacherProfile from "./conponents/TeacherHandler/TeacherProfile";
import StudentRobot from "./pages/student/RobotStudent";
import PieChart from "./conponents/ChartHandler/PieChart";
import BoxChart from "./conponents/ChartHandler/BoxChart";
import HistChart from "./conponents/ChartHandler/HistChart";
import LineChart from "./conponents/ChartHandler/LineChart";
import NewRobot from "./conponents/NewRobot/NewRobot";
import AdminIndex from "./pages/admin/AdminIndex";
import ApplicationStatics from "./conponents/ApplicationStatics/Application_statics";
import StudentManage from "./conponents/AdminHandler/StudentManage";
import TeacherManage from "./conponents/AdminHandler/TeacherManage";
import RobotManage from "./conponents/AdminHandler/RobotManage";
import MessagesManage from "./conponents/AdminHandler/MessagesManage"
import NotFoundPage from "./pages/NotFoundPage";
import NewTeacherRobot from "./conponents/NewRobot/NewTeacherRobot";
import TeacherRobot from "./pages/teacher/RobotTeacher";
import TeacherClassroom from "./conponents/TeacherHandler/TeacherClassroom";
import TeacherClassroomChat from "./conponents/TeacherHandler/TeacherClassroomChat";




function App() {
    // const element = useRoutes(routes)
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path="/studentIndex" element={<StudentIndex/>} children={
                    <>
                        <Route path={'student_pdf2docx'} element={<Pdf2Docx />}></Route>
                        <Route path={'student_docx2pdf'} element={<Docx2Pdf />}></Route>
                        <Route path={'student_excel2pdf'} element={<Excel2Pdf />}></Route>
                        <Route path={'student_pdf2excel'} element={<Pdf2Excel />}></Route>
                        <Route path={'student_translation'} element={<LanguageTranslation />}></Route>
                        <Route path={'student_qrcode_generation'} element={<QRcodeGeneration/>}></Route>
                        <Route path={'student_profile'} element={<StudentProfile/>}></Route>
                        <Route path={'student_robot/:robotId/:robotRole'} element={<StudentRobot/>}></Route>
                        <Route path={'student_piechart'} element={<PieChart/>}></Route>
                        <Route path={'student_boxchart'} element={<BoxChart/>}></Route>
                        <Route path={'student_histchart'} element={<HistChart/>}></Route>
                        <Route path={'student_linechart'} element={<LineChart/>}></Route>
                        <Route path={'student_newRobot'} element={<NewRobot/>}></Route>

                    </>
                }>
                </Route>
                <Route path="/teacherIndex" element={<TeacherIndex/>} children={
                    <>
                        <Route path={'teacher_pdf2docx'} element={<Pdf2Docx />}></Route>
                        <Route path={'teacher_docx2pdf'} element={<Docx2Pdf />}></Route>
                        <Route path={'teacher_excel2pdf'} element={<Excel2Pdf />}></Route>
                        <Route path={'teacher_pdf2excel'} element={<Pdf2Excel />}></Route>
                        <Route path={'teacher_translation'} element={<LanguageTranslation />}></Route>
                        <Route path={'teacher_qrcode_generation'} element={<QRcodeGeneration/>}></Route>
                        <Route path={'teacher_profile'} element={<TeacherProfile/>}></Route>
                        <Route path={'teacher_piechart'} element={<PieChart/>}></Route>
                        <Route path={'teacher_boxchart'} element={<BoxChart/>}></Route>
                        <Route path={'teacher_histchart'} element={<HistChart/>}></Route>
                        <Route path={'teacher_linechart'} element={<LineChart/>}></Route>
                        <Route path={'teacher_newRobot'} element={<NewTeacherRobot/>}></Route>
                        <Route path={'teacher_classroom'} element={<TeacherClassroom/>}></Route>
                        <Route path={'teacher_classroom_chat'} element={<TeacherClassroomChat/>}></Route>

                        <Route path={'teacher_robot/:robotId/:robotRole'} element={<TeacherRobot/>}></Route>
                    </>
                }>
                </Route>
                <Route path='/adminIndex' element={<AdminIndex/>} children={
                    <>
                        <Route path={'application_statics'} element={<ApplicationStatics />}></Route>
                        <Route path={"student_manage"} element={<StudentManage/>}></Route>
                        <Route path={"teacher_manage"} element={<TeacherManage/>}></Route>
                        <Route path={"robot_manage"} element={<RobotManage/>}></Route>
                        <Route path={"messages_manage"} element={<MessagesManage/>}></Route>
                    </>
                }>
                </Route>
                <Route path="*" element={<NotFoundPage />} /> {/* 所有未匹配路由都重定向到404页面 */}
                {/*{element}*/}
            </Routes>
            <CopyRight></CopyRight>
        </div>
    );
}

export default App;
