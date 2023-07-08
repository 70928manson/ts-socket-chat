import devServer from "@/server/dev";
import prodServer from "@/server/prod";
import express from "express";
import { Server } from 'socket.io';
import http from 'http';
import UserService from "@/service/UserService";
import moment from 'moment';

//這裡是後端 server
const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const userService = new UserService()

//監測連接 (chatRoom/index.ts) 監測相應行為並執行程式發送給前端
io.on('connection', (socket) => {

  socket.emit('userID', socket.id)

  socket.on('join', ({ userName, roomName }: { userName: string, roomName:string }) => {
    const userData = userService.userDataInfoHandler(
      socket.id,
      userName,
      roomName
    )
    socket.join(userData.roomName)
    userService.addUser(userData)
    socket.broadcast.to(userData.roomName).emit('join', `${userName} 加入了 ${roomName} 聊天室`)
  })

  //監聽頻道
  socket.on('chat', (msg) => {  
    const time = moment.utc() 
    const userData = userService.getUser(socket.id)
    if (userData) {
      //把輸入框的訊息渲染到訊息介面
      io.to(userData.roomName).emit('chat', { userData, msg, time })
    }
  })

  socket.on('disconnect', () => {
    const userData = userService.getUser(socket.id)
    const userName = userData?.userName
    if (userName) {
      socket.broadcast.to(userData.roomName).emit('leave', `${userData.userName} 離開 ${userData.roomName} 聊天室`)
    }    
    userService.removeUser(socket.id)
  })

})


// 執行npm run dev本地開發 or 執行npm run start部署後啟動線上伺服器
if (process.env.NODE_ENV === "development") {
  devServer(app);
} else {
  prodServer(app);
}

console.log("server side", name);

app.listen(port, () => {
  console.log(`The application is running on port ${port}.`);
});
