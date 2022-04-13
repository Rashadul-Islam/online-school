import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const TeacherProfileCreate = () => {
    return (
        <div>
            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Name" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Name" />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default TeacherProfileCreate;