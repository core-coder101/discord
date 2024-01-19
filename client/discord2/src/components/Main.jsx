import React, { useState } from "react";
import Friends from './Friends'
import Chat from "./Chat";
import EmptyScreen from "./EmptyScreen"

function Main(props){

    const [selectedFriend, setSelectedFriend] = useState('')

    let {
        user
    } = props

    return(
        <div className="mainDiv">
            <Friends user={user} setSelectedFriend={setSelectedFriend} />
            {selectedFriend ? (<Chat user={user} />) : <EmptyScreen />}
        </div>
    )
}

export default Main