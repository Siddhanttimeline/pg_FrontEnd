import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getAllRooms,
  createStudentUser,
  updateStudentUser,
} from "../Services/APIService";
import Navbar from "./Navbar";
import DateP from "./DatePicker";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/studentDataSlice";
import { useNavigate } from "react-router-dom";

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
  const [editMode, setEditMode] = useState(false); // Initially set to true to show the form
  const [dateOfJoining, setDateOfJoining] = useState(""); // State to hold the selected rent date
  const [studentId, setStudentId] = useState("");
  const studentProfileData = useSelector((state) => state.profileData);
  const jwtToken = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("studentProfileData : ", studentProfileData);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }

    async function fetchRoomNumbers() {
      try {
        const rooms = await getAllRooms(jwtToken);
        setRoomNumbers(rooms);
      } catch (error) {
        console.error("Error fetching room numbers:", error);
      }
    }

    fetchRoomNumbers();
  }, [jwtToken]);

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
    console.log("Handle Submit btn called");
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

    const formattedDateOfJoining = dateOfJoining
      ? new Date(dateOfJoining).toISOString().slice(0, 10)
      : "";

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
        dateOfJoining: formattedDateOfJoining,
      })
    );

    console.log("FORM DATA CHECK:", formData);

    try {
      let response;
      if (!editMode) {
        console.log("Calling create ");
        console.log("printing formData");
        formData.forEach((value, key) => {
          console.log(key, value);
        });

        response = await createStudentUser(formData, jwtToken);
      } else {
        console.log("Calling update ");
        console.log("printing formData");
        formData.forEach((value, key) => {
          console.log(key, value);
        });
        console.log("formData : ", formData);
        response = await updateStudentUser(formData, studentId, jwtToken);
      }
      if (response.status === 201) {
        setSubmitted(true);
        setEditMode(false); // After submission or update, switch to display mode
        setStudentId(response.data.id);
        handleSaveData(response.data);
      }
      console.log("Student created/updated successfully:", response);
    } catch (error) {
      console.error("Error creating/updating student:", error);
    }
  };

  const handleSaveData = (response) => {
    dispatch(
      dataActions.saveData({
        id: response.id,
        name: response.name,
        email: response.email,
        address: response.address,
        phoneNumber: response.phoneNumber,
        aadharCardNumber: response.aadharCardNumber,
        profileImagePath: response.profileImage,
        aadharCardImagePath: response.aadharCardImage,
        room: response.data.room,
        payments: response.data.payments,
        dateOfJoining: response.dateOfJoining,
        currentMonthPayment: response.data.currentMonthPayment,
      })
    );
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
          {!submitted && (
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
                      {roomNumbers &&
                        roomNumbers.map((room, index) => (
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
          )}
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
