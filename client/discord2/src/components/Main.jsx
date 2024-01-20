import React, { useState } from "react";
import Friends from './Friends'
import Chat from "./Chat";
import EmptyScreen from "./EmptyScreen"

function Main(props){

    const [selectedFriend, setSelectedFriend] = useState('')

    let {
        user,
        friendsInfo
    } = props

    return(
        <div className="mainDiv">
            <Friends 
                user={user} 
                setSelectedFriend={setSelectedFriend} 
                friendsInfo={friendsInfo}
            />
            {selectedFriend ? (<Chat selectedFriend={selectedFriend} />) : <EmptyScreen />}
        </div>
    )
}

export default Main