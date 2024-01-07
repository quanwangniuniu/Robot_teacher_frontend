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
                    </>
                }>
                </Route>
                {/*{element}*/}
            </Routes>
            <CopyRight></CopyRight>
        </div>
    );
}

export default App;
