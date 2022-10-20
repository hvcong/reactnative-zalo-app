import socketIO from "socket.io-client";
const host = "https://zalo-chat.herokuapp.com/";
// Initialize Socket IO:
const socket = socketIO(host, {
  transports: ["websocket"],
  jsonp: false,
});

// const startSocketIO = (store) => {
//   socket.connect();

//   socket.on("connect", () => {
//     console.log("connect ok");
//     socket.on("disconnect", () => {
//       console.log("connection to server lost.");
//     });
//     // socket.on("newMessage", (message) => {});
//   });
// };

// export the function to connect and use socket IO:
export default startSocketIO;
