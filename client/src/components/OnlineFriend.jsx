import React, { useState } from "react";
import UserIcon from "./UserIcon";
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import { IoMdMore } from "react-icons/io";



function OnlineFriend({socket, friend, setSelectedFriend}){



    const [iconBackgroundColor, setIconBackgroundColor] = useState("#2B2D31")
    const [display, setDisplay] = useState("none")
    let outgoing

    return (
        <div onMouseEnter={()=>{setIconBackgroundColor("#1E1F22"); setDisplay("block")}} onMouseLeave={()=>{setIconBackgroundColor("#2B2D31"); setDisplay("none")}} className="RequestDiv" onClick={() => {
            setSelectedFriend(friend)
        }}>
            <div className="requestInfo">
                <UserIcon user={friend} />
                <div>
                    <div className="friendRequestInfo">
                        <h6>{friend.displayName}</h6>
                        <p style={{display: display}}>{friend.userName}</p>
                    </div>
                    <p>{friend.status}</p>
                </div>
            </div>
            <div className="friendRequestIconsDiv">
            {outgoing ? 
            <div style={{backgroundColor: iconBackgroundColor}} className="requestIconDiv" onClick={
                ()=>{
                    socket.emit("removeRequest", friend)
                }
            } >
                    <IoMdMore className="requestIcon OnlineIconHover" />
            </div> :
            <>
                <div style={{backgroundColor: iconBackgroundColor}} className="requestIconDiv">
                    <IoMdMore className="requestIcon OnlineIconHover" onClick={()=>{}} />
                </div>
                <div style={{backgroundColor: iconBackgroundColor}} className="requestIconDiv" onClick={
                    ()=>{
                        setSelectedFriend(friend)
                    }
                } >
                    <HiMiniChatBubbleOvalLeft style={{height:"20px"}} className="requestIcon OnlineIconHover" />
                </div>
            </>
            }
            </div>
        </div>)
}

export default OnlineFriend