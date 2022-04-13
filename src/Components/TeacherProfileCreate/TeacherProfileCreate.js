import React, { useState } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";
import "./TeacherProfileCreate.css";

const TeacherProfileCreate = () => {
  const [info, setInfo] = useState({
    name: "",
    gender: "",
    phone: "",
    birthDate: "",
    address: "",
    nationality: "",
    degree: "",
    result: "",
    institute: "",
    photo: [],
  });

  //set image information
  const handleChange = (e) => {
    const newInfo = { ...info };
    if (e.target.name === "photo") {
      newInfo[e.target.name] = e.target.files[0];
    } else {
      newInfo[e.target.name] = e.target.value;
    }
    setInfo(newInfo);
  };

  console.log(info);

  //delete firestore image
  const deleteImage = (name) => {
    const removeImage = { ...info };
    removeImage[name] = [];
    setInfo(removeImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Enter Name"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Gender</Form.Label>
              <select
                className="form-select"
                name="gender"
                onChange={handleChange}
              >
                <option value="" hidden>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                onChange={handleChange}
                placeholder="Current Address"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                onChange={handleChange}
                placeholder="Your Nationality"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Highest Degree</Form.Label>
              <Form.Control
                type="test"
                name="degree"
                onChange={handleChange}
                placeholder="Example: Bechelor"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Result</Form.Label>
              <Form.Control
                type="text"
                name="result"
                onChange={handleChange}
                placeholder="Highest Academic Result"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Institute Name</Form.Label>
              <Form.Control
                type="text"
                name="institute"
                onChange={handleChange}
                placeholder="Highest Academic Institute"
              />
            </Form.Group>
          </Col>
          <Col md={4} className="mx-auto">
            <Card className="profile_image mt-2">
              <Card.Header className="card-header">
                Upload Photo from computer:
              </Card.Header>
              {info.photo.length !== 0 ? (
                <div className="show_image">
                  <img src={URL.createObjectURL(info.photo)} alt="tutor" />
                  <TiDelete
                    onClick={() => deleteImage("photo")}
                    className="image_delete"
                  />
                </div>
              ) : (
                <Card.Body className="card_width">
                  <Card.Text className="instruction-text">
                    Upload your photo <br />
                    <br />
                  </Card.Text>
                  <br />
                  <Row style={{ textAlign: "center" }}>
                    <Card.Title className="click-for-upload">
                      <input
                        name="photo"
                        type="file"
                        required
                        style={{ width: "115px" }}
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleChange}
                      />
                    </Card.Title>
                  </Row>
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
        <Button
          variant="outline-primary d-flex justify-content-center mx-auto mt-3 mb-3"
          type="submit"
        >
          Save
        </Button>{" "}
      </Form>
    </div>
  );
};

export default TeacherProfileCreate;
