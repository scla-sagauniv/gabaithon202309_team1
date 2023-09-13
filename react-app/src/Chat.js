import io from "socket.io-client";

class Chat extends React.Component{
    constructor(props){
        super(props);
  
        this.socket = io('localhost:8080');
    
        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                // json形式で送信するメッセージを記述
            });
        }
    
        this.socket.on('RECEIVE_MESSAGE', function(data){
            // メッセージ受信時に実行したいことを記述
        });
    }
}