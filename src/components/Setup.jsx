import { useEffect, useState } from "react";
import { useContextProvider } from "../context";
import {Input} from "@nextui-org/react";
import { CgSpinner } from "react-icons/cg";
import Cookies from "universal-cookie";


const Setup = ({joinRoom, loading, setLoading, showJoinError}) => {
    const cookies = new Cookies();
    const {room, setRoom, username, setUsername } = useContextProvider();
    const [showError, setShowError] = useState(false);
    const loginError = 'Please input a username and room to join.';
    const joinError = `Join room error: Username ${username} is already taken, please try another.`
    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = () => {
        if (!room || !username) {
            setShowError(true)
            setErrorMessage(loginError)
            return;
        }
        setShowError(false)

        setLoading(true);
        setRoom(room)
        setUsername(username)
        joinRoom();
    }

    useEffect(() => {
        if (showJoinError)
        {
            setShowError(true)
            setErrorMessage(joinError)
            return;
        }
    },[showJoinError])

    return (
        <div className="flex flex-col w-[400px] align-middle content-center justify-center p-5 m-auto bg-slate-100 rounded-lg shadow-lg">
            <h1 className='text-3xl font-bold m-4'>  Socket Test</h1>
            <div className="w-[300px] flex flex-col justify-center content-center mx-auto">
                <div className="flex my-1 justify-between">
                    <div className="text-left">Room :</div>
                    <input value={room} disabled={loading}  onChange={(e) => {setRoom(e.target.value)}} type="text" className="bg-white indent-3 border rounded-md" 
                    placeholder="Enter room"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleClick();
                        }
                    }}
                    />
                </div>
                <div className="flex my-1 justify-between">
                    <div className="mr-1">Username :</div>
                    <input value={username} onChange={(e) => {setUsername(e.target.value)}} type="text" className="bg-white indent-3 border rounded-md" 
                    placeholder="Enter username"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleClick();
                        }
                    }}
                    disabled={loading} 
                    />
                </div>
            </div>
            <button onClick={handleClick} 
                    disabled={loading} 
                    className={`mt-5 p-1 font-bold text-white rounded-lg max-w-25 shadow-md 
                    ${loading ? 'bg-cyan-900' : 'bg-cyan-700'} 
                    ${loading ? '' : 'hover:opacity-75 hover:transition-all'}`}>
                {loading ? <CgSpinner className="text-2xl text-center animate-spin m-auto"/> : 'Join a Room' }
            </button>
            { showError && <div className="text-red-500 text-center italic mt-5   ">
                {errorMessage}
            </div>}
        </div>
    )
}

export default Setup;