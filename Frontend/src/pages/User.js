import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ChatWindow from "../components/ChatWindow";
import ButtonAppBar from "../components/AppBar";
import Login from "../components/Login";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const User = () => {
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [conversationId, setConversationId] = useState("");

  const getConversations = async () => {
    if (userId) {
      await axios
        .get(`${baseURL}/conversations?userId=${userId}`)
        .then((data) => setConversationId(data.data?.conversations[0]?._id))
        .catch((e) => alert(e));
    }
  };

  useEffect(() => {
    getConversations();
  }, [userId]);

  useEffect(() => {
    const userDataLocal = localStorage.getItem("userData");
    const userData = JSON.parse(userDataLocal);
    if (userData?._id && !userData?.isAdmin) {
      setUserId(userData._id);
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return !isLoggedIn ? (
    <Login setIsLoggedIn={setIsLoggedIn} role="user" />
  ) : (
    <div>
      <Grid container sx={{ height: "10vh" }}>
        <ButtonAppBar />
      </Grid>
      <Grid container sx={{ height: "90vh" }}>
        <ChatWindow userId={userId} conversationId={conversationId} />
      </Grid>
    </div>
  );
};

export default User;
