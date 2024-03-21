import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import StickyHeadTable from "./Table";
import OutlinedCard from "./Card";
import Navbar from "./Navbar";
import { fetchStudentsByPaymentStatus } from "../Services/APIService";
import { fetchAllStudentService } from "../Services/APIService";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "roomNumber", label: "Room Number", minWidth: 100 },
  { id: "floorNumber", label: "Floor", minWidth: 100 },
  { id: "roomPrice", label: "Room Rent", minWidth: 100 },
  { id: "phoneNumber", label: "Phone Number", minWidth: 100 },
  {
    id: "currentMonthPayment",
    label: "Current Month Payment",
    minWidth: 100,
  },
  { id: "nextDueDate", label: "Next Due Date", minWidth: 100 },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [notPaidStudents, setNotPaidStudents] = useState([]);
  const [totalCountByFloor, setTotalCountByFloor] = useState({});
  const [paidCountByFloor, setPaidCountByFloor] = useState({});
  const [unpaidCountByFloor, setUnpaidCountByFloor] = useState({});
  const [overallPaidCount, setOverallPaidCount] = useState(0);
  const [overallUnpaidCount, setOverallUnpaidCount] = useState(0);
  const jwtToken = sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }

    async function fetchData() {
      try {
        const studentData = await fetchAllStudentService(jwtToken);

        let overallPaid = 0;
        let overallUnpaid = 0;
        const totalCounts = {};
        const paidCounts = {};
        const unpaidCounts = {};

        if (studentData) {
          studentData.forEach((student) => {
            const floorNumber = student.room.floorNumber;

            // Update total count by floor
            totalCounts[floorNumber] = (totalCounts[floorNumber] || 0) + 1;

            // Update overall count
            if (student.currentMonthPayment === "Paid") {
              overallPaid++;
              paidCounts[floorNumber] = (paidCounts[floorNumber] || 0) + 1;
            } else {
              overallUnpaid++;
              unpaidCounts[floorNumber] = (unpaidCounts[floorNumber] || 0) + 1;
            }
          });
        }

        setTotalCountByFloor(totalCounts);
        setPaidCountByFloor(paidCounts);
        setUnpaidCountByFloor(unpaidCounts);
        setOverallPaidCount(overallPaid);
        setOverallUnpaidCount(overallUnpaid);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }

    async function fetchStudentsByPayment() {
      try {
        const studentData = await fetchStudentsByPaymentStatus(jwtToken);
        const filteredRows = studentData.data.filter((student) =>
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
                typeof value === "object" &&
                "price" in value &&
                value.price
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())) ||
              (value !== null &&
                value
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()))
          )
        );
        const rows = filteredRows.map((student) => {
          const { room, ...rest } = student;
          return {
            ...rest,
            roomNumber: room.roomNumber,
            floorNumber: room.floorNumber,
            roomPrice: room.price,
          };
        });
        setNotPaidStudents(rows);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }

    fetchData();
    fetchStudentsByPayment();
  }, [searchTerm, jwtToken]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "5%",
          marginTop: "3%",
        }}
      >
        <OutlinedCard
          mainHead={"Total Student"}
          mainHeadvalue={overallPaidCount + overallUnpaidCount}
          totalPaidValue={overallPaidCount}
          totalUnPaidValue={overallUnpaidCount}
        />
        <OutlinedCard
          mainHead={"1st floor"}
          mainHeadvalue={totalCountByFloor[1] ? totalCountByFloor[1] : 0}
          totalPaidValue={paidCountByFloor[1] ? paidCountByFloor[1] : 0}
          totalUnPaidValue={unpaidCountByFloor[1] ? unpaidCountByFloor[1] : 0}
        />
        <OutlinedCard
          mainHead={"2nd floor"}
          mainHeadvalue={totalCountByFloor[2] ? totalCountByFloor[2] : 0}
          totalPaidValue={paidCountByFloor[2] ? paidCountByFloor[2] : 0}
          totalUnPaidValue={unpaidCountByFloor[2] ? unpaidCountByFloor[2] : 0}
        />
        <OutlinedCard
          mainHead={"3rd floor"}
          mainHeadvalue={totalCountByFloor[3] ? totalCountByFloor[3] : 0}
          totalPaidValue={paidCountByFloor[3] ? paidCountByFloor[3] : 0}
          totalUnPaidValue={unpaidCountByFloor[3] ? unpaidCountByFloor[3] : 0}
        />
      </Box>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h3>List of Students Whose Payments Are Due</h3>
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
          marginTop: "2%",
        }}
      >
        <StickyHeadTable columns={columns} rows={notPaidStudents} />
      </div>
    </>
  );
}

export default App;
