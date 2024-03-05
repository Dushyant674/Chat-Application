const io = require('socket.io')(3000)

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', userName => {
        users[socket.id] = userName;
        io.emit('connected-users', users);
    });
    
    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message, userName: users[socket.id]
        });
    });

    socket.on('typing', userName =>{
        socket.broadcast.emit('typing', userName);
    })
    
    socket.on('disconnect', reason =>{
        delete users[socket.id];
        io.emit('connected-users', users);
    })
});