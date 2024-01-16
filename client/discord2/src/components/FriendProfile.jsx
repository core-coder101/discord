import React from "react";

function FriendProfile(){
    return(
        <div className="FriendProfileDiv">
            <div>
                <div className="FriendProfileImageDiv">
                    <div>
                        <div className="imageAndStatus">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOzfYPaLIvUyXadENQul27Z4R2Nuc2nuhDHHLbF8eATKEYN4SjdUoZIlWpkH9Ov4Mryc&usqp=CAU" />
                            <img className="online" src="https://i.postimg.cc/g2y6mgW9/offline.png" />
                        </div>
                    </div>
                </div>


                <div className="FriendInfoDiv">
                    <div>
                        <h4>Steve</h4>
                        <p>Steve#1234</p>
                    </div>
                    <div>
                        <h6>DISCORD MEMBER SINCE</h6>
                        <p>January 5, 2024</p>
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