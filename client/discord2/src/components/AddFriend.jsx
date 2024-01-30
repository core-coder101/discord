import React from "react";

function AddFriend(props){
    let {
        
    } = props

    return (
        <div className="AddFriendMainDiv">
            <div className="AddFriendDiv">
                <div>
                    <h3>ADD FRIEND</h3>
                    <p>You can add friends with their Discord username.</p>
                    <input placeholder="You can add friends with their Discord username." />
                    <button>Send Friend Request</button>
                </div>
            </div>
            
            <div className="ActiveNowDiv">

            </div>
        </div>
    )
}

export default AddFriend