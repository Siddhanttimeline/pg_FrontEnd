import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import backgroundImg from "../background.jpg";
import { loginService, loginInWithGitHubService } from "../Services/APIService";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/index";

function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Siddhant");
      const response = await loginService(email, password);
      console.log("RESPONSE IN LOGIN : ", response.status);
      if (response.status === 200) {
        const jwtToken = response.data.jwtToken;
        sessionStorage.setItem("token", jwtToken);
        navigate("/dashboard"); // Use navigate to redirect to "/home"
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      setError("Email/Password is incorrect");
      console.error("Error:", error);
    }
  };

  const handleGitHubSignIn = async () => {
    console.log("Inside handleGitHubSignIn");
    try {
      const redirectUrl = await loginInWithGitHubService();
      console.log("CHECK HERE : ", redirectUrl);
      debugger;
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = () => {
    // You can implement GitHub sign-in logic here
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the sign-up page
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

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="contained"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                sx={{
                  mt: 1,
                  mb: 2,
                  bgcolor: "#DB4437", // Google's brand color
                  color: "#fff", // Text color
                  "&:hover": {
                    bgcolor: "#C33326", // Darker shade of Google's brand color on hover
                  },
                }}
              >
                Sign in with Google
              </Button>
              <Button
                fullWidth
                variant="contained"
                startIcon={<GitHubIcon />}
                onClick={handleGitHubSignIn}
                sx={{
                  mt: 1,
                  mb: 2,
                  bgcolor: "#333",
                  "&:hover": {
                    bgcolor: "#333", // Change the color when hovered
                  },
                }}
              >
                Sign in with GitHub
              </Button>

              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" onClick={handleSignUpClick} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
