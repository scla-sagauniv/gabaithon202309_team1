import React from 'react';
import { Link } from 'react-router-dom';

function SelectCharacter() {
  return (
    <div>
      <h1>戻る</h1>
      <div>
        <Link to="/SelectMode">
          <button>モード選択画面へ</button>
        </Link>
      </div>
    </div>
  );
}

export default SelectCharacter;
