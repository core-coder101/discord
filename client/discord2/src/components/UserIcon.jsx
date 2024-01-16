import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";


function UserIcon(){
    return(
        <div className="statusContainerDiv">
            <div className="cropped-ofp">
                <img src='https://static1-es.millenium.gg/articles/7/24/77/7/@/115335-tsushima-article_m-1.jpg'></img>
            </div>
            <div className="outerStatusDiv">
                <div className="statusOnline">
                    <div className="">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserIcon