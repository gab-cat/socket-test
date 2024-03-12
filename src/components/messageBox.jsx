import react from 'react'
import { useContextProvider } from '../context'

const MessageBox = ( {sendMessage}) => {
    const {message, setMessage} = useContextProvider();

    return (
    <div className="flex flex-row justify-center align-center items-center p-10 m-5">
        <input className='w-[500px] border indent-5' type="text" value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder='message' />
        <button className='cursor border border-black rounded-md' onClick={sendMessage}>Send Message</button>
    </div>)
}

export default MessageBox;