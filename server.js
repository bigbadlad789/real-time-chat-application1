const express = require('express')
const app = express()
const http=require("http");
const port = 3000
const path=require('path');
const { disconnect } = require('process');
const socketio=require('socket.io');
const server=http.createServer(app);
const io=socketio(server);

//set a static folder
app.use(express.static(path.join(__dirname,'public')));

//runs whenver serve is started
io.on('connection',socket=>{
    
//welcome the current user
socket.emit('message','welcome to chatapp!')

//broadcast when a user connects
//this will notify everybody when a user hasjoined excpet for that user

socket.broadcast.emit('message','A user has joined the chat');
//runs when the clients disconnects
socket.on('disconnect',()=>{

    io.emit('message','A user has left the chat')
});
//io.emit() boradcasts to everybody in the chat


//listen for chatmsg
socket.on('chatMessage',msg=>{
    io.emit('message',msg);

})

});



server.listen(port, () => console.log(`Example app listening at http://localhost:3000`));
