import React from "react";
import UserIcon from "./UserIcon";

function Friend(props){

    let {
        setSelectedFriend,
        friend,
        setMessages,
        handleReset,
        selectedFriend,
        setFriendsInfo,
        socket,
        user
    } = props

    let highlight = ""
    let unReadHighlight = ""
    if(friend.email == selectedFriend.email){
        highlight = "FriendHighlight"
    }
    if(friend.unRead){
        unReadHighlight = "unReadHighlight"
    }

    return(
        <div onClick={async ()=>{
            
            handleReset()
            setSelectedFriend(prev => (friend))
            setFriendsInfo((prev) => {
                return prev.map((entry) => {
                    if(entry.email == friend.email){
                        return {
                            ...entry,
                            unRead: 0
                        }
                    } else {
                        return entry
                    }
                })
            })
            socket.emit("markAsRead", friend.email, user.email)

        }} className={"Friend " + highlight + " " + unReadHighlight}>
            <UserIcon user={friend} />
            <p>{friend.displayName}</p>
        </div>
    )
}

export default Friend