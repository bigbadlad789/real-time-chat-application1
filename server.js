const express = require('express')
const app = express()
const http=require("http");
const port = 3000
const path=require('path');

const socketio=require('socket.io');
const server=http.createServer(app);
const io=socketio(server);
const formatMessage=require('./messages/messages')
const botname='chat app bot'
const {userJoin,getCurrentUser,userLeave,getRoomUsers}=require("./messages/users")
//set a static folder
app.use(express.static(path.join(__dirname,'public')));

//runs whenver serve is started
io.on('connection',(socket)=>{
    socket.on('joinRoom',({username,room})=>{
        const user=userJoin(socket.id,username,room);
        socket.join(user.room);

    //welcome the current user
    socket.emit('message',formatMessage(botname,'welcome to chatcord!'));
    socket.broadcast.to(user.room).emit('message',formatMessage(botname,`${user.username} has joined the chat`))


    io.to(user.room).emit('roomUsers',{
        room:user.room,
        users:getRoomUsers(user.room)
    });
    })

    


//broadcast when a user connects
//this will notify everybody when a user hasjoined excpet for that user


socket.on('disconnect',()=>{
    const user=userLeave(socket.id);
    if(user){

        io.to(user.room).emit("message",formatMessage(botname,`${user.username} has Left the Chat`));

        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        });
    
    };

    
   
});
//io.emit() boradcasts to everybody in the chat


//listen for chatmsg
socket.on('chatMessage',msg=>{
    const user=getCurrentUser(socket.id);
    
    io.to(user.room).emit('message',formatMessage(user.username,msg));

})

//send users and room info

});



server.listen(port, () => console.log(`Example app listening at http://localhost:3000`));
