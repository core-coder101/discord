import React, { useEffect, useState } from "react";
import FriendProfile from "./FriendProfile";
import UserIcon from "./UserIcon";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { BsAlphabet, BsFillPinAngleFill } from "react-icons/bs";
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
        convertIntoTimeZone,
        userTimeZone,
    } = props

    const [profileIconClicked, setProfileIconClicked] = useState(false)
    const [messageInput, setMessageInput] = useState("")
    const [emojiToggle, setEmojiToggle] = useState(false)

    useEffect(() =>{
        socket.emit("getMessages", selectedFriend, user)
        document.getElementById('messageTextArea').focus()
    }, [])

    useEffect(()=>{
        function handleKeyPress(event){
            document.getElementById('messageTextArea').focus()
        }

        document.addEventListener("keypress", handleKeyPress)
        

        return () => {
            document.removeEventListener("keypress", handleKeyPress)
        }
    }, [])

    socket.on("receiveMessages", (data)=>{
        const formattedMessages = data.map((message) => {
            const formattedMessage = { ...message }
            formattedMessage.date = convertIntoTimeZone(message.date)
            return formattedMessage
        })
        setMessages(formattedMessages)
    })

    

    function handleKeyDown(e){
        if(e.key === "Enter" && e.shiftKey){
            return;
        }
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault()
            if(messageInput == ""){
                return;
            }
            let lettersAndNumbersExpression = /^[A-Za-z0-9]*$/
            let specialSymbolsExpression = /[!@#$%^&*(),.?":{}|<>]/
            let allowedCharactersExpression = /^[\x20-\x7E]*$/;
            if(!allowedCharactersExpression.test(messageInput)){
                return;
            } else {
            socket.emit("sendMessage", messageInput, user, selectedFriend)
            setMessageInput("")
            }
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
                        let prevHours = prevMessage.date.getHours()
                        let prevMinutes = prevMessage.date.getMinutes()
                        let prevSeconds = prevMessage.date.getSeconds()
                        let currentDate = message.date.getDate()
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
                        let currentHours = message.date.getHours()
                        let currentMinutes = message.date.getMinutes()
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
                    <textarea id = "messageTextArea"
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
                    <div onClick={()=>{setEmojiToggle(prev => !prev)}}>
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