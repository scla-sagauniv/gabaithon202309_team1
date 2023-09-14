import React from 'react';
import { Link } from 'react-router-dom';
import './SelectCharacter.css'

// 微調整は頼んだ...
function SelectCharacter() {
  return (
    <div>
      <div>
        <Link to="/SelectMode">
          <button className="backButton">←</button>
        </Link>
      </div>
      <div className="chaex_rectangle">
        <p>強靭!無敵!最強!!!!!!!</p>
      </div>
      <div>
        <img className="charImgPri" src="./img/nigaoe_leibniz.png"></img>
      </div>
    </div>
  );
}

export default SelectCharacter;
