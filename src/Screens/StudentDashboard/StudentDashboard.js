import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Sidebar from "../../Components/Sidebar/Sidebar"

const StudentDashboard = () => {
    return (
        <Row>
            <Col>
                <Sidebar />
            </Col>
            <Col>
            </Col>
        </Row>
    );
};

export default StudentDashboard;