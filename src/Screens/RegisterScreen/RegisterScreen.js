import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../../components/common/Message";
// import { register } from "../../actions/userActions";
import "./RegisterScreen.css";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockLine } from "react-icons/ri";
// import { useLocation } from 'react-router-dom'

const RegisterScreen = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [message, setMessage] = useState(null);

  const submitHandler = (e) => {
    // e.preventDefault();
    // if (password === retypePassword) {
    //   setMessage("");
    //   dispatch(register(role, email, password));
    //   document.getElementById("signup_form").reset();
    // } else {
    //   setMessage("Both Password Should Matched");
    // }
  };

  return (
    <div className="mt-5 container main_content">
      <div className="middle-div">
        <div className="d-flex justify-content-center pb-2">
          <Link className="sign underline" to="/login">
            SIGN IN
          </Link>
          <p className="px-2 sign">|</p>
          <Link className={location.pathname === "/register" ? "text-secondary sign underline" : "sign underline"} to="/register">
            SIGN UP
          </Link>
        </div>
        <div className="main_login mt-2 mx-auto">
          <form onSubmit={submitHandler} id="signup_form" className="signup_form">
            <p className="pt-3 font_style radio_button pb-2">I am a:</p>
            <div className="d-flex">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  onChange={() => setRole("student")}
                  checked={role === "student"}
                  required
                />
                <label className="form-check-label font_style radio_button">
                  Student
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="role"
                  type="radio"
                  checked={role === "tutor"}
                  onChange={() => setRole("tutor")}
                  required
                />
                <label className="form-check-label font_style radio_button">
                  Tutor
                </label>
              </div>
            </div>
            <div className="email mt-2">
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
              <HiOutlineMail className="i" />
            </div>
            <div className="password mt-2">
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <RiLockLine className="i" />
            </div>
            <div className="password mt-2">
              <input
                className="form-control"
                type="password"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                placeholder="Retype your password"
              />
              <RiLockLine className="i" />
            </div>
            <div className="mt-3">
              {/* {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>} */}
            </div>
            <p className="pt-2 pb-2">
              <small className="bottom_text">
                Already have an account?
                <Link className="link-style px-1" to="/login">
                  Sign in
                </Link>
              </small>
            </p>
            <small className="bottom_text">
              By creating an account, you agree to
            </small>
            <br />
            <small className="bottom_text">
              Tutory's User <span>Privacy Policy</span> and{" "}
              <span>Terms and Conditions.</span>
            </small>
            <button type="submit" className="btn btn-primary Sign_button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;