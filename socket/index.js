import { Server } from "socket.io";

const io = new Server({ 
  cors: {
    origin: "http://localhost:3000"
  }
 });

let onlineUsers = [];

const addUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({username, socketId});
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find(user => user.username === username);
};

io.on("connection", (socket) => {

  socket.on("newUser", (username) => {
    addUser(username, socket.id);
  });
  console.log("A user has connected to socket");

  socket.on("sendNotification", ({senderName, recieverName, type, liked}) => {
    const reciever = getUser(recieverName);
    if (!(type === 1 && liked)) {
      io.to(reciever?.socketId).emit("getNotification", {
        senderName,
        type,
        liked
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("A user has disconnected");
  });
});

io.listen(5000);
