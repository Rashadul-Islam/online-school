import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewQuestion = (props) => {
    return (
        <Modal
            show={props.show} onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">View MCQ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props?.courseData?.map((data, i) => (
                        <div key={i}>
                            <p>{data.question}</p>
                            <div className='d-flex'>
                                <p className='px-5'>1. {data?.option1}</p>
                                <p>2. {data?.option2}</p>
                            </div>
                            <div className='d-flex'>
                                <p className='px-5'>3. {data?.option3}</p>
                                <p>4. {data?.option4}</p>
                            </div>
                            <p>Correct: {data?.correct}</p>
                        </div>
                    ))
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewQuestion;