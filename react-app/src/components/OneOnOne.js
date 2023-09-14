import React from 'react';
import { Link } from 'react-router-dom';

function OneOnOne() {
  return (
    <div>
      <h1>バトル!!</h1>
      <div>
        <Link to="/Result">
          <button>終わり</button>
        </Link>
      </div>
    </div>
  );
}

export default OneOnOne;
