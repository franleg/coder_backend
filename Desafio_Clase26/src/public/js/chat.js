const socketChat = io();

/* let formChat = document.getElementById('form-chat');
let chatBox = document.getElementById('chat-box');
let chatMessage = document.getElementById('chat-message');

let author;

Swal.fire({
    title: 'Registrate',
    html:
        '<input id="swal-input1" class="swal2-input" type="email" placeholder="E-mail">' +
        '<input id="swal-input2" class="swal2-input" type="text" placeholder="Nombre">' +
        '<input id="swal-input3" class="swal2-input" type="text" placeholder="Apellido">' +
        '<input id="swal-input4" class="swal2-input" type="number" placeholder="Edad">' +
        '<input id="swal-input5" class="swal2-input" type="text" placeholder="Alias">' +
        '<input id="swal-input6" class="swal2-input" type="file" placeholder="Avatar">',
    preConfirm: () => {
        return new Promise((resolve) => {
            userEmail = document.getElementById('swal-input1').value;
            userName = document.getElementById('swal-input2').value;
            userLastName = document.getElementById('swal-input3').value;
            userAge = document.getElementById('swal-input4').value;
            userAlias = document.getElementById('swal-input5').value;
            userAvatar = document.getElementById('swal-input6').value;
            if (userEmail == '' || userName == '' || userLastName == '' || userAge == '' || userAlias == '' || userAvatar == '') {
                Swal.showValidationMessage("Completar todos los campos");
                Swal.getConfirmButton().disabled = false
            }else {
                resolve({
                    id: userEmail,
                    name: userName,
                    lastName: userLastName,
                    age: userAge,
                    alias: userAlias,
                    avatar: userAvatar
                });
            }
        })
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    author = result.value;
})

formChat.addEventListener('submit', (e) => {
    e.preventDefault();
    if(chatMessage.value.trim().length > 0){
        socketChat.emit('client: message', {
            author: author, 
            text: chatMessage.value, 
            time: moment().format(('DD/MM/YYYY hh:mm:ss'))
        })
        chatMessage.value= "";
    }
})

socketChat.on('server: messages', data => {
    let messages = "";
    data.messages.forEach(message => {
        messages += `<div class="message">
                        <span style="color:blue">${message.author.id}</span>
                        <span style="color:black">&nbsp[</span>
                        <span style="color:red">${message.time}</span>
                        <span style="color:black">]:&nbsp</span>
                        <span style="color:green">${message.text}<span>
                    </div>`
    })
    chatBox.innerHTML = messages;
})
 */