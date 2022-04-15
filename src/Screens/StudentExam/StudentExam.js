import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Dropdown, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Sidebar from "../../Components/Sidebar/Sidebar";
import moment from 'moment';
import ExamModal from '../../Components/ExamModal/ExamModal';

const StudentExam = () => {
    const [question, setQuestion] = useState([]);
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const id = useSelector((state) => state.userLogin.userInfo._id);

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const getQuestion = async () => {
        const { data } = await axios.get(`/api/enrolled/getquestion/${id}`, config);
        if (data) {
            setQuestion(data?.enroll);
        }
    };

    useEffect(() => {
        getQuestion();
        // eslint-disable-next-line
    }, [token]);

    const handleModal = (id) => {
        setModalShow(true);
        setData(id);
    }

    return (
        <Row className='m-0'>
            <Col md={4} lg={2}>
                <Sidebar />
            </Col>
            <Col md={8} lg={10}>
                <Container>
                    <Table responsive className='mt-3'>
                        <thead>
                            <tr className='text-center'>
                                <th>Serial</th>
                                <th>Title</th>
                                <th>Topic</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                question?.map((data, i) =>
                                    <tr key={i} className="text-center">
                                        <td>{++i}</td>
                                        <td>{data.title}</td>
                                        <td>{data.topic}</td>
                                        <td>{moment(data.create).format("YYYY-MM-DD hh:mm A")}</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="outline-secondary"
                                                    size="sm"
                                                ></Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        onClick={() => handleModal(data.question)}
                                                    >
                                                        strat Exam
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Container>
            </Col>
            <ExamModal
                data={data}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Row>
    );
};

export default StudentExam;