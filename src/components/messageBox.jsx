import { useRef, useEffect, useState } from 'react'
import { useContextProvider } from '../context'
import { IoMdSend } from "react-icons/io";

const MessageBox = ( {sendMessage, handleMessage, typingUsers}) => {
    const {message, username, setMessage, messageThread} = useContextProvider();
    const messageThreadRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
      const container = messageThreadRef.current;
      if (container) {
        setIsOverflowing(container.scrollHeight > container.clientHeight);
      }
    }, [messageThreadRef]);

    const scrollToBottom = () => {
        if (messageThreadRef.current) {
            messageThreadRef.current.scrollTop = messageThreadRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    });

    useEffect(() => {
        var typingAlert = '';
        if (typingUsers.length === 1) {
            typingAlert = `${typingUsers[0]} is typing . . .)`;
        }
        else if (typingUsers.length === 2) {
            typingAlert = `${typingUsers[0]} and ${typingUsers[1]} are typing . . .)`;
        } else {
            typingAlert = `${typingUsers[0]} and ${typingUsers.length - 1} others are typing . . .)`
        }
    },[typingUsers]);

    let previousUsername = null;

    return (
    <div className='flex flex-col font-pop items-start bg-white justify-center content-start rounded-lg overflow-hidden shadow-lg p-5 m-5 w-[800px] h-[800px] resize-y'>
        <div className='w-full p-2 font-bold rounded-lg bg-gray-200'>
            Chat Engagement : {username}
        </div>
        <div className='p-2 border rounded-md overflow-scroll flex flex-col w-full my-2 h-full justify-start'>
            <div id='container' className={`overflow-scroll flex flex-col overflow-y-scroll h-full`} ref={messageThreadRef}>
                {!messageThread ? (
                    <div>NO messages</div>
                    ) : (
                    messageThread.map((data, index) => {
                        const renderUsername = previousUsername !== data.username;
                        previousUsername = data.username;

                        // Check data type
                        if (data.type === 'system') {
                        return (
                            <div key={index} className='text-center my-1 font-[400] text-gray-800 text-sm'>
                            {data.message}
                            </div>
                        );
                        } else if (data.type === 'message') {
                        return (
                            <div key={index} className={username === data.username ? 'p-2 flex flex-col self-end content-end items-end rounded-xl w-3/4 my-[-0.6vh]' : 'p-2 my-[-0.6vh] rounded-xl w-3/4'}>
                            {renderUsername && (
                                <div className='text-xs mt-3 p-0.5 mx-1 text-gray-700'>
                                {username === data.username ? 'You' : data.username}
                                </div>
                            )}
                            <div className={username === data.username ? 'rounded-xl p-2 px-3 w-fit bg-blue-600 text-white text-wrap overflow-clip font-light' : 'rounded-xl p-2 px-3 w-fit font-light bg-gray-300 text-wrap overflow-clip'}>
                                {data.message}
                                <div className={`${username !== data.username ? 'text-gray-700' : 'text-gray-300'} text-xs text-right ml-2 mt-2`}>
                                {data.dateTime}
                                </div>
                            </div>
                            </div>
                        );
                        }
                    })
                    )}

{typingUsers.length > 0 && 
    <div className='flex h-5 justify-self-stretch animate-pulse mt-2'>
        <div className='text-sm text-gray-500 rounded-lg w- p-1'>
            {typingUsers.length > 0 ? (
                <>
                    {typingUsers.filter(user => user !== username).slice(0, 3).map((user, index) => (
                        <span key={index}>
                            {index > 0 && ', '}
                            {user} 
                        </span>
                    ))}
                    {typingUsers.length > 3 ? (
                        <>
                            {`, and ${typingUsers.length - 3} other${typingUsers.length - 3 > 1 ? 's' : ''}`}
                        </>
                    ) : (
                        ''
                    )}
                    {typingUsers.length > 1 ? (
                        <>
                            {' '}
                            <span>are typing .   .   .</span>
                        </>
                    ) : (
                        <>
                            {' '}
                            <span>is typing .   .   .</span>
                        </>
                    )}
                </>
                
            ) : (
                'No one is typing'
            )}
        </div>
    </div>
}

    </div>
    </div>
    <div className="flex flex-row justify-between w-full my-1 ">
        <textarea className='w-full min-h-[6vh] max-h-[10vh] p-2 align-top break-normal rounded-lg mr-2 border resize-y' 
        value={message} 
        onChange={handleMessage} 
        placeholder='Type a message . . .' 
        onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); 
                sendMessage();
            }
        }} />
        <button className='cursor font-bold border-black rounded-md hover:bg-slate-200 active:opacity-5 transition-all'  
        onClick={sendMessage}>
            <IoMdSend className='text-4xl text-center text-blue-700' />
        </button>
    </div>
    </div>)
}

export default MessageBox;