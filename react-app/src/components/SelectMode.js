import React from 'react';
import io from "socket.io-client";
import { Link, useNavigate } from 'react-router-dom';
import './SelectMode.css';

// リンク先はあとで実装
function SelectMode(props) {

  const navigate = useNavigate();
  const socket = io('localhost:8080', { withCredentials: true });

  socket.on("MOVE_ROOM", function(data){
    //console.log(data);
    navigate("/OneOnOne", {state: data});
  });

  const clickOneOnOne = ev => {
    socket.emit('SERTCH_ROOM');
    localStorage.setItem('player_id', socket.id);
  }

  return (
    <div>
      <div>
        <p className="background_char">MODE</p>
      </div>
      <div className="cha_rectangle">
        <img className="charImg" src={props.characterImage}></img>
      </div>
      <div>
        <Link to="/SelectCharacter">
          <button className="buttonChu">チュートリアル</button>
        </Link>
      </div>
      <div>
        <Link to="/SelectCharacter">
          <button className="buttonChar">キャラクター選択</button>
        </Link>
      </div>
      <div>
        <Link to="/OneOnOne">
          <button className="buttonBattleRoyal">バトルロワイヤル</button>
        </Link>
      </div>
      <div>
        <button className="buttonOneOnOne" onClick={clickOneOnOne}>1 vs 1モードへ</button>
      </div>
    </div>
  );
}

export default SelectMode;
