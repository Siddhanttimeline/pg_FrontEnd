import React, { useState, useEffect } from "react";
import { fetchPaymentsByAadharCard } from "../Services/APIService";
import Table from "./Table";

import Navbar from "./Navbar";

const Payment = () => {
  const [payments, setPayments] = useState([]);

  const columns = [
    { id: "paymentDate", label: "Payment Date", minWidth: 100 },
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "month", label: "Month", minWidth: 100 },
    { id: "year", label: "Year", minWidth: 100 },
    { id: "paymentStatus", label: "Payment Status", minWidth: 100 },
  ];

  const rows = payments;

  useEffect(() => {
    const fetchData = async () => {
      console.log("Inside fetchData");

      try {
        const response = await fetchPaymentsByAadharCard(); // Fetch payment data for the logged-in student
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Failed to fetch payment data");
        }
        console.log("response:", response);
        setPayments(response.data); // Update state with fetched payment data
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchData();
  }, []); // This effect runs only once after the component mounts

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>PAYMENT HISTORY</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        {" "}
        <Table columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default Payment;
