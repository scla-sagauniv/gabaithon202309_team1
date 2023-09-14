import React from 'react';
import { Link } from 'react-router-dom';

function SelectMode() {
  return (
    <div>
      <h1>モードを選択</h1>
      <div>
        <Link to="/SelectCharacter">
          <button>キャラクター選択画面へ</button>
        </Link>
      </div>
      <div>
        <Link to="/OneOnOne">
          <button>1 vs 1モードへ</button>
        </Link>
      </div>
    </div>
  );
}

export default SelectMode;
