import React from 'react';
import { Link } from 'react-router-dom';
import './Result.css'

function Result() {
  return (
    <div>
      <p className="winner_text">WINNER</p>
      <div className="cha_win_rectangle">
        <img className="cha_win_img" src="./img/nigaoe_leibniz.png" prop="leibniz"></img>
      </div>
      <div className="result">
        <div className="result_top"></div>
        <p className="result_result">RESULT</p>
        <p className="result_time">対戦時間    </p>
        <p className="result_rally">ラリー回数  </p>
      </div>
      <div className="button_tomenu1">
        <Link to="/SelectMode">
          <button className="button_tomenuforresult">モード選択画面へ</button>
        </Link>
      </div>
    </div>
  );
}

export default Result;
