import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
    const history = useNavigate();
    const [studentInfo, setstudentInfo] = useState([]);
    const id = useSelector((state) => state.userLogin.userInfo._id);
    const token = useSelector((state) => state.userLogin.userInfo.token);

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        fetch(`/api/students/studentProfile/${id}`, config)
            .then((res) => {
                if (res.status !== 201) {
                    history("/profile/create")
                }
                else {
                   res.json()
                   .then((data) => setstudentInfo(data?.student))
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
                    src={`/${studentInfo?.photo}`}
                    alt="tutor"
                />
                <Row className="mx-auto d-flex justify-content-center pt-5">
                    <Col md={4}>
                        <p className="text-center">Name: {studentInfo?.name}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Gender: {studentInfo?.gender}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Contact: {studentInfo?.phone}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Birth Date: {studentInfo?.birthDate}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Address: {studentInfo?.address}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">
                            Nationality: {studentInfo?.nationality}
                        </p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Class: {studentInfo?.classLevel}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Result: {studentInfo?.roll}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Institute: {studentInfo?.institute}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default StudentProfile;
