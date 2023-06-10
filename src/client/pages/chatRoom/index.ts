import "./index.css";
import { io } from 'socket.io-client';

const url = new URL(location.href);
const userName = url.searchParams.get('user_name');
const roomName = url.searchParams.get('room_name');

console.log('chat', userName, roomName);

//避免使用者直接進到聊天室畫面，確保輸入userName和選擇房間才能進去
if (!userName || !roomName) {
    location.href = '/main/main.html';
}

//1. 建立連接 -> node server
const clientIo = io();

const textInput = document.getElementById("textInput") as HTMLInputElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;

submitBtn.addEventListener('click', () => {
    const textValue = textInput.value;

    //推送textValue給後端，chat event
    clientIo.emit('chat', textValue);
})

//頻道
clientIo.on('join', (msg) => {
    ;    
})

clientIo.on('chat', (msg) => {
    console.log('client', msg);
})