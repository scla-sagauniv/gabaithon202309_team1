import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Title from './components/Title.js';
import SelectMode from './components/SelectMode.js';
import SelectCharacter from './components/SelectCharacter.js';
import OneOnOne from './components/OneOnOne.js';
import Result from './components/Result.js';

function RoutePran() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/SelectMode" element={<SelectMode/>} />
        <Route path="/SelectCharacter" element={<SelectCharacter />} />
        <Route path="/OneOnOne" element={<OneOnOne />} />
        <Route path="/Result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default RoutePran;
