import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { v4 as uuidv4 } from "uuid";

const MCQModal = (props) => {
    const history = useNavigate();
    const id = useSelector((state) => state.userLogin.userInfo._id);
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const [input, setInput] = useState([
        {
            id: uuidv4(),
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correct: "",
        },
    ]);

    const handleChangeInput = (id, event) => {
        const newinput = input.map((i) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value;
            }
            return i;
        });

        setInput(newinput);
    };

    const handleAddFields = (e) => {
        e.preventDefault();
        setInput([
            ...input,
            {
                id: uuidv4(),
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                correct: "",
            },
        ]);
    };

    const handleRemoveFields = (id) => {
        const values = [...input];
        values.splice(
            values.findIndex((value) => value.id === id),
            1
        );
        setInput(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }

        const formData = {
            user: id,
            courseId: props.courseId,
            questions: input
        };

        const { data } = await axios.post(`/api/mcqs`, formData, config);
        if (data.success === true) {
            swal("Good job!", "MCQ Created!", "success")
                .then((value) => {
                    history("/allMCQ");
                    document.getElementById("myForm").reset();
                });
        }
    };

    return (
        <Modal
            show={props.show} onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Create MCQ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} id="myForm">
                    {input.map((inputData) => (
                        <Form.Group key={inputData.id} className="mb-3">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                name="question"
                                onChange={(event) => handleChangeInput(inputData.id, event)}
                                placeholder="Enter your question"
                            ></Form.Control>
                            <Row>
                                <Col md={6} className="d-flex pt-3">
                                    <small className="d-flex align-items-center px-1">1.</small>
                                    <Form.Control
                                        type="text"
                                        name="option1"
                                        onChange={(event) => handleChangeInput(inputData.id, event)}
                                        placeholder="First optione"
                                    ></Form.Control>
                                </Col>
                                <Col md={6} className="d-flex pt-3">
                                    <small className="d-flex align-items-center px-1">2.</small>
                                    <Form.Control
                                        type="text"
                                        name="option2"
                                        onChange={(event) => handleChangeInput(inputData.id, event)}
                                        placeholder="Second optione"
                                    ></Form.Control>
                                </Col>
                                <Col md={6} className="d-flex pt-3">
                                    <small className="d-flex align-items-center px-1">3.</small>
                                    <Form.Control
                                        type="text"
                                        name="option3"
                                        onChange={(event) => handleChangeInput(inputData.id, event)}
                                        placeholder="Third optione"
                                    ></Form.Control>
                                </Col>
                                <Col md={6} className="d-flex pt-3">
                                    <small className="d-flex align-items-center px-1">4.</small>
                                    <Form.Control
                                        type="text"
                                        name="option4"
                                        onChange={(event) => handleChangeInput(inputData.id, event)}
                                        placeholder="Fourth optione"
                                    ></Form.Control>
                                </Col>
                                <Form.Label column md={2} className="mt-3">
                                    Correct
                                </Form.Label>
                                <Col md={10} className="mt-3">
                                    <Form.Control
                                        type="text"
                                        name="correct"
                                        onChange={(event) => handleChangeInput(inputData.id, event)}
                                        placeholder="Correct Answer"
                                    />
                                </Col>
                            </Row>
                            <Button
                                onClick={() => handleRemoveFields(inputData.id)}
                                disabled={input.length === 1}
                                variant="danger"
                                className="w-25 d-flex mx-auto justify-content-center mt-3"
                            >
                                - Remove
                            </Button>
                        </Form.Group>
                    ))}
                    <Button type="submit" variant="success" className="w-25 d-flex mx-auto justify-content-center mt-3">
                        save
                    </Button>
                </Form>
            </Modal.Body>
            <Button onClick={handleAddFields} className="w-25 mx-auto mb-3">
                + Add more
            </Button>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MCQModal;
