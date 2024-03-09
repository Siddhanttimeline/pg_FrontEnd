import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "./Navbar";
import { getAllRooms, createStudentAdmin } from "../Services/APIService";

import DateP from "./DatePicker";

function BasicExample() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState(""); // State to hold the selected rent date
  const [roomNumbers, setRoomNumbers] = useState([]);

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
      room: {
        roomNumber: parseInt(roomNumber), // Ensure roomNumber is converted to an integer
      },
      dateOfJoining: formattedRentDate, // Include the selected rent date in the form data
    };

    console.log("formData : ", formData);
    debugger;
    try {
      // Call createStudent function and await its execution
      const response = await createStudentAdmin(formData);
      console.log("Student created successfully:", response);
      // Optionally, you can reset the form fields after successful submission
      setName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setRoomNumber("");
      setDateOfJoining(""); // Reset the rent date after submission
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
              onChange={(e) => setPhoneNumber(e.target.value)}
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
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {roomNumber || "Select Room Number"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {roomNumbers.map((room, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setRoomNumber(room)}
                  >
                    {room}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default BasicExample;
