import axios from "axios";

const APIServiceComponent = () => {
  // login API
  const loginService = async (email, password) => {
    const body = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        body
      );
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
  const loginInWithGitHubService = async (jwtToken) => {
    console.log("Inside signUpService");
    try {
      const response = await axios.get("http://localhost:8080/auth/github", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      const { redirectUrl } = response.data;
      console.log("redirectUrl : ", redirectUrl);
      return redirectUrl;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // get all the rooms
  const getAllRooms = async (jwtToken) => {
    console.log("Inside getAllRooms");
    try {
      const response = await axios.get(
        "http://localhost:8080/room/getAllRooms",
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      console.log("response : ", response);
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Create Student (admin)
  const createStudentAdmin = async (body, jwtToken) => {
    console.log("Inside createStudent");
    console.log("body : ", body);
    console.log("jwtToken : ", jwtToken);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/student/admin/save",
        body,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("response : ", response);
      return response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Create Student (user)
  const createStudentUser = async (formData, jwtToken) => {
    console.log("Inside createStudentUser");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/student/user/save",
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("response : ", response);
      return response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Update Student (user)
  const updateStudentUser = async (formData, studentId, jwtToken) => {
    console.log("Inside updateStudentUser");
    console.log("form data : ", formData);
    console.log("studentId : ", studentId);
    console.log("jwtToken : ", jwtToken);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/student/update/${studentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("response : ", response);
      return response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // fetch Student
  const fetchAllStudentService = async (jwtToken) => {
    console.log("Inside fetchAllStudentService");
    try {
      const response = await axios.get("http://localhost:8080/api/students", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Fetch Payment history by Student Aadhar Card
  const fetchPaymentsByAadharCard = async (jwtToken) => {
    console.log("Inside fetchAllStudentService");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/payments/667737581716",
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      console.log("response : ", response);
      return response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Fetch Payment history by Student Aadhar Card
  const fetchStudentsByPaymentStatus = async (jwtToken) => {
    console.log("Inside fetchStudentsByPaymentStatus");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/student/notPaidStudents",
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
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

  return {
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
};

const apiService = APIServiceComponent();

export const {
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
} = apiService;

// export default APIServiceComponent;
