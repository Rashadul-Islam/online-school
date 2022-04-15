import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Sidebar from "../../Components/Sidebar/Sidebar";
import ViewQuestion from '../../Components/ViewQuestion/ViewQuestion';

const AllMcq = () => {
    const [data, setData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const id = useSelector((state) => state.userLogin.userInfo._id);
    const handleFetch = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`/api/mcqs/allmcq/${id}`, config);
        if (data) {
            setData(data?.mcqs)
        }
    }
    useEffect(() => {
        handleFetch();
        // eslint-disable-next-line
    }, [id])

    const handleModal = (data) => {
        setModalShow(true);
        setCourseData(data);
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
                                <th>About</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((info, i) =>
                                    <tr key={i} className="text-center">
                                        <td>{++i}</td>
                                        <td>{info?.mcq?.title}</td>
                                        <td>{info?.mcq?.classLevel}</td>
                                        <td>{info?.mcq?.topic}</td>
                                        <td>{info?.mcq?.about}</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="outline-secondary"
                                                    size="sm"
                                                ></Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleModal(info.questions)}>
                                                        View Questions
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
            <ViewQuestion
                courseData={courseData}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Row>
    );
};

export default AllMcq;