import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from "../../Components/Sidebar/Sidebar"
import ProfileCreate from '../../Components/TeacherProfileCreate/TeacherProfileCreate';

const TeacherProfileCreate = () => {
    return (
        <Row className='m-0'>
            <Col md={4} lg={2}>
                <Sidebar />
            </Col>
            <Col md={8} lg={10}>
                <Container>
                    <ProfileCreate />
                </Container>
            </Col>
        </Row>
    );
};

export default TeacherProfileCreate;