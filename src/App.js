import './App.css';
import io from 'socket.io-client'
import {useState, useEffect} from 'react'
import Setup from './components/Setup';
import MessageBox from './components/messageBox'
import { useContextProvider } from './context';
import Cookies from 'universal-cookie';

// const socket = io.connect("https://prits-server.onrender.com/");
const socket = io.connect("192.168.1.4:5000");

function App() {
  const cookies = new Cookies();


  const {message, setMessage, doneSetup, room, username, setMessageThread, setDoneSetup, setRoom, setUsername, messageThread} = useContextProvider();
  const [loading, setLoading] = useState(false)
  const [showJoinError, setJoinError] = useState(false);
  const [typingUsers, setTypingUsers] = useState([])
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // milliseconds in one day
  const expirationTime = new Date(Date.now() + oneDayInMilliseconds);


  useEffect(() => {
    const usernameCookies = cookies.get("username");
    const roomCookies = cookies.get("room");

    if (usernameCookies === '' || roomCookies === '') 
      return;
    if (usernameCookies === undefined || roomCookies === undefined)
      return;

    console.log(usernameCookies + ' + ' + roomCookies);
    setLoading(true);
    setUsername(usernameCookies)
    setRoom(roomCookies)
    
    socket.emit('join_room', { room: roomCookies, username: usernameCookies });

  },[]);

  const sendMessage = () => {
    if (message === '') {
      return;
    }

    const data = {
      username: username, 
      message: message, 
      room: room, 
      dateTime: '',
      type: 'message'
    }
    socket.emit('send_message', data);
    setMessage('')
    socket.emit('not_typing', { username: username });
    console.log(message);
}

const handleMessage = (e) => {
  const newMessage = e.target.value; 
  setMessage(newMessage); 

  if (newMessage.trim() === '') {
    socket.emit('not_typing', { username: username });
  } else {
    socket.emit('typing', { username: username });
  }
};


  const joinRoom = () => {
    socket.emit('join_room', { room: room, username: username });
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageThread(prevMessages => [...prevMessages, data]);
      console.log(messageThread);
    })

    socket.on('join_room_error', () => {
      setLoading(false)
      setJoinError(true);
    })

    socket.on('join_room_success', (data) => {
      setDoneSetup(true);
      setLoading(false);

      cookies.set('username', data.username, { expires: expirationTime });
      cookies.set('room', data.room, { expires: expirationTime });
    })

    socket.on('typingUsers', (data) => {
      if (data.length > 0) {
        const filteredTypingUsers = data.filter(user => user !== username);
        setTypingUsers(filteredTypingUsers);
    } else {
        setTypingUsers([]);
    }
    })

    socket.on('disconnect', () => {
      socket.emit('not_typing', { username: username });
    });

  }, [socket]);


  useEffect(() => {
    const handleWindowClose = (event) => {
      event.preventDefault();
      const confirmationMessage = 'Are you sure you want to leave?';
      event.returnValue = confirmationMessage;
      // socket.emit('disconnect', { username: username, room: room });
      event.returnValue = confirmationMessage; 
      return confirmationMessage; 
    };

    window.addEventListener('beforeunload', handleWindowClose);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  },[])
    

  return (
    <div className='h-full w-full flex flex-row content-center justify-center align-middle m-auto'>
      {!doneSetup ? <Setup joinRoom={joinRoom} loading={loading} setLoading={setLoading} showJoinError={showJoinError} /> : 
      <MessageBox sendMessage={sendMessage} handleMessage={handleMessage} typingUsers={typingUsers}/>}
    </div>
  );
}

export default App;
