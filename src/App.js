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
            </Route>
          }
          {
            role === "tutor" &&
            <Route element={<ProtectedRoute role={role} />}>
              <Route path="/dashboard" element={<TeacherDashboard />} />
              <Route path="/profile/create" element={<TeacherProfileCreate />} />
            </Route>
          }
          {
            role === "admin" &&
            <Route element={<ProtectedRoute role={role} />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
            </Route>
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;
