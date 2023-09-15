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
            //console.log(res.data);
            resolve(!Array.isArray(res.data));
        });
    })
}

// 以上か以下を確認する
function checkWordSizeM(size, word){
    if (size <= word.length){
        return true;
    } else {
        return false;
    }
}

function checkWordSizeB(size, word){
    if (size >= word.length){
        return true;
    } else {
        return false;
    }
}

// 文字が正しく始まっているか判定する
// 「ん」の判定もする
function checkWordStartF(size, beforeword, currentword){
    if (beforeword[size] === currentword[0]){
        if (currentword[size] === 'ん'){
            return false;
        }
        return true;
    } else {
        false;
    }
}

function checkWordStartB(size, beforeword, currentword){
    if (beforeword[(beforeword.length - 1) - size] === currentword[0]){
        if (currentword[(beforeword.length - 1) - size] === 'ん'){
            return false;
        }
        return true;
    } else {
        false;
    }
}

function ruleChecker(rule, history, word){
    console.log(rule);
    console.log(history[history.length - 1]);
    console.log(word);
    if (rule.type == "backstart"){
        return checkWordStartB(rule.size, history[history.length - 1], word);
    }
    if (rule.type == "frontstart"){
        return checkWordStartF(rule.size, history[history.length - 1], word);
    }
    if (rule.type == "more"){
        return checkWordSizeM(rule.size, word);
    }
    if (rule.type == "below"){
        return checkWordSizeB(rule.size, word);
    }
    return true;
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
                const rules = [
                    {
                        type: "backstart",
                        size: 0
                    },
                    {
                        type: "more",
                        size: 3
                    },
                    // {
                    //     type: "use",
                    //     word: "あ"
                    // }
                ]
                players = [queue.player_id, socket.id]
                const battle_info = {
                    room_id: room_id,
                    players: players,
                    turn: players[Math.floor(Math.random() * 2)],
                    history: ["しりとり"],
                    rules: rules
                }
                // 部屋の移動
                io.to(room_id).emit('MOVE_ROOM', battle_info);
                console.log(room_id);
                // 情報を送る
                //io.to(room_id).emit('SEND_BATTLE_INFO', battle_info);
            } 
        }
    })
    //dataの中にはplayerID, roomID, word, historyがある
    socket.on('RECEIVE_WORD', async function(data){
        console.log(data.word);
        const rules = data.rules;
        let check = await checkWord(data.word);
        for (let i = 0; i < rules.length; i++){
            if (!ruleChecker(rules[i], data.history, data.word)){
                check = false;
                break;
            }
        }
        console.log(check);
        console.log(data.room_id);
        io.to(data.room_id).emit('SEND_JUDGE', {
            judge: check,
            word: data.word,
            player_id: data.player_id
        });
    })

    socket.on('JOIN_ROOM', function(data){
        socket.join(data.room_id);
    });
});