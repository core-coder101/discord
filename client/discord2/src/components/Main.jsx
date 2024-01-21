import React, { useState } from "react";
import Friends from './Friends'
import Chat from "./Chat";
import EmptyScreen from "./EmptyScreen"

function Main(props){

    const [selectedFriend, setSelectedFriend] = useState('')

    let {
        user,
        friendsInfo,
        setFriendsInfo,
        socket,
    } = props

    
    friendsInfo && friendsInfo.length > 0 && socket.on("friendStatusChange", (friendEmail, status) => {
        if(friendEmail !== user.email){
        console.log("friendStatusChange");
        setFriendsInfo((prevValue) => {
            return prevValue.map((value) => {
                if(value.email === friendEmail){
                    return {
                        ...value,
                        status: status,
                    }
                } else {
                    return value
                }
            })
        })
        setSelectedFriend((prevValue) => {
                if(prevValue.email === friendEmail){
                    return {
                        ...prevValue,
                        status: status
                    }
                } else {
                    return prevValue
                }
        })
    }})

    

    return(
        <div className="mainDiv">
            <Friends 
                user={user} 
                setSelectedFriend={setSelectedFriend} 
                friendsInfo={friendsInfo}
                socket={socket}
            />
            {selectedFriend ? (<Chat 
                user={user}
                selectedFriend={selectedFriend}
                friendsInfo={friendsInfo}
                socket={socket}
            />) : <EmptyScreen />}
        </div>
    )
}

export default Main