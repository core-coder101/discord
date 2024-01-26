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
        friendsInfo,
        setFriendsInfo,
        messages,
        setMessages,
    } = props

    const [profileIconClicked, setProfileIconClicked] = useState(false)
    const [messageInput, setMessageInput] = useState("")

    useEffect(() =>{
        socket.emit("getMessages", selectedFriend, user)
    }, [])

    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    function convertIntoTimeZone(utcDateString){
        let utcDate = new Date(utcDateString)
        let timeZoneDate = new Date(utcDate.toLocaleString("en-us", { timeZone: userTimeZone }))
        return timeZoneDate;
    }

    socket.on("receiveMessages", (data)=>{
        console.log("receiveMessages", data);
        const formattedMessages = data.map((message) => {
            const formattedMessage = { ...message }
            formattedMessage.date = convertIntoTimeZone(message.date)
            return formattedMessage
        })
        console.log("formattedMessages", formattedMessages);
        setMessages(formattedMessages)
    })



    // socket.on(user.email, (messageData) => {
    //     console.log(messages);
    //     if(messages && (messages.length > 0) && !(messageData.date == messages[0].date)){
    //         console.log("messageData.date: ", messageData.date);
    //         console.log("messages[0].date: ",messages[0].date);
    //         setMessages((prevValue) => {
    //             return [
    //                 messageData,
    //                 ...prevValue,
    //             ]
    //         })
    //     } else{
    //         return;
    //     }
    // })

    // const [lastMSG, setLastMSG] = useState({})

    // useEffect(()=>{
    //     if(messages && (messages.length > 0) && !(lastMSG == messages[0])){
    //         console.log("inside if");
    //         setMessages((prevValue) => (
    //             {
    //                 lastMSG,
    //                 ...prevValue,
    //             }
    //         ))
    //         return;
    //     } else{
    //         return;
    //     }
    // }, [lastMSG, messages])

    socket.on(user.email, (messageData) => {
        console.log(messageData);
        if(!(messageData.senderEmail == user.email) && !(messageData.senderEmail == selectedFriend.email)){
            return;
        }
        let messageDate = convertIntoTimeZone(messageData.date)
        setMessages(prev => {
            if(prev && (prev.length > 0) && (prev[0].date.toLocaleString() == messageDate.toLocaleString())){
                return prev;
            } else {

                let formattedMessageData = { ...messageData }
                formattedMessageData.date = convertIntoTimeZone(formattedMessageData.date)

                return [
                    formattedMessageData,
                    ...prev,
                ]
            }
        })

        setFriendsInfo((prev) => {
             let filteredFriend = prev.filter((friend) => {
                return ( (friend.email == messageData.senderEmail) || (friend.email == messageData.receiverEmail))
            })
            console.log("filteredFriend: ", filteredFriend);
            let filteredArray = prev.filter((friend) => {
                return !( (friend.email == messageData.senderEmail) || (friend.email == messageData.receiverEmail))
            })
            console.log("filteredArray: ", filteredArray);
            let finalArray = [
                ...filteredFriend,
                ...filteredArray,
            ]
            console.log("Updating friendsInfo: ", finalArray);
            return finalArray
        })

    })

    function handleKeyDown(e){
        if(e.key === "Enter" && e.shiftKey){
            return;
        }
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault()
            socket.emit("sendMessage", messageInput, user, selectedFriend)
            setMessageInput("")
        }
    }

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
                    if(!(index == messages.length - 1)){
                        let prevMessage = messages[index + 1]
                        let prevDate = prevMessage.date.getDate()
                        let prevTime = prevMessage.date.getTime()
                        let prevHours = prevMessage.date.getHours()
                        let prevMinutes = prevMessage.date.getMinutes()
                        let prevSeconds = prevMessage.date.getSeconds()
                        let currentDate = message.date.getDate()
                        let currentTime = message.date.getTime()
                        let currentHours = message.date.getHours()
                        let currentMinutes = message.date.getMinutes()
                        let currentSeconds = message.date.getSeconds()
                        if(!(prevDate == currentDate)){
                            return <>
                            <Message 
                                key={index}
                                id={index}
                                selectedFriend={selectedFriend} 
                                user={user} 
                                message={message}
                                currentDate={message.date}
                                currentHours={currentHours}
                                currentMinutes={currentMinutes} 
                                />
                            <DateSeperator currentDate={message.date} />    
                            </>
                        }
                        if(message.senderEmail == prevMessage.senderEmail && prevDate == currentDate && prevHours == currentHours && parseInt(currentMinutes) - parseInt(prevMinutes) < 2 && parseInt(currentSeconds) - parseInt(prevSeconds) < 31){
                            return <RecentMessage currentHours={currentHours} currentMinutes={currentMinutes} selectedFriend={selectedFriend} user={user} message={message} />
                        }
                        return <Message
                                key={index}
                                id={index} 
                                selectedFriend={selectedFriend} 
                                user={user} 
                                message={message}
                                currentDate={message.date}
                                currentHours={currentHours}
                                currentMinutes={currentMinutes} />
                    } else {
                        let currentDate = message.date.getDate()
                        let currentTime = message.date.getTime()                        
                        let currentHours = message.date.getHours()
                        let currentMinutes = message.date.getMinutes()
                        let currentSeconds = message.date.getSeconds()
                        return <Message 
                                key={index}
                                id={index}
                                selectedFriend={selectedFriend}
                                user={user}
                                message={message}
                                currentDate={message.date}
                                currentHours={currentHours}
                                currentMinutes={currentMinutes}
                                />
                    }
                    
                })}

            </div>
                <div className="MessageInputDiv">
                    <div>
                        <IoMdAddCircle className="ChattingIcons mx-1" color="white" />
                    </div>
                    <textarea 
                        value={messageInput}
                        onKeyDown={handleKeyDown}
                        placeholder={"Message @" + selectedFriend.displayName}
                        onChange={(e)=>{ setMessageInput(e.target.value) }}
                    />
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