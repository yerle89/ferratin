let socket;
let typing = false;

// nickname DOM elements
const div_nickname = document.getElementById('div_nickname');
const nickname_form = document.getElementById('nickname_form');
const nickname_login = document.getElementById('nickname_login');

// chat DOM elements
const div_chat = document.getElementById('div_chat');
const connected_users = document.getElementById('connected_users');
const messages = document.getElementById('messages');
const text_message = document.getElementById('text_message');
const nickname_logged = document.getElementById('nickname_logged');
const text_message_form = document.getElementById('text_message_form');
const typing_users = document.getElementById('typing_users');

nickname_form.addEventListener('submit', e => {
    e.preventDefault();
    socket = io();

    div_nickname.style.display = 'none';
    div_chat.style.display = 'block';
    nickname_logged.value = nickname_login.value;

    socket.emit('on_connected_user', {
        nickname: nickname_login.value
    });

    socket.on('connected_users', data => {
        let res_connected_users = '';
        for (const user of data) {
            if (user.id != socket.id) {
                if (res_connected_users === '')
                    res_connected_users = user.nickname;
                else
                    res_connected_users = res_connected_users.concat(' ', user.nickname);
            }
        }
        connected_users.innerHTML = res_connected_users;
    });

    socket.on('typing_users', data => {
        let num_typing_users = 0;
        let res_typing_users = '';
        for (const user of data) {
            if (user.id != socket.id) {
                if (res_typing_users === '')
                    res_typing_users = user.nickname;
                else
                    res_typing_users = res_typing_users.concat(', ', user.nickname);
                num_typing_users++;
            }
        }
        if (num_typing_users === 0)
            typing_users.innerHTML = '';
        else if (num_typing_users === 1)
            typing_users.innerHTML = res_typing_users + ' is typing';
        else
            typing_users.innerHTML = res_typing_users + ' are typing';
    });

    socket.on('broadcast_text_message', data => {
        messages.innerHTML += `<li>
        <strong>${data.nickname}</strong>: ${data.message}
        </li>`;
    });

});

text_message_form.addEventListener('submit', e => {
    e.preventDefault();
    socket.emit('send_text_message_to_server', {
        nickname: nickname_logged.value,
        message: text_message.value
    });
});

text_message.addEventListener('keyup', () => {
    if (text_message.value !== '') {
        if (!typing) {
            socket.emit('on_start_typing', {
                nickname: nickname_logged.value
            });
        }
    } else {
        typing = false;
        socket.emit('on_finish_typing', {
            nickname: nickname_logged.value
        });
    }
});
