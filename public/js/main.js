const socket=io();
const chatMessages=document.querySelector('.chat-messages');
const chatform=document.getElementById('chat-form')
const roomName=document.getElementById('room-name');
const userList=document.getElementById('users');
//we try to catch the 'message'that is sent by the socket evrtytime a new connection is established 
socket.on('message',message=>{
    console.group(message);
    outputMessage(message);

    //scroll down
    chatMessages.scrollTop=chatMessages.scrollHeight
})

const{username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
});

//join chatroom
socket.emit('joinRoom',{username,room});


chatform.addEventListener('submit',(e)=>{
    e.preventDefault(); //prevent the auto reload of the page
    const msg=e.target.elements.msg.value;
    //emitting a message to the server
    socket.emit('chatMessage',msg);

    //clear input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus()
    //it focuses on the empty message box so that its value remains null once a new message is sent.

});
//output message to the dom
function outputMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username} <span> ${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>`

    document.querySelector('.chat-messages').appendChild(div);
}

//get room and users
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
});


//add room name to dom
function outputRoomName(room){
    roomName.innerText=room;

}
//adding users to dom

function outputUsers(users){
    userList.innerHTML=`
    ${users.map(user=>`<li>${user.username}</li>`).join('')}`;
}


