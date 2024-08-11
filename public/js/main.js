const socket=io();
const chatform=document.getElementById('chat-form')

//we try to catch the 'message'that is sent by the socket evrtytime a new connection is established 
socket.on('message',message=>{
    console.group(message);
    outputMessage(message);

    //scroll down
})

chatform.addEventListener('submit',(e)=>{
    e.preventDefault(); //prevent the auto reload of the page
    const msg=e.target.elements.msg.value;
    //emitting a message to the server
    socket.emit('chatMessage',msg)
});

function outputMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">Mary <span>9:15pm</span></p>
						<p class="text">
							${message}
						</p>`

    document.querySelector('.chat-messages').appendChild(div);
}


