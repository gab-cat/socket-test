import './App.css';
import io from 'socket.io-client'
import {useState, useEffect} from 'react'
import Setup from './components/Setup';
import MessageBox from './components/messageBox'
import { useContextProvider } from './context';

// const socket = io.connect("https://prits-server.onrender.com/");
const socket = io.connect("localhost:5000");

function App() {

  const {message, setMessage, doneSetup, room, username, setMessageThread, setDoneSetup} = useContextProvider();
  const [loading, setLoading] = useState(false)
  const [showJoinError, setJoinError] = useState(false);

  const now = new Date();
  const localTime = now.toLocaleTimeString();

  const sendMessage = () => {
    const data = {
      username: username, 
      message: message, 
      room: room, 
      dateTime: localTime
    }
    socket.emit('send_message', data);
    setMessageThread(prevMessages => [...prevMessages, data]);
    setMessage('')
    console.log(message);
}

  const joinRoom = () => {
    socket.emit('join_room', { room: room, username: username });
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageThread(prevMessages => [...prevMessages, data]);
    })

    socket.on('join_room_error', (data) => {
      setLoading(false)
      setJoinError(true);
    })

    socket.on('join_room_success', (data) => {
      setDoneSetup(true);
      setLoading(false)
    })

  }, [socket]);

  return (
    <div className='h-full w-full flex flex-row content-center justify-center align-middle m-auto'>
      {!doneSetup ? <Setup joinRoom={joinRoom} loading={loading} setLoading={setLoading} showJoinError={showJoinError} /> : <MessageBox sendMessage={sendMessage}/>}
    </div>
  );
}

export default App;
