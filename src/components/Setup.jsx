import React from "react";
import { useContextProvider } from "../context";

const Setup = () => {

    const {room, setRoom, username, setUsername, setDoneSetup} = useContextProvider();

    const handleClick = () => {
        setRoom(room)
        setUsername(username)
        setDoneSetup(true)

        const message = `Room: ${room}, and Username: ${username}`
        alert(message);
    }

    return (
        <div className="flex flex-col align-middle content-center justify-center p-5 m-auto bg-slate-100 rounded-lg shadow-lg">
            <h1 className='text-3xl font-bold m-2'>  Socket Test</h1>
            <div className="flex justify-between my-1">
                <div>Room :</div>
                <input value={room} onChange={(e) => {setRoom(e.target.value)}} type="text" className="bg-white indent-3" placeholder="Enter room"/>
            </div>
            <div className="flex justify-between my-1">
                <div className="mr-1">Username :</div>
                <input value={username} onChange={(e) => {setUsername(e.target.value)}} type="text" className="bg-white indent-3" placeholder="Enter username"/>
            </div>
            <button onClick={handleClick} className="mt-3 font-bold text-white bg-cyan-400 rounded-md shadow-md">Join a Room</button>
        </div>
    )
}

export default Setup;