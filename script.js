const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling', 'flashsocket']
}),
    form = document.querySelector('#send-container'),
    messageInput = document.querySelector('#messageInp'),
    messageContainer = document.querySelector('.msg-container'),
    audio = new Audio('/assets/audio/ting.mp3');

function givename() {
    let splitUrl = window.location.href.split("?")[1];
    return splitUrl;
}

let userId = givename();

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    messageInput.value = '';
    socket.emit('send', message)
})

socket.on('connected-users', onlineUsers =>{
    for(let i in onlineUsers)
    console.log(onlineUsers[i]);
})

socket.emit('new-user-joined', userId);

socket.on('user-joined', userName => {
    append(`${userName} joined the chat`, 'right');
})

socket.on('receive', data => {
    append(`${data.userName}: ${data.message}`, 'left');
})


socket.on('left', userName => {
    append(`${userName} left the chat`, 'right');
})