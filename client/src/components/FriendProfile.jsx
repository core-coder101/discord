import React from "react";
import { FaDiscord } from "react-icons/fa";

function FriendProfile(props){

    let {
        user
    } = props

    let createdAt = new Date(user.createdAt)
    let year = createdAt.getFullYear()
    let date = createdAt.getDate()
    let monthNumber = createdAt.getMonth()
    let monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let month = monthsArr[monthNumber]

    let dateString = month + " " + date + ", " + year

    return(
        <div className="FriendProfileDiv">
            <div>
                <div style={ { backgroundColor: (user.color) } } className="FriendProfileImageDiv">
                    <div>
                        <div className="imageAndStatus">
                            { user.photoURL ? 
                            <img src= {user.photoURL} />
                            :
                            <div className="customUserIcon friendProfileUserIconDiv" style={{backgroundColor: user.color}}>
                                <FaDiscord className="userIcon friendProfileIcon" color="white" />
                            </div>}
                            {/* <img className="online friendProfileStatus" src="https://i.postimg.cc/pXqvD8RN/online.png" /> */}
                            { user.status == 'online' ? <img className="online friendProfileStatus" src="https://i.postimg.cc/pXqvD8RN/online.png" /> : <img className="offline friendProfileStatus" src="https://i.postimg.cc/g2y6mgW9/offline.png" /> }
                        </div>
                    </div>
                </div>


                <div className="FriendInfoDiv">
                    <div>
                        <h4>{user.displayName}</h4>
                        <p>{user.userName}</p>
                    </div>
                    <div>
                        <h6>MEMBER SINCE</h6>
                        <p>{dateString}</p>
                    </div>
                    <div className="NoteDiv">
                        <h6>Note</h6>
                        <input placeholder="Click to Add a note" />
                    </div>
                </div>
                <div className="FriendInfoDiv MutualFriendsDiv">
                    <div className="NoteDiv">
                    </div>
                </div>
            </div>
        </div>
    )
}

// offline: https://i.postimg.cc/g2y6mgW9/offline.png
// online: https://i.postimg.cc/pXqvD8RN/online.png

export default FriendProfile