import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";
import { socket } from "../socket";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const data = [];

const UserBubble = (props) => {
  return (
    <Grid item xs={12} onClick={props?.action}>
      <Paper
        elevation={1}
        sx={{
          background: props?.isSelected ? "#009688" : "#00796B",
          padding: 2,
          textAlign: "left",
          color: "white",
        }}
      >
        <Typography variant="body1">{props?.name}</Typography>
        {props?.hasNewMessage && (
          <Typography variant="caption">New message</Typography>
        )}
      </Paper>
    </Grid>
  );
};

const ChatUsers = (props) => {
  const [conversations, setConversations] = useState(data);
  const userDataLocal = localStorage.getItem("userData");
  const userData = JSON.parse(userDataLocal);
  const userId = userData?._id;

  const getConversations = async () => {
    await axios
      .get(`${baseURL}/conversations?userId=${userId}`)
      .then((data) => setConversations(data.data?.conversations))
      .catch((e) => alert(e));
  };

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    socket.on("private-message", (data) => {
      getConversations();
    });
  }, [socket]);

  const users = conversations.map((conversation) => {
    const validUser = conversation?.users?.filter((user) => !user.isAdmin);

    return (
      <UserBubble
        key={conversation._id}
        isSelected={conversation._id === props?.activeUserId}
        name={validUser && validUser[0]?.name}
        hasNewMessage={conversation?.unReadCount !== 0}
        action={() => {
          props.setActiveUser({
            userName: validUser[0]?.name,
            userId: validUser[0]?._id,
            conversationId: conversation?._id,
          });
        }}
      />
    );
  });

  return (
    <>
      <h3>Messages</h3>
      <Stack spacing={2}>{users}</Stack>
    </>
  );
};

export default ChatUsers;
