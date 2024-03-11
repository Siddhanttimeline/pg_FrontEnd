import React, { useEffect, useState } from "react";
import Table from "./Table";
import Navbar from "./Navbar";
import { fetchAllStudentService } from "../Services/APIService";

const Records = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const studentData = await fetchAllStudentService();
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }

    fetchStudents();
  }, []); // Empty dependency array ensures the effect runs only once

  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "roomNumber", label: "Room Number", minWidth: 100 },
    { id: "phoneNumber", label: "Phone Number", minWidth: 100 },
    {
      id: "currentMonthPayment",
      label: "Current Month Payment",
      minWidth: 100,
    },
    { id: "nextDueDate", label: "Next Due Date", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "address", label: "Address", minWidth: 100 },
    { id: "aadharCardNumber", label: "Aadhar Card Number", minWidth: 100 },
  ];

  const filteredRows = students
    ? students.filter((student) =>
        Object.values(student).some(
          (value) =>
            (value !== null &&
              typeof value === "object" &&
              "roomNumber" in value &&
              value.roomNumber
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (value !== null &&
              value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        )
      )
    : [];

  const rows = filteredRows.map((student) => {
    const { room, ...rest } = student;
    return {
      ...rest,
      roomNumber: room.roomNumber,
    };
  });

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>STUDENT RECORDS</h2>
      </div>
      <div
        style={{ marginLeft: "190px", marginBottom: "20px", marginTop: "70px" }}
      >
        <label style={{ marginRight: "10px", fontSize: "17px" }}>SEARCH</label>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1.8%",
        }}
      >
        {" "}
        <Table columns={columns} rows={rows} />
      </div>
    </>
  );
};

export default Records;
