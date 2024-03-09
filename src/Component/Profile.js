import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getAllRooms, createStudentUser } from "../Services/APIService";
import Navbar from "./Navbar";
import DateP from "./DatePicker";

function BasicExample() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [address, setAddress] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [aadharCardImage, setAadharCardNumberImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(true); // Initially set to true to show the form
  const [dateOfJoining, setDateOfJoining] = useState(""); // State to hold the selected rent date

  useEffect(() => {
    async function fetchRoomNumbers() {
      try {
        const rooms = await getAllRooms();
        setRoomNumbers(rooms);
      } catch (error) {
        console.error("Error fetching room numbers:", error);
      }
    }

    fetchRoomNumbers();
  }, []);

  const blobToFile = (formData, blobUrl, filename) => {
    return fetch(blobUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], filename);
        formData.append("file", file);
        return formData;
      })
      .catch((error) => {
        console.error("Error converting blob URL to File object:", error);
        return null;
      });
  };

  const fetchBlob = async (blobUrl) => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error fetching blob:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append profile image
    if (profileImage) {
      const profileBlob = await fetchBlob(profileImage);
      formData.append("profileImage", profileBlob, "profile_image.jpg");
    }

    // Append Aadhar card image
    if (aadharCardImage) {
      const aadharCardBlob = await fetchBlob(aadharCardImage);
      formData.append(
        "aadharCardImage",
        aadharCardBlob,
        "aadharCard_image.jpg"
      );
    }

    // Append student DTO data
    formData.append(
      "studentDTO",
      JSON.stringify({
        name: name,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        aadharCardNumber: aadharCardNumber,
        room: {
          roomNumber: parseInt(roomNumber),
        },
      })
    );

    console.log("FORM DATA CHECK:", formData);

    try {
      const response = await createStudentUser(formData);
      if (response.status === 201) {
        setSubmitted(true);
        setEditMode(false); // After submission, switch to display mode
      }
      console.log("Student created successfully:", response);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProfileImage(URL.createObjectURL(imageFile));
  };

  const handleAadharImageChange = (e) => {
    const imageFile = e.target.files[0];
    setAadharCardNumberImage(URL.createObjectURL(imageFile));
  };

  const handleEdit = () => {
    setEditMode(true); // Set edit mode to true to show the form
    setSubmitted(false); // Reset submitted state
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "800px", marginTop: "50px", marginLeft: "7%" }}>
        <Container style={{ maxWidth: "800px", marginTop: "50px" }}>
          <Form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicAadharCardNumber"
                >
                  <Form.Label>Aadhar Card Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter aadhar card number"
                    value={aadharCardNumber}
                    onChange={(e) => setAadharCardNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5.9}
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicRoomNumber">
                  <Form.Label>Room Number</Form.Label>
                  <Form.Control
                    as="select"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  >
                    <option>Select Room Number</option>
                    {roomNumbers.map((room, index) => (
                      <option key={index} value={room}>
                        {room}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>Date Of Joining</Form.Label>
                  <br />
                  {/* Pass setRentDate as a prop to DateP to update rentDate state */}
                  <DateP
                    selectedDate={dateOfJoining}
                    onChange={(newValue) => setDateOfJoining(newValue)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicProfileImage">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formBasicAadharCardImage">
                  <Form.Label>Aadhar Card Photo</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleAadharImageChange}
                  />
                </Form.Group>
                <br />
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginTop: "10px" }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
          {submitted && (
            <div>
              <h5>Details</h5>
              <br />
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              <p>Phone Number: {phoneNumber}</p>
              <p>Aadhar Card Number: {aadharCardNumber}</p>
              <p>Address: {address}</p>
              <p>Room Number: {roomNumber}</p>
            </div>
          )}
          {submitted && (
            <Button
              variant="primary"
              onClick={handleEdit}
              style={{ marginTop: "10px" }}
            >
              Edit
            </Button>
          )}
        </Container>
      </div>
      <div
        style={{
          position: "absolute",
          marginTop: "50px",
          marginRight: "20%",
          top: "50px",
          right: "50px",
          maxWidth: "400px",
        }}
      >
        {profileImage && (
          <div className="text-center">
            <h4>Profile Picture Preview</h4>
            <img
              src={profileImage}
              alt="Profile"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default BasicExample;
