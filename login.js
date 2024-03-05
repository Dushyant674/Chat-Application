const loginBtn = document.querySelector('#Login'),
    errorMsg = document.querySelector('#error-msg');

let logName = ''

function checkUsername(){
    const loginName = document.querySelector('#login-name').value;
    if (loginName != '') {
        logName = loginName;
        window.location.href = `chat.html?${loginName}`;
        console.log(logName);
    } else {
        errorMsg.innerText = 'Need to enter you name to join';
    }
}
