const socket = io();

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const activity = document.querySelector('.activity');

const append = (who,message,position)=>{
    const messageElement = document.createElement('div');
    const whoI = document.createElement('span');
    whoI.id = 'ravi';
    whoI.innerText = `${who}:-> `;
    messageElement.append(whoI);
    const p = document.createElement('p');
    p.innerText = message;
    p.id = 'p1';
    messageElement.append(p);
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

let name = prompt("Enter your name to join");
socket.emit('new-user-joined',name);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append("You",message,'left');
    socket.emit('send-message',message);
    messageInput.value ="";
});

socket.on('left',(data)=>{
    append(data.name,`left the chat`,'right');
})

socket.on('user-joined', (data)=>{
    append(data,`joined the chat`,'right');
});

socket.on('recieve',(data)=>{
    append(data.name,data.message,'right');
});