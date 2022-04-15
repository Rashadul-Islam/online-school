import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import Sidebar from "../../Components/Sidebar/Sidebar";
import Message from "../../Components/common/Message";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { logout } from '../../actions/userActions';

const PasswordChange = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [info, setInfo] = useState({
        current: "",
        new: "",
        retype: ""
    })
    const id = useSelector((state) => state.userLogin.userInfo._id);
    const token = useSelector((state) => state.userLogin.userInfo.token);

    const handleFetch = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const formData = {
            current: info?.current,
            newpass: info?.new
        };
        const { data } = await axios.post(`/api/users/changePassword/${id}`, formData, config)
            .catch(err => setError(err.response.statusText));

        if (data?.token) {
            swal("Good job!", "Password Updated!", "success")
                .then((value) => {
                    dispatch(logout());
                    document.getElementById("password").reset();
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (info?.new === info?.retype) {
            setMessage("");
            handleFetch();
        } else {
            setMessage("Both Password Should Matched");
        }
    }

    const handleChange = (e) => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }

    return (
        <Row className='m-0'>
            <Col md={4} lg={2}>
                <Sidebar />
            </Col>
            <Col md={8} lg={10}>
                <Container>
                    <Form className='w-50 mx-auto mt-5' onSubmit={handleSubmit} id="password">
                        <Form.Group className="mb-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control placeholder="Current Password" type='password' name="current" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control placeholder="New Password" type='password' name="new" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Retype Password</Form.Label>
                            <Form.Control placeholder="Retype Password" type='password' name="retype" onChange={handleChange} />
                        </Form.Group>
                        {message && <Message variant="danger">{message}</Message>}
                        {error && <Message variant="danger">{error}</Message>}
                        <Button type="submit">Submit</Button>
                    </Form>
                </Container>
            </Col>
        </Row>
    );
};

export default PasswordChange;