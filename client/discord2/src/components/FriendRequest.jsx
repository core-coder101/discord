import React, { useState } from "react";
import UserIcon from "./UserIcon";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

function FriendRequest(props){
    let {
        request,
        user,
        setFriendRequests,
        socket,
    } = props

    console.log(request);

    const [iconBackgroundColor, setIconBackgroundColor] = useState("#2B2D31")
    const [display, setDisplay] = useState("none")

    let message = ""
    let outgoing

    if(request.senderUserName == user.userName){
        message = "Outgoing Friend Request"
        outgoing = true
    } else{
        message = "Incoming Friend Request"
        outgoing = false
    }

    return(
        <div onMouseEnter={()=>{setIconBackgroundColor("#1E1F22"); setDisplay("block")}} onMouseLeave={()=>{setIconBackgroundColor("#2B2D31"); setDisplay("none")}} className="RequestDiv">
            <div className="requestInfo">
                <UserIcon user={request} />
                <div>
                    <div className="friendRequestInfo">
                        <h6>{request.displayName}</h6>
                        <p style={{display: display}}>{outgoing ? request.receiverUserName : request.senderUserName}</p>
                    </div>
                    <p>{message}</p>
                </div>
            </div>
            <div className="friendRequestIconsDiv">
            {outgoing ? 
            <div style={{backgroundColor: iconBackgroundColor}} className="requestIconDiv" onClick={
                ()=>{
                    socket.emit("removeRequest", request)
                }
            } >
                    <IoCloseSharp className="requestIcon cross" />
            </div> :
            <>
                <div style={{backgroundColor: iconBackgroundColor}} className="requestIconDiv">
                    <IoCloseSharp className="requestIcon cross" onClick={
                    ()=>{
                    socket.emit("removeRequest", request)
                    }
                    } />
                </div>
                <div style={{backgroundColor: iconBackgroundColor}} className="requestIconDiv" onClick={
                    ()=>{
                        socket.emit("acceptRequest", request, user)
                        socket.emit("removeRequest", request)
                    }
                } >
                    <FaCheck style={{height:"20px"}} className="requestIcon tick" />
                </div>
            </>
            }
            </div>
        </div>
    )
}

export default FriendRequest