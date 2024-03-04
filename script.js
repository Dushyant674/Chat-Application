const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling', 'flashsocket']
}),
form = document.querySelector('#send-container'),
messageInput = document.querySelector('#messageInp'),
messageContainer = document.querySelector('.msg-container'),
userName = prompt('enter your name to join');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
socket.emit('new-user-joined', userName);

socket.on('user-joined', data =>{
    append(`${userName} joined the chat`, 'right');
})