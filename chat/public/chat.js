const socket = io();

// get DOM elements
let connected_users = document.getElementById('connected_users');
let messages = document.getElementById('messages');
let btn_send = document.getElementById('btn_send');
let text_message = document.getElementById('text_message');
let username = document.getElementById('username');
let form = document.getElementById('text_message_form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

btn_send.addEventListener('click', () => {
    console.log("username: ", username.value);
    console.log('message', text_message.value);
    /*socket.emit('chat:message', {

    })*/
});


socket.on('broadcast', (username) => {
    actions.innerHTML = `<p>
    <em> ${username} is typing a message</em>
    </p>`;
});

/*
$('form').submit(function () {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});

socket.on('chat message', function (msg) {
    $('#messages').append($('<li>').text(msg));
});*/