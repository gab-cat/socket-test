import './App.css';
import io from 'socket.io-client'
import {useState, useEffect} from 'react'
import Setup from './components/Setup';
import MessageBox from './components/messageBox'
import { useContextProvider } from './context';

const socket = io.connect("https://prits-server.onrender.com/");

function App() {

  const {message, setMessage, doneSetup} = useContextProvider();

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
      {!doneSetup ? <Setup /> : <MessageBox value={sendMessage}/>}
    </div>
  );
}

export default App;
