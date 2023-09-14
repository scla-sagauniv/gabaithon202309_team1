import React from 'react';
import { Link } from 'react-router-dom';
import './SelectMode.css';

// リンク先はあとで実装
function SelectMode() {
  return (
    <div>
      <div>
        <p className="background_char">MODE</p>
      </div>
      <div className="cha_rectangle">
        <img className="charImg" src="./img/nigaoe_leibniz.png"></img>
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
        <Link to="/OneOnOne">
          <button className="buttonOneOnOne">1 vs 1モードへ</button>
        </Link>
      </div>
    </div>
  );
}

export default SelectMode;
