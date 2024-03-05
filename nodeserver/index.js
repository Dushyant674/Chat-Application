const io = require('socket.io')(3000)

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', userName => {
        // console.log("new user", userName)
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
        socket.broadcast.emit('connected-users', users);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message, userName: users[socket.id]
        });
    });

    socket.on('disconnect', reason =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })

});