import React from 'react';
import { createRoot } from 'react-dom/client'; // 正しいインポート
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Routes from './RoutePran.js'; // ルーティング設定のコンポーネント

const root = createRoot(document.getElementById('root'));
root.render(<Routes />);
//ReactDOM.render(<Routes />, document.getElementById('root'));

/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
