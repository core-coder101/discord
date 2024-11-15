import React from "react";
import ActiveNow from "./ActiveNow";
import OnlineFriend from "./OnlineFriend";

function Online(props){
    let {
        friendsInfo,
        socket,
        setSelectedFriend,
        message,
    } = props

    console.log(friendsInfo);
    let onlineFriends = []
    if(friendsInfo && friendsInfo.length > 0){
    onlineFriends = friendsInfo.filter((friend) => {
        return friend.status == "online"
    })}

    return(
        <div className="AddFriendMainDiv">
            <div className="PendingDiv">
                {onlineFriends.length > 0 ? 
                    <>
                    <div className="Pending">
                        <h6>{message} - {onlineFriends.length}</h6>
                    </div>
                    {onlineFriends.map((friend)=>{
                        return <OnlineFriend 
                        socket={socket}
                        friend={friend}
                        setSelectedFriend={setSelectedFriend}
                        />
                    })}
                    </> : <div className="onlinefriendsdiv"> <p>There is no one online right now. . .</p>
                    </div>}
            </div>
            <ActiveNow />
        </div>
    )
}

export default Online