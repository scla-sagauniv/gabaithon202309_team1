import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Title from './components/Title.js';
import SelectMode from './components/SelectMode.js';
import SelectCharacter from './components/SelectCharacter.js';
import OneOnOne from './components/OneOnOne.js';
import Result from './components/Result.js';
import { useState } from 'react';

function RoutePran() {
  const [characterImage, setCharacterImage] = useState('./img/nigaoe_leibniz.png')
  const [charExp, setExp] = useState('強靭!無敵!最強!!!!!!!');

  // 子コンポーネントからの変更用コールバック関数
  const handleCharacterImageChange = (newImageUrl) => {
    setCharacterImage(newImageUrl);
  };

  const handleCharacterTextChange = (newText) => {
    setExp(newText);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/SelectMode" element={<SelectMode characterImage={characterImage} />} />
        <Route path="/SelectCharacter" element={<SelectCharacter characterImage={characterImage} onCharacterImageChange={handleCharacterImageChange} ExplainChange={charExp} onExplainChange={handleCharacterTextChange}/>} />
        <Route path="/OneOnOne" element={<OneOnOne />} />
        <Route path="/Result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default RoutePran;
