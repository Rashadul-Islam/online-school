import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Dropdown, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MCQModal from '../../Components/MCQModal/MCQModal';
import Sidebar from "../../Components/Sidebar/Sidebar";

const AllCourse = () => {
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const id = useSelector((state) => state.userLogin.userInfo._id);
    const [data, setData] = useState([]);
    const [courseId, setCourseId] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);

    const handleFetch = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`/api/courses/allCourse/${id}`, config);
        if (data) {
            setData(data?.course)
        }
    }
    useEffect(() => {
        handleFetch();
        // eslint-disable-next-line
    }, [id])

    const handleModal = (id) => {
        setModalShow(true);
        setCourseId(id);
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
                                <th>Class</th>
                                <th>Topic</th>
                                <th className='text-nowrap'>Start Date</th>
                                <th>Time</th>
                                <th>About</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((data, i) =>
                                    <tr key={i} className="text-center">
                                        <td>{++i}</td>
                                        <td>{data.title}</td>
                                        <td>{data.classLevel}</td>
                                        <td>{data.topic}</td>
                                        <td className='text-nowrap'>{data.start}</td>
                                        <td>{data.time}</td>
                                        <td>{data.about}</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="outline-secondary"
                                                    size="sm"
                                                ></Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleModal(data._id)}>
                                                        Create MCQ
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
            <MCQModal
                courseId={courseId}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Row>
    );
};

export default AllCourse;