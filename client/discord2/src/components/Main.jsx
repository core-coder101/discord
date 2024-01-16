import React from "react";
import Friends from './Friends'
import Chat from "./Chat";

function Main(props){

    let {
        user
    } = props

    return(
        <div className="mainDiv">
            <Friends user={user} />
            <Chat user={user} />
        </div>
    )
}

export default Main