import React from 'react';
import { Link } from 'react-router-dom';
import io from "socket.io-client";

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

  render(){
    return (
      <div>
        <h1>バトル!!</h1>
        <div>

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
