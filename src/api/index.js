var socket = new WebSocket("ws://localhost:8080/ws")

let connect = cb => {
    socket.onopen = () => {
        console.log("Connected to server")
    }

    socket.onmessage = msg => {
        cb(msg.data);
    }

    socket.onclose = event => {
        console.log("Socket Connection Closed", event);
    }

    socket.onerror = error => {
        console.log("Socket Error: ", error)
    }
};

let sendMsg = msg => {
    socket.send(msg)
}

export {connect, sendMsg}
