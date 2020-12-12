var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const path = require('path');

users = {};
app.use(express.static(path.join(__dirname,'client')));

app.get('/',(req,res) =>{
    res.sendFile(__dirname+'/client/index.html');
});

io.on('connection',(socket) =>{
    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',{name:users[socket.id]});
    })
    socket.on('new-user-joined',(name)=>{
        console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send-message',(message)=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]});
    });
});

http.listen(3000,()=>{
    console.log('Listening on : 3000');
});

// const users = {};

// io.on('connection',(socket) =>{
//     socket.on('new-user-joined',(name) =>{
//         console.log(name);
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined',name);
//     });
//     socket.on('send', message =>{
//         socket.broadcast.emit('receive',{message:meassage, name:users[socket.id]})
//     });
// });