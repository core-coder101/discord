import React from "react";
import ActiveNow from "./ActiveNow";

function Online(props){
    let {
        
    } = props

    return(
        <div className="AddFriendMainDiv">
            <div className="OnlineFriendsDiv">
                <p>There is no one online right now. . .</p>
            </div>
            <ActiveNow />
        </div>
    )
}

export default Online