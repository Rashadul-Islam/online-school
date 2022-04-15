import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../Components/Sidebar/Sidebar";
import ProfileEdit from "../../Components/StudentProfileEdit/StudentProfileEdit";

const StudentProfileEdit = () => {

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
        <Row className='m-0'>
            <Col md={4} lg={2}>
                <Sidebar />
            </Col>
            <Col md={8} lg={10}>
                <Container>
                    <ProfileEdit studentInfo={studentInfo} />
                </Container>
            </Col>
        </Row>
    );
};

export default StudentProfileEdit;