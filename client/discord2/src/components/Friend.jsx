import React from "react";
import UserIcon from "./UserIcon";

function Friend(props){

    let {
        setSelectedFriend,
        friend,
        setMessages,
        handleReset,
    } = props

    return(
        <div onClick={()=>{
            setSelectedFriend(friend)
            handleReset()
        }} className="Friend">
            <UserIcon user={friend} />
            <p>{friend.displayName}</p>
        </div>
    )
}

export default Friend