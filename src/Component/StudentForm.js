import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Navbar from "./Navbar";
import { getAllRooms, createStudentAdmin } from "../Services/APIService";
import DateP from "./DatePicker";
import { useSelector } from "react-redux";

function BasicExample() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  // const jwtToken = useSelector((state) => state.auth.jwtToken);
  const jwtToken = sessionStorage.getItem("token");

  useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("dateOfJoining :", dateOfJoining);

    const formattedRentDate = dateOfJoining
      ? new Date(dateOfJoining).toISOString().slice(0, 10)
      : "";

    const formData = {
      name: name,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      aadharCardNumber: aadharCardNumber,
      room: {
        roomNumber: parseInt(roomNumber),
      },
      dateOfJoining: formattedRentDate,
    };

    console.log("formData : ", formData);

    try {
      const response = await createStudentAdmin(formData, jwtToken);
      console.log("Student created successfully:", response);
      setName("");
      setEmail("");
      setPhoneNumber("");
      setAadharCardNumber("");
      setAddress("");
      setRoomNumber("");
      setDateOfJoining("");
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container style={{ maxWidth: "400px", marginTop: "50px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => {
                const input = e.target.value;
                const regex = /^[0-9]*$/; // Regular expression to allow only numeric values
                if (regex.test(input) || input === "") {
                  setPhoneNumber(input);
                }
              }}
              pattern="[0-9]*"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAadharCardNumber">
            <Form.Label>Aadhar Card Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter aadhar card number"
              value={aadharCardNumber}
              onChange={(e) => {
                const input = e.target.value;
                const regex = /^[0-9]*$/; // Regular expression to allow only numeric values
                if (regex.test(input) || input === "") {
                  setAadharCardNumber(input);
                }
              }}
              pattern="[0-9]*"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRoomNumber">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              as="select"
              required
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            >
              <option value="">Select Room Number</option>
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
            <DateP
              selectedDate={dateOfJoining}
              onChange={(newValue) => setDateOfJoining(newValue)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default BasicExample;
