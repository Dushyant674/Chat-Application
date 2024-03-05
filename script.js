const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling', 'flashsocket']
}),
form = document.querySelector('#send-container'),
messageInput = document.querySelector('#messageInp'),
messageContainer = document.querySelector('.msg-container'),
uName = document.querySelector('#yourName'),
userlist = document.querySelector('.user-container'),
submitBtn = document.querySelector('#submitbtn'),
audio = new Audio('/assets/audio/ting.mp3');

// fetch the user's name form URL
const givename = ()=>{
    let splitUrl = window.location.href.split("?")[1];
    uName.innerHTML = `<span class="active"></span>${splitUrl} (You)`
    return splitUrl;
}

let userId = givename();

// create the list of active users 
const active = (user)=>{
    if(userId != user){
        const activeuser = document.createElement('p');
        activeuser.classList.add('users');
        activeuser.innerHTML = `<span class="active"></span>${user}`;
        userlist.append(activeuser);
    }
}

// add the message received from other user's on our chat page
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

const changeSendColor = ()=>{
    if (messageInput.value.trim() == ''){
        submitBtn.classList.remove('typing')
    } else (
        submitBtn.classList.add('typing')
    )
}


form.addEventListener('input', ()=>{
    socket.emit('typing', userId);
    changeSendColor();
})

// when user send message will check if not blank and send to server
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if(message != ''){
        append(`You: ${message}`, 'right')
        messageInput.value = '';
        socket.emit('send', message)
        changeSendColor();
    }
})
socket.emit('new-user-joined', userId);

socket.on('connected-users', onlineUsers =>{
    userlist.innerHTML = ''
    for(let i in onlineUsers)
    active(onlineUsers[i]);
})

socket.on('receive', data => {
    append(`${data.userName}: ${data.message}`, 'left');
})