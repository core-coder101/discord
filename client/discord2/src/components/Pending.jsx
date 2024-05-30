import React from "react";
import ActiveNow from "./ActiveNow";
import FriendRequest from "./FriendRequest";

function Pending(props){
    let {
        friendRequests,
        setFriendRequests,
        user,
        socket,
    } = props

    return(
        <div className="AddFriendMainDiv pendingMainDiv">
            <div className="PendingDiv">
                {friendRequests.length > 0 ? <>
                <div className="Pending">
                    <h6>PENDING-{friendRequests.length}</h6>
                </div>
                {friendRequests.map((request)=>{
                    return <FriendRequest socket={socket} setFriendRequests={setFriendRequests} user={user} request={request} />
                })}
                </> :
                <div className="OnlineFriendsDiv">
                    <p>There are no pending requests right now. . .</p>
                </div>}

            </div>
            <ActiveNow />
        </div>
    )

}

export default Pending