import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./TeacherProfile.css";

const TeacherProfile = () => {
    const history = useNavigate();
    const [tutorInfo, setTutorInfo] = useState([]);
    const id = useSelector((state) => state.userLogin.userInfo._id);
    const token = useSelector((state) => state.userLogin.userInfo.token);

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        fetch(`/api/tutors/tutorProfile/${id}`, config)
            .then((res) => {
                if (res.status !== 201) {
                    history("/profile/create")
                }
                else {
                    res.json()
                        .then((data) => setTutorInfo(data?.tutor))
                }
            })
        // eslint-disable-next-line
    }, [id]);

    return (
        <div>
            <Container>
                <Image
                    className="profile_picture mx-auto d-flex justify-content-center"
                    roundedCircle
                    src={`${tutorInfo?.photo}`}
                    alt="tutor"
                />
                <Row className="mx-auto d-flex justify-content-center pt-5">
                    <Col md={4}>
                        <p className="text-center">Name: {tutorInfo?.name}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Gender: {tutorInfo?.gender}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Contact: {tutorInfo?.phone}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Birth Date: {tutorInfo?.birthDate}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Address: {tutorInfo?.address}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Nationality: {tutorInfo?.nationality}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Degree: {tutorInfo?.degree}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Result: {tutorInfo?.result}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Institute: {tutorInfo?.institute}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default TeacherProfile;
