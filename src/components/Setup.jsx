import React from "react";

const Setup = () => {

    return (
        <div className="flex flex-col align-middle content-center justify-center h-[250px] w-[350px] p-5 m-5 bg-slate-400 rounded-lg shadow-lg">
            <h1 className='text-3xl font-bold my-3'>  Socket Test</h1>
            <div className="flex justify-between">
                <div>Room :</div>
                <input type="text" className="bg-white indent-3"/>
            </div>
            <div className="flex justify-between">
                <div>Username :</div>
                <input type="text" className="bg-white indent-3"/>
            </div>
            <button>Join a Room</button>
        </div>
    )
}

export default Setup;