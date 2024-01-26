import React from "react";
import UserIcon from "./UserIcon";

function Friend(props){

    let {
        setSelectedFriend,
        friend,
        setMessages,
        handleReset,
        selectedFriend
    } = props

    let highlight = ""
    if(friend.email == selectedFriend.email){
        highlight = "FriendHighlight"
    }

    return(
        <div onClick={()=>{
            setSelectedFriend(friend)
            handleReset()
        }} className={"Friend " + highlight}>
            <UserIcon user={friend} />
            <p>{friend.displayName}</p>
        </div>
    )
}

export default Friend