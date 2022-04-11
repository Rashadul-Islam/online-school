import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import { Nav } from "react-bootstrap";
import Header from "./Components/Header/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
