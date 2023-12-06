import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h4">Welcome to Our Platform</Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        Start your journey with us and explore the amazing features we offer.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/admin"
        >
          Login as Admin
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/user">
          Login as User
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
