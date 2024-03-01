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
    <div className="flex flex-row justify-center align-center items-center m-auto p-10 m-5">
      <input className='w-[500px]' type="text" value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder='message' />
      <input type='button' value='Send Message' onClick={sendMessage} />
    </div>
  );
}

export default App;
