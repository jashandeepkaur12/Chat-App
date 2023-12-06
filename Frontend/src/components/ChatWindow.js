import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import ChatFooter from "./ChatFooter";
import { socket } from "../socket";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const data = [];

const ChatBubble = (props) => {
  return (
    <Grid item xs={12}>
      <Paper
        elevation={1}
        sx={{
          background: props?.isSender ? "#00796B" : "#1565C0",
          paddingLeft: 1,
          paddingRight: 1,
          textAlign: props?.isSender ? "right" : "left",
          color: "white",
          float: props?.isSender ? "right" : "left",
        }}
      >
        <Typography variant="body1">{props?.content}</Typography>
        <Typography variant="caption">{props?.ts}</Typography>
      </Paper>
    </Grid>
  );
};

const ChatWindow = (props) => {
  const [userChats, setUserChats] = useState(data);
  const bottomEl = useRef(null);
  const userDataLocal = localStorage.getItem("userData");
  const userData = JSON.parse(userDataLocal);
  const userId = userData?._id;
  const isAdmin = userData?.isAdmin;

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const conversationId = props?.activeUser?.conversationId
    ? props?.activeUser?.conversationId
    : props?.conversationId;

  const getChats = async (conversationId = "") => {
    console.log(conversationId, "masher");
    await axios
      .get(`${baseURL}/messages?conversationId=${conversationId}`)
      .then((data) => setUserChats(data?.data?.messages))
      .catch((e) => alert(e));
  };

  useEffect(() => {
    conversationId && getChats(conversationId);
  }, [conversationId]);

  useEffect(() => {
    if (conversationId) {
      socket.on("private-message", (data) => {
        getChats(conversationId);
      });
    }
  }, [socket, conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [userChats]);

  const chats = userChats.map((chat) => {
    const ts = new Date(chat?.createdOn * 1000).toLocaleDateString("en-US");

    return (
      <ChatBubble
        isSender={chat?.senderId === userId}
        content={chat?.body}
        ts={ts}
      />
    );
  });

  return (
    <>
      <Grid container sx={{ height: "80vh" }}>
        <Grid container sx={{ height: "5vh" }}>
          {conversationId ? (
            <h4>Chat with {isAdmin ? props?.activeUser?.userName : "Admin"}</h4>
          ) : (
            <h4>Click on chat to get started</h4>
          )}
        </Grid>
        <div
          style={{
            width: "100%",
            paddingLeft: 6,
            paddingRight: 6,
            overflowY: "scroll",
            maxHeight: "65vh",
          }}
        >
          <Grid container spacing={2} ref={bottomEl}>
            {chats}
          </Grid>
        </div>
      </Grid>
      <Grid container sx={{ height: "10vh" }}>
        {conversationId && (
          <ChatFooter
            getChats={getChats}
            conversationId={conversationId}
            activeUser={props?.activeUser?.userId}
          />
        )}
      </Grid>
    </>
  );
};

export default ChatWindow;
