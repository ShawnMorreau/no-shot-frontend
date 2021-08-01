// var socket = new WebSocket("ws://localhost:5000/ws")
// var socket = new WebSocket("wss://murmuring-temple-10804.herokuapp.com/ws")
var socket = new WebSocket("wss://morning-refuge-68385.herokuapp.com/ws");
let connect = (cb) => {
  socket.onopen = () => {
    console.log("Connected to server");
  };

  socket.onmessage = (msg) => {
    cb(msg.data);
  };

  socket.onclose = (event) => {
    console.log("Socket Connection Closed", event);
  };

  socket.onerror = (error) => {
    console.log("Socket Error: ", error);
  };
};

let sendMsg = (msg) => {
  socket.send(msg);
};

export { connect, sendMsg };
