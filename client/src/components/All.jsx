import React from "react";
import OnlineFriend from "./OnlineFriend";
import ActiveNow from "./ActiveNow";

function All({friendsInfo, socket, setSelectedFriend, message}){

    return(
        <div className="AddFriendMainDiv">
            <div className="PendingDiv">
                {friendsInfo.length > 0 ? 
                    <>
                    <div className="Pending">
                        <h6>{message} - {friendsInfo.length}</h6>
                    </div>
                    {friendsInfo.map((friend)=>{
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

export default All