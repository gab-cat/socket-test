import { useRef, useEffect } from 'react'
import { useContextProvider } from '../context'
import { IoMdSend } from "react-icons/io";

const MessageBox = ( {sendMessage}) => {
    const {message, username, setMessage, messageThread} = useContextProvider();
    const messageThreadRef = useRef(null);

    const scrollToBottom = () => {
        if (messageThreadRef.current) {
            messageThreadRef.current.scrollTop = messageThreadRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    });

    return (
    <div className='flex flex-col grow items-start bg-white  justify-center content-start rounded-lg shadow-lg p-5 m-5 w-[600px] h-[600px]'>
        <div className='w-full p-2 font-bold rounded-lg bg-gray-200'>
            Chat Engagement
        </div>
        <div ref={messageThreadRef}  className='p-2 wrap border rounded-md overflow-auto flex flex-col w-full my-2 h-full '>
            {!messageThread ? <div>NO message</div> : messageThread.map((data, index) => (
            <div key={index} className={username === data.username ? 'p-2 flex flex-col self-end content-end items-end rounded-lg w-3/4' : 'p-2 rounded-lg w-3/4'}>
                <div className='text-xs px-1 text-gray-700'>{username === data.username ? 'You' : data.username}</div>
                <div className={username === data.username ? 'rounded-lg p-2 w-fit bg-blue-600 text-white text-wrap overflow-clip' : 'rounded-lg p-2 w-fit bg-gray-300 text-wrap overflow-clip'}>{data.message}
                    <div className={`${username !== data.username ? 'text-gray-700' : 'text-gray-300'} text-xs text-right mx-2 mt-2`}>
                        {data.dateTime}
                    </div>
                </div>
         </div>
            ))}
        </div>
    <div className="flex flex-row justify-between w-full my-1 ">
        <textarea className='w-full min-h-[6vh] max-h-[10vh] p-2 align-top break-normal rounded-lg mr-2 border resize-y' 
        value={message} 
        onChange={(e) => {setMessage(e.target.value)}} 
        placeholder='Message' 
        onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); 
                sendMessage();
            }
        }} />
        <button className='cursor font-bold border-black rounded-md hover:bg-slate-400 active:opacity-5 transition-all'  
        onClick={sendMessage}>
            <IoMdSend className='text-3xl text-blue-700' />
        </button>
    </div>
    </div>)
}

export default MessageBox;