import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";
import { useSelector } from "react-redux";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const TeacherProfileEdit = ({ tutorInfo }) => {

    const history = useNavigate();
    const [info, setInfo] = useState({});
console.log(info);
    useEffect(() => {
        setInfo({
            name: tutorInfo?.name,
            gender: tutorInfo?.gender,
            phone: tutorInfo?.phone,
            birthDate: tutorInfo?.birthDate,
            address: tutorInfo?.address,
            nationality: tutorInfo?.nationality,
            degree: tutorInfo?.degree,
            result: tutorInfo?.result,
            institute: tutorInfo?.institute,
            photo: [tutorInfo?.photo],
            deleted: ""
        })
    }, [tutorInfo])

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
    const deleteImage = (file = "", name) => {
        const removeImage = { ...info };
        if (file !== "") {
            removeImage["deleted"] = file;
        }
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
        formData.append("name", info?.name);
        formData.append("gender", info?.gender);
        formData.append("phone", info?.phone);
        formData.append("birthDate", info?.birthDate);
        formData.append("address", info?.address);
        formData.append("nationality", info?.nationality);
        formData.append("degree", info?.degree);
        formData.append("result", info?.result);
        formData.append("institute", info?.institute);
        formData.append("photo", info?.photo);
        formData.append("deleted", info?.deleted);

        const { data } = await axios.post(`/api/tutors/profileEdit/${id}`, formData, config);
        if (data.success === true) {
            swal("Good job!", "Profile Updated!", "success")
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
                                defaultValue={tutorInfo?.name}
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
                                <option style={{ display: "none" }}>
                                    {info ? info.gender : "Select Gender"}
                                </option>
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
                                defaultValue={info?.phone}
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
                                defaultValue={tutorInfo?.birthDate}
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
                                defaultValue={tutorInfo?.address}
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
                                defaultValue={tutorInfo?.nationality}
                                placeholder="Your Nationality"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Degree</Form.Label>
                            <Form.Control
                                type="text"
                                name="degree"
                                onChange={handleChange}
                                defaultValue={tutorInfo?.degree}
                                placeholder="Your Class"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Result</Form.Label>
                            <Form.Control
                                type="text"
                                name="result"
                                onChange={handleChange}
                                defaultValue={tutorInfo?.result}
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
                                defaultValue={tutorInfo?.institute}
                                placeholder="Your Institute Name"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4} className="mx-auto">
                        <Card>
                            <Card.Header className="card-header">
                                Profile Picture
                            </Card.Header>
                            {info?.photo?.length !== 0 ? (
                                <div className="show_image">
                                    <img
                                        src={
                                            info?.photo?.name
                                                ? URL.createObjectURL(info?.photo)
                                                : info?.photo ? `/${info?.photo}` : ""
                                        }
                                        alt="idFront"
                                    />
                                    <TiDelete
                                        onClick={() =>
                                            deleteImage(info?.photo[0], "photo")
                                        }
                                        className="image_delete"
                                    />
                                </div>
                            ) : (
                                <Card.Body className="card_width">
                                    <br />
                                    <Row style={{ textAlign: "center" }}>
                                        <Card.Title className="click-for-upload text-center mt-5">
                                            <input
                                                required
                                                style={{ width: "115px" }}
                                                name="photo"
                                                type="file"
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

export default TeacherProfileEdit;
