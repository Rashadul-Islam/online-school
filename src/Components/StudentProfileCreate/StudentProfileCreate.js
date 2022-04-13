import axios from "axios";
import React, { useState } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";
import { useSelector } from "react-redux";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const StudentProfileCreate = () => {
    const history = useNavigate();
    const [info, setInfo] = useState({
        name: "",
        gender: "",
        phone: "",
        birthDate: "",
        address: "",
        nationality: "",
        classLevel: "",
        roll: "",
        institute: "",
        photo: [],
    });

    //set image information
    const handleChange = (e) => {
        const newInfo = { ...info };
        if (e.target.name === "photo") {
            newInfo[e.target.name] = e.target.files[0];
        } else {
            newInfo[e.target.name] = e.target.value;
        }
        setInfo(newInfo);
    };
    const id = useSelector((state) => state.userLogin.userInfo._id);
    const token = useSelector((state) => state.userLogin.userInfo.token);

    //delete firestore image
    const deleteImage = (name) => {
        const removeImage = { ...info };
        removeImage[name] = [];
        setInfo(removeImage);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }

        const formData = new FormData();
        formData.append("user", id);
        formData.append("name", info.name);
        formData.append("gender", info.gender);
        formData.append("phone", info.phone);
        formData.append("birthDate", info.birthDate);
        formData.append("address", info.address);
        formData.append("nationality", info.nationality);
        formData.append("classLevel", info.classLevel);
        formData.append("roll", parseInt(info.roll));
        formData.append("institute", info.institute);
        formData.append("photo", info.photo);

        const { data } = await axios.post(`/api/students`, formData, config);
        if (data.success === true) {
            swal("Good job!", "You clicked the button!", "success")
                .then((value) => {
                    history("/profile");
                    document.getElementById("myForm").reset();
                });
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} id="myForm">
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={handleChange}
                                placeholder="Enter Name"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Gender</Form.Label>
                            <select
                                className="form-select"
                                name="gender"
                                onChange={handleChange}
                                required
                            >
                                <option value="" hidden>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                onChange={handleChange}
                                placeholder="Enter Phone Number"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="birthDate"
                                onChange={handleChange}
                                placeholder="Enter Phone Number"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                onChange={handleChange}
                                placeholder="Current Address"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control
                                type="text"
                                name="nationality"
                                onChange={handleChange}
                                placeholder="Your Nationality"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Class</Form.Label>
                            <Form.Control
                                type="text"
                                name="classLevel"
                                onChange={handleChange}
                                placeholder="Your Class"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Result</Form.Label>
                            <Form.Control
                                type="number"
                                name="roll"
                                min={0}
                                onChange={handleChange}
                                placeholder="Roll"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Institute Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="institute"
                                onChange={handleChange}
                                placeholder="Your Institute Name"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4} className="mx-auto">
                        <Card className="profile_image mt-2">
                            <Card.Header className="card-header">
                                Upload Photo from computer:
                            </Card.Header>
                            {info.photo.length !== 0 ? (
                                <div className="show_image">
                                    <img src={URL.createObjectURL(info.photo)} alt="tutor" />
                                    <TiDelete
                                        onClick={() => deleteImage("photo")}
                                        className="image_delete"
                                    />
                                </div>
                            ) : (
                                <Card.Body className="card_width">
                                    <Card.Text className="instruction-text">
                                        Upload your photo <br />
                                        <br />
                                    </Card.Text>
                                    <br />
                                    <Row style={{ textAlign: "center" }}>
                                        <Card.Title className="click-for-upload">
                                            <input
                                                name="photo"
                                                type="file"
                                                required
                                                style={{ width: "115px" }}
                                                accept="image/png, image/jpeg, image/jpg"
                                                onChange={handleChange}
                                            />
                                        </Card.Title>
                                    </Row>
                                </Card.Body>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Button
                    variant="outline-primary d-flex justify-content-center mx-auto mt-3 mb-3"
                    type="submit"
                >
                    Save
                </Button>{" "}
            </Form>
        </div>
    );
};

export default StudentProfileCreate;
