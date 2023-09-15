import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './SelectCharacter.css'
import SelectMode from './SelectMode';

// 微調整は頼んだ...
function SelectCharacter({ characterImage, onCharacterImageChange, ExplainChange, onExplainChange }) {
  // stateを定義して初期値を設定します
  const [charImgUrl, setCharImgUrl] = useState(characterImage)
  const [charExp, setExp] = useState(ExplainChange);
  // 画像を切り替える関数を定義します
  const changeImage = (newImageUrl) => {
    setCharImgUrl(newImageUrl);
    onCharacterImageChange(newImageUrl);
  };

  // 説明文を切り替える関数
  const changeExp = (newExp) => {
    setExp(newExp);
    var elm = document.getElementById('explain');
    elm.textContent = newExp;
    // explainを親コンポーネントに通知
    onExplainChange(newExp);
  };

  return (
    <div>
      <div>
        <Link to="/SelectMode">
          <button className="backButton">←</button>
        </Link>
      </div>
      <div className="chaex_rectangle">
        <p id='explain'>{charExp}</p>
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
