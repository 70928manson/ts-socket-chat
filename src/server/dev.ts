import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import { Express } from "express";

//dev -> 開發 (webpack處理、兩個路徑) 
export default function (app: Express) {
  const config = require("../../webpack.config.js");
  const compiler = webpack(config);


  //導引至主頁面入口，輸入用戶名加入指定聊天室
  app.get("/main", function (req, res, next) {
    res.redirect("/main/main.html");
  });

  //聊天室頁面
  app.get("/chatRoom", function (req, res, next) {
    res.redirect("/chatRoom/chatRoom.html");
  });

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  );
}
