import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";


function UserIcon(){
    return(
        <div className="statusContainerDiv">
            <div>
                <div className="imageAndStatus">
                    <img className="icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOzfYPaLIvUyXadENQul27Z4R2Nuc2nuhDHHLbF8eATKEYN4SjdUoZIlWpkH9Ov4Mryc&usqp=CAU" />
                    <img className="online" src="https://i.postimg.cc/g2y6mgW9/offline.png" />
                </div>
            </div>
        </div>
    )
}

export default UserIcon