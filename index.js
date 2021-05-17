const io = require('socket.io-client')

const socket = io('http://localhost:3000'
// , {
//     path: "/socket.io/ws/message", // https://socket.io/docs/v3/client-api/index.html
//     transports: [ /*'polling',*/ 'websocket'], // https://socket.io/docs/v3/server-api/#new-Server-httpServer-options (https://socket.io/docs/v3/client-initialization/#transports)
//     allowUpgrades: true,
//     autoConnect: false
// }
)

socket.connect();

socket.on('connect', () => {
    console.log('socket connect');

    console.log("emit!");
    socket.emit('call', 'math.add', {a:2, b: 3}, (err, res) => {
        if(err){
            console.error(err);
        } else {    
            console.log(res);
        }
    });
    socket.emit('call', 'greeter.hello', {}, (err, res) => {
        if(err){
            console.error(err);
        } else {    
            console.log(res);
        }
    });
});

socket.on('disconnect', () => {
    console.log('socket disconnect');
});
socket.on('error', () => {
    console.log('socket error');
});
socket.on('hello', (args) => {
    console.log("hello: ", args);
})

