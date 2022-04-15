import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import Header from "./Components/Header/Header";
import Homepage from "./Screens/Homepage/Homepage";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import TeacherDashboard from "./Screens/TeacherDashboard/TeacherDashboard";
import StudentDashboard from "./Screens/StudentDashboard/StudentDashboard";
import AdminDashboard from "./Screens/AdminDashboard/AdminDashboard";
import TeacherProfileCreate from "./Screens/TeacherProfileCreate/TeacherProfileCreate";
import StudentProfileCreate from "./Screens/StudentProfileCreate/StudentProfileCreate";
import TeacherProfileView from "./Screens/TeacherProfileView/TeacherProfileView";
import StudentProfileView from "./Screens/StudentProfileView/StudentProfileView";
import StudentProfileEdit from "./Screens/StudentProfileEdit/StudentProfileEdit";
import TeacherProfileEdit from "./Screens/TeacherProfileEdit/TeacherProfileEdit";
import PasswordChange from "./Screens/PasswordChange/PasswordChange";
import CreateCourse from "./Screens/CreateCourse/CreateCourse";
import AllCourse from "./Screens/AllCourse/AllCourse";
import AllMcq from "./Screens/AllMcq/AllMcq";
import StudentAllCourse from "./Screens/StudentAllCourse/StudentAllCourse";
import EnrolledCourses from "./Screens/EnrolledCourses/EnrolledCourses";
import AllTeacher from "./Screens/AllTeacher/AllTeacher";
import AllStudents from "./Screens/AllStudents/AllStudents";
import StudentExam from "./Screens/StudentExam/StudentExam";

function App() {
  const role = useSelector((state) =>
    state.userLogin.userInfo ? state.userLogin.userInfo.role : ""
  );
  return (
    <>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          {
            role === "student" &&
            <Route element={<ProtectedRoute role={role} />}>
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/profile/create" element={<StudentProfileCreate />} />
              <Route path="/profile" element={<StudentProfileView />} />
              <Route path="/profile/edit" element={<StudentProfileEdit />} />
              <Route path="/password/change" element={<PasswordChange />} />
              <Route path="/allcourse" element={<StudentAllCourse />} />
              <Route path="/enrolledCourses" element={<EnrolledCourses />} />
              <Route path="/exam" element={<StudentExam />} />
            </Route>
          }
          {
            role === "tutor" &&
            <Route element={<ProtectedRoute role={role} />}>
              <Route path="/dashboard" element={<TeacherDashboard />} />
              <Route path="/profile/create" element={<TeacherProfileCreate />} />
              <Route path="/profile" element={<TeacherProfileView />} />
              <Route path="/profile/edit" element={<TeacherProfileEdit />} />
              <Route path="/password/change" element={<PasswordChange />} />
              <Route path="/course/add" element={<CreateCourse />} />
              <Route path="/allcourse" element={<AllCourse />} />
              <Route path="/allMCQ" element={<AllMcq />} />
            </Route>
          }
          {
            role === "admin" &&
            <Route element={<ProtectedRoute role={role} />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/password/change" element={<PasswordChange />} />
              <Route path="/allteachers" element={<AllTeacher />} />
              <Route path="/allstudents" element={<AllStudents />} />
            </Route>
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;
