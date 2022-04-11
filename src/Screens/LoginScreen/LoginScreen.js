import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { Form, Button, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../../components/common/Message";
// import { login } from "../../actions/userActions";
import "./LoginScreen.css";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockLine } from "react-icons/ri";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = () => {

    }
    let location = useLocation();

    return (
        <div className="mt-5 container main_content">
            <div className="middle-div">
                <div className="d-flex justify-content-center pb-2">
                    <Link className={location.pathname === "/login" ? "text-secondary sign underline" : "sign underline"} to="/login">
                        SIGN IN
                    </Link>
                    <p className="px-2 sign">|</p>
                    <Link className="sign underline" to="/register">
                        SIGN UP
                    </Link>
                </div>
                <Row className="main_login mt-2 mx-auto">
                    <Col>
                        <div className="login_form_main mx-auto">
                            <p className="form_heading">Sign in with your email and password</p>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="email mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <HiOutlineMail className="i" />
                                </Form.Group>
                                <Form.Group className="password mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <RiLockLine className="i" />
                                </Form.Group>
                                {/* {error && <Message variant="danger">{error}</Message>} */}
                                <div className="d-flex justify-content-between">
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check
                                            type="checkbox"
                                            label={<small>Remember me</small>}
                                        />
                                    </Form.Group>
                                    <p className="new_sign text-nowrap">
                                        <small>Forgot Password?</small>
                                    </p>
                                </div>
                                <Button className="submit_button rounded-pill" type="submit">
                                    Sign in
                                </Button>{" "}
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default LoginScreen;