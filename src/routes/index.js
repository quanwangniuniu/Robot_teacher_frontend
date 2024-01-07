import Home from "../pages/homepage/Home";
import StudentIndex from "../pages/student/StudentIndex";
import TeacherIndex from "../pages/teacher/TeacherIndex";
import {Navigate} from "react-router-dom";




export default  [
    {
        path: '/',
        element: <Navigate to="/home"/>,
        // render:()=>{<Home/>}
    },
    {
        path: '/studentIndex',
        element: <StudentIndex/>,
        // render:()=>{<StudentIndex/>}
    },
    {
        path: '/teacherIndex',
        element: <TeacherIndex/>,
        // render:()=>{<TeacherIndex/>}
    },
    // {
    //     path: '/home',
    //     element: <Home/>
    // },
]