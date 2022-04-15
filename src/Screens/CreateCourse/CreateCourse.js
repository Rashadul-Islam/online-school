import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import Sidebar from "../../Components/Sidebar/Sidebar";

const CreateCourse = () => {
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const [info, setInfo] = useState({
        user: useSelector((state) => state.userLogin.userInfo._id),
        title: "",
        classLevel: "",
        topic: "",
        start: "",
        time: "",
        about: ""
    })
    const handleChange = (e) => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }

    const handleFetch = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.post(`/api/courses`, info, config);
        if (data?.success === true) {
            swal("Good job!", "Course created!", "success")
                .then((value) => {
                    document.getElementById("myForm").reset();
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFetch();
    }

    return (
        <Row className='m-0'>
            <Col md={4} lg={2}>
                <Sidebar />
            </Col>
            <Col md={8} lg={10}>
                <Container>
                    <Form onSubmit={handleSubmit} id="myForm" className='mt-5'>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Course Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        placeholder="Course title"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>For Class</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min={1}
                                        name="classLevel"
                                        onChange={handleChange}
                                        placeholder="EX: 7"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Topics</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="topic"
                                        onChange={handleChange}
                                        placeholder="Your topics"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="start"
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Class Time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="time"
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>About Course</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="about"
                                        onChange={handleChange}
                                        placeholder="About Course"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button
                            variant="outline-primary d-flex justify-content-center mx-auto mt-3 mb-3"
                            type="submit"
                        >
                            Save
                        </Button>{" "}
                    </Form>
                </Container>
            </Col>
        </Row>
    );
};

export default CreateCourse;