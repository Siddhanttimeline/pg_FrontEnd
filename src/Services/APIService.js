import axios from "axios";

// login API
const loginService = async (email, password) => {
  console.log("API");
  console.log(email, password);
  const body = {
    email: email,
    password: password,
  };
  try {
    const response = await axios.post("http://localhost:8080/auth/login", body);

    return response;
  } catch (error) {
    throw error;
  }
};

// register API
const signUpService = async (body) => {
  console.log("Inside signUpService");
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/register",
      body
    );
    console.log("response : ", response);
    return response;
  } catch (error) {
    throw error;
  }
};

// Github signin api
const loginInWithGitHubService = async () => {
  console.log("Inside signUpService");
  try {
    const response = await axios.get("http://localhost:8080/auth/github");
    const { redirectUrl } = response.data;
    console.log("redirectUrl : ", redirectUrl);
    return redirectUrl;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// get all the rooms
const getAllRooms = async () => {
  console.log("Inside getAllRooms");
  try {
    const response = await axios.get("http://localhost:8080/room/getAllRooms");
    console.log("response : ", response);
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Create Student (admin)
const createStudentAdmin = async (body) => {
  console.log("Inside createStudent");
  try {
    const response = await axios.post(
      "http://localhost:8080/api/student/admin/save",
      body
    );
    console.log("response : ", response);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Create Student (user)
const createStudentUser = async (formData) => {
  console.log("Inside createStudentUser");
  try {
    const response = await axios.post(
      "http://localhost:8080/api/student/user/save",
      formData
    );
    console.log("response : ", response);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Update Student (user)
const updateStudentUser = async (formData, studentId) => {
  console.log("Inside updateStudentUser");
  console.log("form data : ", formData);
  console.log("studentId : ", studentId);

  try {
    const response = await axios.post(
      `http://localhost:8080/api/student/update/${studentId}`,
      formData
    );
    console.log("response : ", response);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// fetch Student
const fetchAllStudentService = async (body) => {
  console.log("Inside fetchAllStudentService");
  try {
    const response = await axios.get("http://localhost:8080/api/students");
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Fetch Payment history by Student Aadhar Card
const fetchPaymentsByAadharCard = async () => {
  console.log("Inside fetchAllStudentService");
  try {
    const response = await axios.get(
      "http://localhost:8080/api/payments/667737581716"
    );
    console.log("response : ", response);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Fetch Payment history by Student Aadhar Card
const fetchStudentsByPaymentStatus = async () => {
  console.log("Inside fetchStudentsByPaymentStatus");
  try {
    const response = await axios.get(
      "http://localhost:8080/api/student/notPaidStudents"
    );
    console.log("response : ", response);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const createRazorPayOrder = async (amount) => {
  console.log("Inside createRazorPayOrder");
  try {
    const response = await axios.post(
      "http://localhost:8080/api/payment/createOrder",
      { amount: amount, info: 1 }
    );
    console.log("response : ", response);
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export {
  loginService,
  signUpService,
  loginInWithGitHubService,
  getAllRooms,
  createStudentUser,
  createStudentAdmin,
  fetchAllStudentService,
  fetchPaymentsByAadharCard,
  fetchStudentsByPaymentStatus,
  createRazorPayOrder,
  updateStudentUser,
};
