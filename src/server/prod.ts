import express, { Express } from "express";
import compression from "compression";
import path from "path";

//prod -> 部屬到線上環境後執行的部分
export default function (app: Express) {
  app.use(compression());
  app.use(express.static(path.resolve(__dirname, "../../dist")));

  app.get("/main", function (req, res, next) {
    res.sendFile("/main/main.html");
  });

  app.get("/chatroom", function (req, res, next) {
    res.sendFile("/chatroom/chatroom.html");
  });
}
