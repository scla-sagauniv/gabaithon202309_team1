var express = require('express');
var socket = require('socket.io');
const crypto = require("crypto");
const axios = require('axios');

var app = express();

var rooms = [];
var temp_rooms = [];

const socketOptions = {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
};

// 広辞苑にあるか確かめる
function checkWord(word){
    return new Promise(resolve =>{
        axios.get("https://sakura-paris.org/dict/?api=1&q=" + word + "&dict=広辞苑&type=2").then(function(res){
            console.log(res.data);
            console.log(res.data.length);
            resolve(!Array.isArray(res.data));
            /*
            if (res.data.length == 0){
                resolve(false);
            }
            resolve(true);
            */
        });
    })
}

server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

io = socket(server, socketOptions);

io.on('connection', (socket) => {
    //console.log('rooms:', socket);
    socket.on('SEND_MESSAGE', function(data){
        io.to(data.room_id).emit('RECEIVE_MESSAGE', data);
        //console.log(io.socket.manager.rooms);
        
    })
    socket.on('INTO_ROOM', function(data){
        if (temp_rooms.length == 0){
            // roomid生成
            let room_id = crypto.randomUUID();
            temp_rooms.push(room_id);
            // room参加
            socket.join(room_id);
        } else {
            let room_id = temp_rooms.pop();
            // room参加
            socket.join(room_id);
            // ROOMIDを同じ部屋にいる2人に送る
            io.to(room_id).emit('RECEIVE_ROOMID', {
                room_id: room_id
            })
        }
    })
    //dataの中にはplayerID, roomID, wordがある
    socket.on('SEND_WORD', async function(data){
        console.log(data.word);
        let check = await checkWord(data.word);
        await console.log(check);
    })
});