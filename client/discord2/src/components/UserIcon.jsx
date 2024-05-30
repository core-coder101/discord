import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";


function UserIcon(props){

    let {
        user
    } = props

    return(
        <div className="statusContainerDiv">
            <div>
                <div className="imageAndStatus">
                    {user.photoURL ?
                    (<img className="icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOzfYPaLIvUyXadENQul27Z4R2Nuc2nuhDHHLbF8eATKEYN4SjdUoZIlWpkH9Ov4Mryc&usqp=CAU" />) 
                    :
                    (<div className="customUserIcon" style={{backgroundColor: user.color}}>
                        <FaDiscord className="userIcon" color="white" />
                    </div>)}
                    { user.status ?
                    user.status == 'online' ? <img className="online" src="https://i.postimg.cc/pXqvD8RN/online.png" /> : <img className="offline" src="https://i.postimg.cc/g2y6mgW9/offline.png" />
                    : null }
                </div>
            </div>
        </div>
    )
}

// offline: https://i.postimg.cc/g2y6mgW9/offline.png
// online: https://i.postimg.cc/pXqvD8RN/online.png

export default UserIcon