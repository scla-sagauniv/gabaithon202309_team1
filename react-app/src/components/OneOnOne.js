import React, { useState } from 'react';
import io from "socket.io-client";
import { useLocation } from 'react-router-dom';

function OneOnOne(){
  const location = useLocation();
  const init = location.state;

  const [history, setHistory] = useState(init.history); // 履歴
  const [rules, setRules] = useState(init.rules); // ルール
  const [player_id, setPlayerID] = useState();
  const [players, setPlayers] = useState(init.players); // 部屋にいるプレイヤーのID
  const [turn, setTurn] = useState(init.turn); // どちらのプレイヤーのターンか
  const [room_id, setRoomID] = useState(init.room_id); // 部屋のID
  const [word, setWord] = useState(""); // 入力している文字列

  const socket = io('localhost:8080', { withCredentials: true });
  socket.emit('JOIN_ROOM', {room_id: room_id});

  socket.on('RECEIVE_MESSAGE', function(data){
      
  });

  // 初期データの受け取り
  socket.on('SEND_BATTLE_INFO', function(data){
    console.log(data);
    // 表示設定
    //setHistory([...history, data.history]);
    setTurn(data.turn);
    //setRules([...rules, data.rules]);
    for (let i = 0; i < data.rules.length; i++){
      setRules(t => [...t, data.rules[i]]);
    }
    setRoomID(data.room_id);
    //setPlayers([...players, data.players]);
    for (let i = 0; i < data.players.length; i++){
      setPlayers(t => [...t, data.players[i]]);
    }
  });

  socket.on('SEND_JUDGE', function(data){
    // 入力が正当なとき
    console.log(data);
    if (data.judge){
      setHistory([...history, data.word]);
      // turnの交代
      if (localStorage.getItem('player_id') == data.player_id){
        console.log("test1");
        if (players[0] == localStorage.getItem('player_id')){
          console.log("test2");
          setTurn(players[1]);
        } else {
          console.log("test3");
          setTurn(players[0]);
        }
      } else {
        setTurn(localStorage.getItem('player_id'));
      }
    }
  });

  const clickSend = ev => {
    if (turn == localStorage.getItem('player_id')){
      socket.emit('RECEIVE_WORD', {
        player_id: localStorage.getItem('player_id'),
        room_id: room_id,
        word: word,
        history: history,
        rules: rules
      });
    }
  }
  
  return (
    <div>
      <h1>バトル!!</h1>
      <div>
        <input type="text" value={word} onChange={ev => setWord(ev.target.value)} placeholder="Message" />
        <br/>
        <button onClick={clickSend}>Send</button>
      </div>
      <div className='turn-player'>
        {turn}
      </div>
      <div className='history'>
        {history}
      </div>
    </div>
  );
}
  

export default OneOnOne;
