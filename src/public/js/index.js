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
}); 