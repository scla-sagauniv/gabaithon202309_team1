var express = require('express');
var socket = require('socket.io');
const crypto = require("crypto");
const axios = require('axios');

var app = express();

var rooms = [];
var player_queue = [];

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
    socket.on('SERTCH_ROOM', function(data){
        // 待っているプレイヤーがいるか判定
        if (player_queue.length == 0){
            // roomid生成
            let room_id = crypto.randomUUID();
            let new_room = {
                player_id: socket.id,
                room_id: room_id
            }
            player_queue.push(new_room);
            // room参加
            socket.join(room_id);
        // バトルの開始
        } else {
            let new_player = true;
            // 同じプレイヤーのボタン押下を検知
            for (let i = 0; i < player_queue.length; i++){
                if (socket.id == player_queue[i].player_id){
                    new_player = false;
                }
            }
            if (new_player){
                let queue = player_queue.shift();
                let room_id = queue.room_id;
                // room参加
                socket.join(room_id);
                // バトルの初期情報をまとめる
                players = [queue.player_id, socket.id]
                let battle_info = {
                    room_id: room_id,
                    players: players,
                    turn: players[Math.floor(Math.random() * 2)],
                    rules: []
                }
                // 情報を送る
                io.to(room_id).emit('SEND_BATTLE_INFO', battle_info);
                // 部屋の移動
                io.to(room_id).emit('MOVE_ROOM', {
                    room_id: room_id
                })
            } 
        }
    })
    //dataの中にはplayerID, roomID, wordがある
    socket.on('SEND_WORD', async function(data){
        console.log(data.word);
        let check = await checkWord(data.word);
        await console.log(check);
    })
});