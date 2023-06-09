const socket = io();

/* Swal.fire({
    title: 'Saludos',
    text: 'Mensaje Inicial',
    icon: 'success'
}) */

let user;
const chatBox= document.getElementById('chatBox');

Swal.fire({
    title: 'Identificación',
    input: 'text',
    text: 'Ingresa el usuario para identificarte en el chat',
    inputValidator: (value) =>{
        return !value && "Necesitas escribir un nombre de usuario para comenzar a chatear";
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result =>{
    user = result.value;
    socket.emit('autenticated', user);
}); 

chatBox.addEventListener('keyup', evt =>{
    if(evt.key==='Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', { user, message: chatBox.value });
            chatBox.value='';
        }
    }
});

socket.on('messageLogs', data =>{
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message} <br/>`
    });
    log.innerHTML=messages;
});

socket.on('newUserConnected', data =>{
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmationButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: 'success'
    }); 
});