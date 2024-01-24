import React from "react";
import UserIcon from "./UserIcon";

function Message(props){

    let {
        selectedFriend,
        user,
        message,
        currentHours,
        currentMinutes,
        currentDate,
    } = props

    let timeUnit = "AM"
    let timeMessage = ""
    let year = currentDate.getFullYear()
    let month = currentDate.getMonth()
    let day = currentDate.getDate()
    let date = new Date()
    let today = date.getDate()

    let sender = user
    let receiver

    if(user.email == message.senderEmail){
        sender = user
        receiver = selectedFriend
    } else {
        sender = selectedFriend
        receiver = user
    }
    
    if(parseInt(currentHours) > 12){
        timeUnit = "PM"
        currentHours = parseInt(currentHours) - 12
    }
    if(day == today){
        timeMessage = "Today at " + currentHours + ":" + currentMinutes+" " + timeUnit
    } else if(day == today - 1){
        timeMessage = "Yesterday at " + currentHours+ ":" + currentMinutes+" " + timeUnit
    } else {
        timeMessage = day + "/" + month + "/" + year + " " + currentHours + ":" + currentMinutes + " " + timeUnit
    }

    return(
        <div className="MessageMainDiv">
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOzfYPaLIvUyXadENQul27Z4R2Nuc2nuhDHHLbF8eATKEYN4SjdUoZIlWpkH9Ov4Mryc&usqp=CAU" /> */}
            <UserIcon user={sender} />
            <div>
                <div>
                    <h6>{sender.displayName}</h6>
                    <p className="time">{timeMessage}</p>
                </div>
                <p className="messageBody">{message.message}</p>
            </div>
        </div>
    )
}

export default Message