import { createBrowserHistory } from "history";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import swal from "sweetalert";

const ExamModal = (props) => {
    const history = createBrowserHistory();
    useEffect(() => {
        setCount(0)
    }, [props])
    const [count, setCount] = useState(0);
    const handleChange = (input, answer) => {
        const answer1 = input.toLowerCase();
        const answer2 = answer.toLowerCase();
        if (answer1 === answer2) {
            setCount(count + 1)
        }
    };

    const handleExam = (e) => {
        e.preventDefault();
        swal("Good job!", `You have got ${count} marks !`, "success")
            .then((value) => {
                history.go(0);
            });
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Create MCQ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleExam}>
                    {props?.data?.map((data, i) => (
                        <div key={i}>
                            <p>{data.question}</p>
                            <div className="d-flex">
                                <p className="px-5">1. {data?.option1}</p>
                                <p>2. {data?.option2}</p>
                            </div>
                            <div className="d-flex">
                                <p className="px-5">3. {data?.option3}</p>
                                <p>4. {data?.option4}</p>
                            </div>
                            <Form.Control
                                type="text"
                                required
                                onBlur={(e) => handleChange(e.target.value, data?.correct)}
                                className="w-50 mt-2 mb-3"
                                placeholder="Type Your Answe"
                            />
                        </div>
                    ))}
                    <Button type="submit">Save</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExamModal;
