import React from 'react';
import { Link } from 'react-router-dom';
import io from "socket.io-client";
import './OneOnOne.css';

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

    this.addRule = ev => {
      var newElement = document.createElement("p"); // p要素作成
      var newContent = document.createTextNode("ルール1"); // テキストノードを作成
      newElement.appendChild(newContent); // p要素にテキストノードを追加
      newElement.setAttribute("id","child"); // p要素にidを設定
      
      // ----------------------------
      // 親要素の最後の子要素を追加します
      // ----------------------------
      // 親要素（div）への参照を取得
      var parentDiv = document.getElementById("rule-div");
      
      // 追加
      parentDiv.appendChild(newElement);
    }

    this.enterTheRoom = ev => {
        ev.preventDefault();
        this.socket.emit('INTO_ROOM');
    }
  }

  render(){
    return (
      <div className='oneonone_canvas'>
       <p className="oneonone_rules">RULES</p>   
        <div id="rule-div">
        {/* <p className="child">RULE1</p> */}
        </div>

        <button onClick={this.addRule}>ルール追加</button>

        <div>
          <div className="oneonone_histryrectangle">
            <p className="oneonone_histrys">HISTRY</p>
            <p className="oneonone_histry">HISTRY1</p>
          </div>
        <input type="text" placeholder="Message" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} className="form-control"/>
          <Link to="/Result">
            <button>終わり</button>
          </Link>
          <br/>
          <button onClick={this.sendWord} >Send</button>
        </div>
      </div>
    );
  }
}

export default OneOnOne;
