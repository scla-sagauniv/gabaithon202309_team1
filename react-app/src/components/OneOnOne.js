import React from 'react';
import { Link } from 'react-router-dom';
import io from "socket.io-client";

function OneOnOne(){

  const socket = io('localhost:8080', { withCredentials: true });

  socket.on('RECEIVE_MESSAGE', function(data){
      
  });

  // 初期データの受け取り
  socket.on('SEND_BATTLE_INFO', function(data){
      localStorage.setItem('ROOM_ID', data.room_id);
  });
  
  return (
    <div>
      <h1>バトル!!</h1>
      <div>
        <input type="text" placeholder="Message" className="form-control"/>
        <br/>
        <button>Send</button>
      </div>
    </div>
  );
}
  

export default OneOnOne;
