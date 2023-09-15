import React from 'react';
import { Link } from 'react-router-dom';
import io from "socket.io-client";
import './OneOnOne.css'

class OneOnOne extends React.Component{
  constructor(props){
    super(props);

    this.state = {
        username: '',
        message: '',
        messages: []
    };

    this.socket = io('localhost:8080', { withCredentials: true });

    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    });
    // ルームIDの受け取り
    this.socket.on('RECEIVE_ROOMID', function(data){
        localStorage.setItem('ROOM_ID', data.room_id);
    });

    const addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
        console.log(this.state.messages);
    };

    this.sendWord = ev => {
        ev.preventDefault();
        this.socket.emit('SEND_WORD', {
            author: this.state.username,
            word: this.state.message,
            room_id: localStorage.getItem('ROOM_ID')
        });
        this.setState({message: ''});
    }

    this.enterTheRoom = ev => {
        ev.preventDefault();
        this.socket.emit('INTO_ROOM');
    }
  }

  // Enterキーが押されたときにsendWordを呼び出す関数
  handleKeyDown = (ev) => {
    if (ev.key === 'Enter') {
      this.sendWord(ev);
    }
  }

  render(){
    return (
      <div>
          <Link to="/Result">
            <button>終わり</button>
          </Link>
          <br/>
          <button onClick={this.sendWord} >Send</button>
        <div className="my_area">
          <div className="my_name">Player1</div>
          <img className="my_char_img" src="./img/nigaoe_leibniz.png" prop="leibniz"></img>
          <img className="my_hukidasi" src="./img/e1189_1.png"></img>
          <input type="text" size="7" placeholder="Message" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} onKeyDown={this.handleKeyDown} className="form-control"/>
        </div>
        <div className="ene_area">
          <div className="ene_name">Player2</div>
          <img className="ene_char_img" src="./img/nigaoe_leibniz.png" prop="leibniz"></img>
          <img className="ene_hukidasi" src="./img/e1189_1.png"></img>
          <div className="ene_text">3.ゴリラ</div>
        </div>
      </div>
    );
  }
}

export default OneOnOne;
