const io = require('socket.io')(3000)

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', userName =>{
        console.log("new user", userName)
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined')
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, userName: users[socket.id]
        });
    })
})