import React from "react";
import { FaDiscord } from "react-icons/fa";

function unRead(props){

    let {
        friend,
        setSelectedFriend,
        setFriendsInfo,
        socket,
        user,
    } = props

    let customStyles = {
        marginTop: "8px",
        backgroundColor: friend.color
    }

    return(
        <div onClick={()=> {
            setSelectedFriend(friend)
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

            }} className="iconOutsideDiv UnReadOuterDiv">
            <div className="selectedIconHighlight">
            </div>
            <div>
            <div style={customStyles} className="directMessagesIconDiv">
                <FaDiscord className="directMessagesIcon" color="white" />
            </div>
            </div>
            <div>
            <div className="unReadCounter">
                <p className="Counter">{friend.unRead}</p>
            </div>
            </div>  
        </div>
    )
}

export default unRead