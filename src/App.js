import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import Header from "./Components/Header/Header";
import Homepage from "./Screens/Homepage/Homepage";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  const role = useSelector((state) =>
    state.userLogin.userInfo ? state.userLogin.userInfo.role : ""
  );
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role={role}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
