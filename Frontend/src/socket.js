import { io } from "socket.io-client";

const URL = process.env.REACT_APP_API_URL;

const sessionData = localStorage.getItem("userData");
const userData = JSON.parse(sessionData);
const role = userData?.isAdmin ? "admin" : "user";

export const socket = io.connect(URL, { query: { role } });

socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from Socket.IO server");
});
