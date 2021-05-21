const io = require('socket.io-client')

const socket = io('http://localhost:3973');

let room = null;

process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on("data", chunk => {

    if(chunk.startsWith("@join")){

        let commands = chunk.split(":");

        room = commands[1];

        socket.emit("call", "join", { room: room }, (err, res) => {
            if(err){
                console.error(err);
            } else {    
                console.log("join success")
            }
        });

    } else if(chunk.startsWith("@leave")){
        
        socket.emit("call", "leave", { room: room }, (err, res) => {
            if(err){
                console.error(err);
            } else {    
                console.log("leave success")
            }
            room = null;
        })

    } else {

        socket.emit("call", "chat", { text: chunk, room: room }, (err, res) => {
            if(err){
                console.error(err);
            } else {    
                //
            }
        })

    }
})

socket.on('connect', () => {
    console.log('socket connect');
});
socket.on('disconnect', () => {
    console.log('socket disconnect');
});
socket.on('error', arg => {
    console.log('socket error: ', arg);
});
socket.on('noti', (arg) => {
    console.log('noti: ', arg);
})
socket.on('chat', (arg) => {
    console.log(arg);
})