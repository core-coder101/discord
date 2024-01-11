import React from "react";
import Friends from './Friends'
import Chat from "./Chat";

function Main(){
    return(
        <div className="mainDiv">
            <Friends />
            <Chat />
        </div>
    )
}

export default Main