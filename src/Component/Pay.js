import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createRazorPayOrder } from "../Services/APIService";
import picture from "../IMG_3462.jpeg";
import Navbar from "./Navbar";

function BasicExample() {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    console.log("Amount:", amount);

    const amountInPaise = amount * 100;
    console.log("amountInPaise", amountInPaise);

    const response = createRazorPayOrder(amount);
    console.log("response handle submit :", response);

    var options = {
      key: "rzp_test_8iykJJkJd1aM5y", // Enter the Key ID generated from the Dashboard
      amount: amountInPaise, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "The PG App",
      description: "Test Transaction",
      image: picture,
      order_id: response.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "H 14/5/4 Govindpur Prayagraj 211004",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <Container className="d-flex justify-content-center">
      <Row>
        <Col md={10}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number" // Changed type to "number" for better input validation
                placeholder="Amount"
                value={amount} // Bind value to the state
                onChange={(e) => setAmount(e.target.value)} // Update state on change
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

const Pay = () => {
  return (
    <>
      <Navbar />
      <Container fluid className="mt-5">
        <Row className="justify-content-center mt-10">
          <Col md={6}>
            <h3 className="text-center">Pay</h3>
            <BasicExample />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Pay;
