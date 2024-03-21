import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signUpService } from "../Services/APIService"; // Import your login function from the API service file
import { useNavigate } from "react-router-dom";
import TaskAltIcon from "@mui/icons-material/TaskAlt"; // Import TaskAltIcon

function SignUp() {
  const navigate = useNavigate();
  const [registered, setRegistered] = React.useState(false);

  const [formValues, setFormValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    aadhar: "",
    password: "",
    termsAccepted: false,
  });
  const [formErrors, setFormErrors] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    aadhar: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (formValues.firstName.trim() === "") {
      newErrors.firstName = "First Name is required";
      valid = false;
    } else {
      newErrors.firstName = "";
    }

    if (formValues.lastName.trim() === "") {
      newErrors.lastName = "Last Name is required";
      valid = false;
    } else {
      newErrors.lastName = "";
    }

    if (formValues.email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (formValues.aadhar.trim() === "") {
      newErrors.aadhar = "Aadhar Card Number is required";
      valid = false;
    } else {
      newErrors.aadhar = "";
    }

    if (formValues.password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const body = {
      name: formValues.firstName + " " + formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      aadharCardNumber: formValues.aadhar,
    };

    try {
      const response = await signUpService(body);
      if (response.status === 201) {
        setRegistered(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        console.log("SignUP failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: val,
    }));
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {!registered ? (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="aadhar"
                    label="Aadhar Card Number"
                    name="aadhar"
                    autoComplete="aadhar"
                    value={formValues.aadhar}
                    onChange={handleInputChange}
                    error={!!formErrors.aadhar}
                    helperText={formErrors.aadhar}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formValues.password}
                    onChange={handleInputChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="termsAccepted"
                        color="primary"
                        checked={formValues.termsAccepted}
                        onChange={handleInputChange}
                      />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box
              sx={{
                mt: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <TaskAltIcon
                sx={{ fontSize: "2.5rem", marginRight: "10px" }}
              />{" "}
              {/* Remove textAlign */}
              <Typography
                component="div"
                variant="body1"
                align="center"
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "1.4rem", // Adjust the font size as needed
                  marginRight: "8px", // Add margin to the right of the text
                }}
              >
                USER REGISTERED
              </Typography>
            </Box>
          )}
        </Box>
        {!registered && <Copyright sx={{ mt: 5 }} />}
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
