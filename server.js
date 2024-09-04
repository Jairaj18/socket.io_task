import express from 'express';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
// import cors from 'cors';
import http from 'http';
import { connect } from './config.js';
import chatModel from './chat.schema.js';

const app = express();

// 1. Creating server using http.
const server = http.createServer(app);

// 2. Create socket server.
const io = new Server(server,{
    cors:{
        origin:'*',
        methods:["GET", "POST"]
    }
});



io.on('connection', (socket)=>{
    console.log("Connection is established");
    socket.on('join',(data)=>{
        socket.username=data;
    })

    socket.on('new_message', (message)=>{
        let userMessage = {
            username: socket.username,
            message: message
        }

        const newChat = new chatModel({
            username: socket.username,
            message:message,
            timestamp: new Date()
        });
        newChat.save();

        socket.broadcast.emit('broadcast_message', userMessage);
    })
    socket.on('disconnect', (message)=>{
        console.log("connection is disconnected");
    })
});

server.listen(3000, ()=>{
    console.log("App is listening on 3000");
    connect();
})
