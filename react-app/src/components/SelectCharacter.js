import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './SelectCharacter.css'

// 微調整は頼んだ...
function SelectCharacter() {
  // stateを定義して初期値を設定します
  const [charImgUrl, setCharImgUrl] = useState('./img/nigaoe_leibniz.png');
  const [charExp, setExp] = useState('強靭!無敵!最強!!!!!!!');

  // 画像を切り替える関数を定義します
  const changeImage = (newImageUrl) => {
    setCharImgUrl(newImageUrl);
  };

  // 説明文を切り替える関数
  const changeExp = (newExp) => {
    setExp(newExp);
    var elm = document.getElementById('explain');
    elm.textContent = newExp;
  };

  return (
    <div>
      <div>
        <Link to="/SelectMode">
          <button className="backButton">←</button>
        </Link>
      </div>
      <div className="chaex_rectangle">
        <p id='explain'>強靭!無敵!最強!!!!!!!</p>
      </div>
      <div className="cha2_rectangle">
        <img className="charImgPri" src={charImgUrl}></img>
      </div>
      <div className="container">
        <button className="item1" onClick={() => {changeImage('./img/nigaoe_leibniz.png'); changeExp('強靭!無敵!最強!!!!!!!')}}></button>
        <button className="item2" onClick={() => {changeImage('./img/nigaoe_michelangelo.png'); changeExp('負け犬から馬の骨に昇格させてやる')}}></button>
        <button className="item3" onClick={() => {changeImage('./img/nigaoe_shibata_katsuie.png'); changeExp('カードを俺の血で汚したくない…手をあげさせてもらう…貴様のおかげでレアカードに傷がついたわ！！俺を殺すならカードで殺せ')}}></button>
      </div>
    </div>
  );
}

export default SelectCharacter;
