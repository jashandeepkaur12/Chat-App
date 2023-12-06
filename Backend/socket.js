const SendMessage = require("./controller/MessageController");

const handleSocket = (io) => {
  io.on("connect", (socket) => {
    console.log("User connected");

    // User sends a private message to the admin
    socket.on("user-message", (message) => {
      console.log(`User: ${JSON.stringify(message)}`);
      const body = JSON.parse(JSON.stringify(message));
      SendMessage(body);
      io.emit("private-message", {
        sender: "user",
        message: JSON.stringify(message),
      });
    });

    // Admin sends a private message to the user
    socket.on("admin-message", (message) => {
      console.log(`Admin: ${JSON.stringify(message)}`);
      const body = JSON.parse(JSON.stringify(message));
      SendMessage(body);

      // Emit the admin's message to the user only
      io.emit("private-message", {
        sender: "admin",
        message: JSON.stringify(message),
      });
    });

    // Assign the "admin" room to the admin's socket
    if (socket.handshake.query.role === "admin") {
      socket.join("admin");
    }

    // Disconnect event
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    // Handle errors
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  io.on("disconnect", (socket) => {
    console.log("Disconnect");
    socket.disconnect();
  });
};

exports = module.exports = handleSocket;
