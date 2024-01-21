import React, { useEffect, useState } from "react";
import FriendProfile from "./FriendProfile";
import UserIcon from "./UserIcon";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { BsFillPinAngleFill } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import { RiInbox2Fill } from "react-icons/ri";
import { FaQuestionCircle } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FaGift } from "react-icons/fa";
import { PiGifFill } from "react-icons/pi";
import { LuSticker } from "react-icons/lu";
import { FaSmile } from "react-icons/fa";
import Friend from "./Friend";
import Message from "./Message"
import DateSeperator from "./DateSeperator";
import RecentMessage from "./RecentMessage";

function Chat(props){

    let {
        selectedFriend,
        socket,
        user,
        friendsInfo
    } = props

    const [profileIconClicked, setProfileIconClicked] = useState(false)
    const [messages, setMessages] = useState([])

    useEffect(() =>{
        socket.emit("getMessages", selectedFriend, user)
    }, [])

    socket.on("receiveMessages", (data)=>{
        console.log(data);
        setMessages(data)
    })

    return(
        <div className="mainChatDiv">
            <div className="fixedTopSection">
                <div className="Friend highlight ">
                    <UserIcon 
                        isOnline={true}
                        user={selectedFriend}
                    />
                    <div className="pDiv">
                        <p>{selectedFriend.displayName}</p>
                    </div>
                </div>
                <div className="ChattingIconsDiv">
                    <div>
                        <BiSolidPhoneCall className="ChattingIcons" color="white" />
                    </div>
                    <div>
                        <FaVideo className="ChattingIcons" color="white" />
                    </div>
                    <div>
                        <BsFillPinAngleFill className="ChattingIcons" color="white" />
                    </div>
                    <div>
                        <IoPersonAddSharp className="ChattingIcons" color="white" />
                    </div>
                    <div>
                        <IoPersonCircle onClick={()=> setProfileIconClicked(prevValue => !prevValue)} className="ChattingIcons" fill="white" />
                    </div>
                    <input placeholder="Search" />
                    <div>
                        <RiInbox2Fill className="ChattingIcons" color="white" />
                    </div>
                    <div>
                        <FaQuestionCircle className="ChattingIcons" color="white" />
                    </div>
                </div>
            </div>
            <div className="ChatArea">
            <div className="OuterDiv">
            <div className="messagesDiv">
                {/* <RecentMessage />
                <Message />
                <DateSeperator /> */}
                {messages && messages.length > 0 && messages.map((message, index) => {
                    if(!index == 0){
                        let prevMessage = messages[index - 1]
                        let [prevDate, prevTime] = prevMessage.date.split("T")
                        let [currentDate, currentTime] = message.date.split("T")
                        let [prevHours,prevMinutes, prevSeconds] = prevTime.split(":")
                        let [currentHours,currentMinutes, currentSeconds] = currentTime.split(":")
                        if(!(prevDate == currentDate)){
                            <DateSeperator currentDate />
                        }
                        if(message.senderEmail == prevMessage.senderEmail && prevDate == currentDate && prevHours == currentHours && parseInt(currentMinutes) - parseInt(prevMinutes) < 2 && parseInt(currentSeconds) - parseInt(prevSeconds) < 31){
                            console.log("true")
                            return <RecentMessage selectedFriend={selectedFriend} user={user} message={message} />
                        }
                    }
                    return <Message 
                    selectedFriend={selectedFriend} 
                    user={user} 
                    message={message}
                    currentDate={currentDate}
                    currentHours={currentHours}
                    currentMinutes={currentMinutes} />
                })}

            </div>
                <div className="MessageInputDiv">
                    <div>
                        <IoMdAddCircle className="ChattingIcons mx-1" color="white" />
                    </div>
                    <textarea placeholder="Message @Ahmad" />
                    <div>
                        <FaGift className="ChattingIcons" color="white" />
                    </div>
                    <div>
                        <PiGifFill className="ChattingIcons" color="white" />
                    </div>
                    <div>
                        <LuSticker className="ChattingIcons" color="white" />
                    </div>
                    <div>
                        <FaSmile className="ChattingIcons" color="white" />
                    </div>
                </div>
                
                </div>
                {profileIconClicked && <FriendProfile user={selectedFriend} />}
                
            </div>
            
        </div>
    )
}

export default Chat