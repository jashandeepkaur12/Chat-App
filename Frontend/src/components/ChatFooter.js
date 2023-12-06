import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { socket } from "../socket";

const baseURL = process.env.REACT_APP_API_URL;

const ChatFooter = (props) => {
  const [message, setMessage] = useState("");

  const localData = localStorage.getItem("userData");
  const userData = JSON.parse(localData);
  const role = window.location.pathname.includes("/admin")
    ? "admin-message"
    : "user-message";

  const sendMessageSocket = (body) => {
    console.log("socket calledf", body, role);
    socket.emit(role, body);
  };

  const sendMessage = async () => {
    const userDataLocal = localStorage.getItem("userData");
    const userData = JSON.parse(userDataLocal);
    const userId = userData?._id;
    const body = {
      conversationId: props?.conversationId,
      body: message,
      senderId: userId,
      recieverId: props?.activeUser,
    };
    await sendMessageSocket(body);
    setMessage("");
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={2}
      sx={{ maxHeight: "8vh", width: "100%" }}
    >
      <TextField
        id="utlined-basic"
        label="Type here.."
        variant="outlined"
        sx={{ width: "70%" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button
        variant="contained"
        endIcon={<SendIcon />}
        disabled={!message}
        onClick={sendMessage}
      >
        Send
      </Button>
    </Stack>
  );
};

export default ChatFooter;
