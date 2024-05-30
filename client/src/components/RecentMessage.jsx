import React, { useState } from "react";

function RecentMessage(props){

    let {
        selectedFriend,
        user,
        message,
        currentHours,
        currentMinutes,
    } = props

    let timeUnit = "AM"
    let timeMessage

    if(currentHours > 12){
        timeUnit = "PM"
        currentHours = parseInt(currentHours) - 12
    }
    if(parseInt(currentMinutes) < 10){
        currentMinutes = '0' + currentMinutes.toString()
    }
    if(parseInt(currentHours) < 10){
        currentHours = '0' + currentHours.toString()
    }

    timeMessage = currentHours + ":" + currentMinutes + " " + timeUnit

    const [timeDisplay, setTimeDisplay] = useState('transparent')

    return(
        <div onMouseEnter={()=>setTimeDisplay('')} onMouseLeave={()=>setTimeDisplay('transparent')} className="MessageMainDiv recentMessageDiv">
                    <div className="recentMessageTimeDiv">
                    <p className={"time recentMessageTime " + timeDisplay}>{timeMessage}</p>
                    </div>
                <p className="messageBody recentMsgBody">{message.message}</p>
        </div>
    )
}

export default RecentMessage