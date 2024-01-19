import React from "react";

function Friend(props){

    let {
        setSelectedFriend
    } = props

    return(
        <div onClick={()=>{setSelectedFriend('Steve')}} className="Friend">
            <div className="FriendImgStatus">
                    <img className="icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOzfYPaLIvUyXadENQul27Z4R2Nuc2nuhDHHLbF8eATKEYN4SjdUoZIlWpkH9Ov4Mryc&usqp=CAU" />
                    <img className="online" src="https://i.postimg.cc/g2y6mgW9/offline.png" />
                </div>
            <p>Steve</p>
        </div>
    )
}

export default Friend