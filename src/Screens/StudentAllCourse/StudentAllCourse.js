import axios from "axios";
import { createBrowserHistory } from "history";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import Sidebar from "../../Components/Sidebar/Sidebar";

const StudentAllCourse = () => {
    const history = createBrowserHistory();
    const [data, setData] = useState([]);
    const [checkEnrolled, SetCheckEnrolled] = useState([]);
    const [studentInfo, setStudentInfo] = useState([]);
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const id = useSelector((state) => state.userLogin.userInfo._id);

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const handleFetch = async () => {
        const { data } = await axios.get(`/api/courses/totalcourse`, config);
        if (data) {
            setData(data?.course);
        }
    };

    const handlStudent = async () => {
        const { data } = await axios.get(
            `/api/students/studentProfile/${id}`,
            config
        );
        if (data) {
            setStudentInfo(data?.student);
        }
    };

    const checkEnroll = async () => {
        const { data } = await axios.get(`/api/enrolled/getenroll/${id}`, config);
        if (data) {
            SetCheckEnrolled(data?.enroll);
        }
    };

    useEffect(() => {
        handleFetch();
        handlStudent();
        checkEnroll();
        // eslint-disable-next-line
    }, [token]);

    const handleEnroll = async (courseId, user) => {
        const formData = {
            student: id,
            teacher: user,
            courseId: courseId,
        };
        const { data } = await axios.post(`/api/enrolled`, formData, config);
        if (data?.success === true) {
            swal("Good job!", "successfully enrolled!", "success")
                .then((value) => {
                    history.go(0);
                });
        }
    };

    return (
        <Row className="m-0">
            <Col md={4} lg={2}>
                <Sidebar />
            </Col>
            <Col md={8} lg={10}>
                <Container>
                    <Table responsive className="mt-3">
                        <thead>
                            <tr className="text-center">
                                <th>Serial</th>
                                <th>Title</th>
                                <th>Class</th>
                                <th>Topic</th>
                                <th className="text-nowrap">Start Date</th>
                                <th>Time</th>
                                <th>About</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((data, i) => (
                                <tr key={i} className="text-center">
                                    <td>{++i}</td>
                                    <td>{data.title}</td>
                                    <td>{data.classLevel}</td>
                                    <td>{data.topic}</td>
                                    <td className="text-nowrap">{data.start}</td>
                                    <td>{data.time}</td>
                                    <td>{data.about}</td>

                                    {studentInfo?.classLevel === data?.classLevel &&
                                        checkEnrolled.some(
                                            (course) => course.courseId === data._id
                                        ) ? (
                                        <td
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleEnroll(data?._id, data?.user)}
                                        >
                                            enrolled
                                        </td>
                                    ) : (
                                        studentInfo?.classLevel === data?.classLevel ?
                                            <td
                                                style={{ cursor: "pointer" }}
                                                onClick={() => handleEnroll(data?._id, data?.user)}
                                            >Enroll</td> :
                                            <td>&nbsp;</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </Col>
        </Row>
    );
};

export default StudentAllCourse;
