import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import {useState, useEffect} from 'react'

const socket = io.connect("https://prits-server.onrender.com/");

function App() {

  const [message, setMessage] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', {message: message})
    console.log(message);
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      const message = data.message;
      console.log("Received Message: ", message)
      alert(message);
    })
  }, [socket]);

  return (
    <div className="App">
      <input type="text" value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder='message'/>
      <input type='button' value='Send Message' onClick={sendMessage} />
    </div>
  );
}

export default App;
