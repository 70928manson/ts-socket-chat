# 本地開發流程
1. 執行server端src / index.js
2. webpack啟動編譯 (做出main、chatroom頁面)
3. 使用者在瀏覽器發起對應dev.ts請求
4. server 回傳對應的頁面

# 專案步驟

(client端) HTML5頁面
1. npm run build -> 建立client頁面
2. 過程:
    2-1: Webpack編譯 TS + CSS + main.html -> Main頁面
    2-2: Webpack編譯 TS + CSS + chatRoom.html -> chatroom頁面
(server端) Node Server
3. 啟動express server
4. 判斷當前process.env.NODE_ENV環境
    4-1: 本地開發走dev.ts
    4-2: 線上環境走prod.ts
5. user從瀏覽器端(client端)對Node Server請求頁面

local:host:3000/main

local:host:3000/chatroom

dev.ts -> 重定向到main/main.html跟chatRoom/chatRoom.html

prod.ts -> 直接返回main/main.html跟chatRoom/chatRoom.html

# 前端頁面 即時更新內容
1. 使用者上下線狀態
2. 聊天室

輪詢: setInterval -> 每幾秒拉一次api內容 -> 更新頁面

問題: 聊天室若要即時更新會發送大量api請求 

websocket: 前後端的連線除非有一方斷開，否則就會一直存在

