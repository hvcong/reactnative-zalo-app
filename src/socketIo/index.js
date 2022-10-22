import socketIO from "socket.io-client";
import store from "../store";
const host = "https://zalo-chat.herokuapp.com/";

const startSocketIO = async () => {
  let token = await store.getToken();
  const socket = socketIO(host, {
    transports: ["websocket"],
    jsonp: false,
    query: `access=${token}`,
  });

  return socket;
};

export default startSocketIO;
