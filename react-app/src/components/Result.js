import React from 'react';
import { Link } from 'react-router-dom';

function Result() {
  return (
    <div>
      <h1>結果発表!!!</h1>
      <div>
        <Link to="/SelectMode">
          <button>モード選択画面へ</button>
        </Link>
      </div>
    </div>
  );
}

export default Result;
