import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
    const history = useNavigate();
    const [studentinfo, setStudentinfo] = useState([]);
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
                   .then((data) => setStudentinfo(data?.student))
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
                    src={`${studentinfo?.photo}`}
                    alt="tutor"
                />
                <Row className="mx-auto d-flex justify-content-center pt-5">
                    <Col md={4}>
                        <p className="text-center">Name: {studentinfo?.name}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Gender: {studentinfo?.gender}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Contact: {studentinfo?.phone}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Birth Date: {studentinfo?.birthDate}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Address: {studentinfo?.address}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">
                            Nationality: {studentinfo?.nationality}
                        </p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Degree: {studentinfo?.classLevel}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Result: {studentinfo?.roll}</p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center">Institute: {studentinfo?.institute}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default StudentProfile;
