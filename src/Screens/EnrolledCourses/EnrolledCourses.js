import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Sidebar from "../../Components/Sidebar/Sidebar";

const EnrolledCourses = () => {
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const id = useSelector((state) => state.userLogin.userInfo._id);
    const [data, setData] = useState([]);

    const handleFetch = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`/api/enrolled/enrollDetails/${id}`, config);
        if (data) {
            setData(data?.enroll)
        }
    }
    useEffect(() => {
        handleFetch();
        // eslint-disable-next-line
    }, [id])

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
                                <th>Teacher</th>
                                <th>Contact</th>
                                <th>Address</th>
                                <th>enrolled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((data, i) =>
                                    <tr key={i} className="text-center">
                                        <td>{++i}</td>
                                        <td>{data.detail.name}</td>
                                        <td>{data.detail.phone}</td>
                                        <td>{data.detail.address}</td>
                                        <td className='text-nowrap'>{moment(data.createdAt).format("YYYY-MM-DD hh:mm A")}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Container>
            </Col>
        </Row>
    );
};

export default EnrolledCourses;