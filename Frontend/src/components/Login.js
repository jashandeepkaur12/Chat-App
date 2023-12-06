import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const baseURL = process.env.REACT_APP_API_URL;

const Login = (props) => {
  const [userName, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const body = {
        name: userName,
        email: userEmail,
        isAdmin: false,
      };
      const response = await axios.post(`${baseURL}/user/register`, body);
      localStorage.setItem("userData", JSON.stringify(response.data?.user));
      props.setIsLoggedIn(true);
    } catch (e) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Stack
        direction="column"
        spacing={4}
        sx={{ width: "300px", textAlign: "center" }}
      >
        <Typography variant="h4">{props?.role?.toUpperCase()} Login</Typography>
        <TextField
          required
          label="Enter your name"
          variant="outlined"
          sx={{ width: "100%" }}
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          type="email"
          label="Enter your email"
          variant="outlined"
          sx={{ width: "100%" }}
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{ width: "100%", marginTop: "16px" }}
        >
          Start
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
