import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import StudentProfile from '../../Components/StudentProfile/StudentProfile';
import Sidebar from "../../Components/Sidebar/Sidebar";

const StudentProfileView = () => {
    return (
        <Row className='m-0'>
            <Col md={4} lg={2}>
                <Sidebar />
            </Col>
            <Col md={8} lg={10}>
                <Container>
                    <StudentProfile/>
                </Container>
            </Col>
        </Row>
    );
};

export default StudentProfileView;