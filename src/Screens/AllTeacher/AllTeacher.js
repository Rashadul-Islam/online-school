import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Table, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Sidebar from "../../Components/Sidebar/Sidebar";

const AllTeacher = () => {
    const [info, setInfo] = useState([])
    const token = useSelector((state) => state.userLogin.userInfo.token);

    const handleFetch = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`/api/tutors/allteacher`, config);
        if (data) {
            setInfo(data?.tutor)
        }
    }

    useEffect(() => {
        handleFetch();
        // eslint-disable-next-line
    }, [token])

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
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Degree</th>
                                <th>Result</th>
                                <th>Institute</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                info?.map((data, i) =>
                                    <tr key={i} className="text-center">
                                        <td>{++i}</td>
                                        <td>
                                            <img style={{ height: "30px", width: "30px", borderRadius: "50%" }} src={`/${data.photo}`} alt="tutor" />
                                        </td>
                                        <td>{data.name}</td>
                                        <td>{data.gender}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.address}</td>
                                        <td>{data.degree}</td>
                                        <td>{data.result}</td>
                                        <td>{data.institute}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Container>
            </Col>
        </Row >
    );
};

export default AllTeacher;