import React from 'react';
import { Link } from 'react-router-dom';

function Title() {
    return (
      <div>
        <h1>タイトル</h1>
        <p>Click</p>
        <Link to="/SelectMode">別の画面に遷移</Link>
      </div>
    );
  }
  
  export default Title;
  