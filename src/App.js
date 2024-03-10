import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import {useState, useEffect} from 'react'
import Setup from './components/Setup';

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
    <div className='h-full w-full flex flex-row content-center justify-center align-middle m-auto'>
      <Setup />
    </div>
  );
}

export default App;
