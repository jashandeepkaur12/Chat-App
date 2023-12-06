import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ChatWindow from "../components/ChatWindow";
import ChatUsers from "../components/ChatUsers";
import ButtonAppBar from "../components/AppBar";
import Login from "../components/Login";

const Admin = () => {
  const [activeUser, setActiveUser] = useState({
    userName: "",
    userId: "",
    conversationId: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userDataLocal = localStorage.getItem("userData");
    const userData = JSON.parse(userDataLocal);
    if (userData?._id && userData?.isAdmin) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return !isLoggedIn ? (
    <Login setIsLoggedIn={setIsLoggedIn} role="admin" />
  ) : (
    <div>
      <Grid container sx={{ height: "10vh" }}>
        <ButtonAppBar profile="admin" />
      </Grid>
      <Grid container sx={{ height: "90vh" }}>
        <Grid xs={4} sx={{ padding: 4 }}>
          <ChatUsers
            setActiveUser={setActiveUser}
            activeUserId={activeUser?.conversationId}
          />
        </Grid>
        <Grid xs={8}>
          <ChatWindow activeUser={activeUser} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
