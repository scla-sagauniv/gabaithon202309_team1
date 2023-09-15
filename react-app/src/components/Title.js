import React from 'react';
import { Link } from 'react-router-dom';
import './Title.css';

function Title() {
  const linkStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none', // Remove underline
    color: 'inherit',
  };

    return (
      <Link to="/SelectMode" style={linkStyle}>
      <div>
        <div className="title_rectangle">
          <p className="title_str">限界</p>
          <p className="title_str2">しりとり</p>
          <div className="title_eclipse"></div>
        </div>
        <div>
          <p className="display_click">ー 画面をクリックでスタート ー</p>
        </div>
      </div>
      </Link>
    );
  }
  
  export default Title;
  