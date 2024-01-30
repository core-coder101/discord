import React, { useEffect, useState } from "react";
import Friends from './Friends'
import Chat from "./Chat";
import FriendsScreen from "./FriendsScreen"

function Main(props){

    const [selectedFriend, setSelectedFriend] = useState('')
    const [messages, setMessages] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [unreadMessages, setUnreadMessages] = useState([])

    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let {
        user,
        friendsInfo,
        setFriendsInfo,
        socket,
    } = props

    
    friendsInfo && friendsInfo.length > 0 && socket.on("friendStatusChange", (friendEmail, status) => {
        if(friendEmail !== user.email){
        console.log("friendStatusChange");
        setFriendsInfo((prevValue) => {
            return prevValue.map((value) => {
                if(value.email === friendEmail){
                    return {
                        ...value,
                        status: status,
                    }
                } else {
                    return value
                }
            })
        })
        setSelectedFriend((prevValue) => {
                if(prevValue.email === friendEmail){
                    return {
                        ...prevValue,
                        status: status
                    }
                } else {
                    return prevValue
                }
        })
    }})

    const [resetKey, setResetKey] = useState(0)

    function handleReset(){
        setResetKey(prev => prev + 1)
    }
    
    function convertIntoTimeZone(utcDateString){
        let utcDate = new Date(utcDateString)
        let timeZoneDate = new Date(utcDate.toLocaleString("en-us", { timeZone: userTimeZone }))
        return timeZoneDate;
    }

    const [prevMessage, setPrevMessage] = useState({})
    const ping = new Audio("https://mingosounds.com/wp-content/uploads/2021/10/discord-ping-sound.mp3")

    friendsInfo && friendsInfo.length > 0 && socket.on(user.email, (messageData) => {
        console.log(messageData);
        if(!(messageData.senderEmail == user.email) && !(messageData.senderEmail == selectedFriend.email)){
            // message IS NOT from the opened chat so we 
            // check if its from one of our friends
            let filteredFriendArray = friendsInfo.filter((friend) => {
                return messageData.senderEmail == friend.email
            })
            if(filteredFriendArray.length == 0){
                // message isn't from one of our friends so we return
                return;
            }
            // message IS from one of our friends but their chat is not opened
            // so we FIRST CHECK IF ITS A REPETITIVE MESSAGE THEN show a notif on the friend icon
            setPrevMessage((prev) => {
                if(prev && prev.date == messageData.date){
                    console.log("TRUE");
                    return prev;
                }
                console.log(filteredFriendArray);
                let [senderFriend] = filteredFriendArray
                console.log("senderFriend: ", senderFriend);
                // socket.emit("markAsUnRead", senderFriend.email, user.email)
                setFriendsInfo((prev) => {
                    return prev.map((entry)=>{
                        if(entry.email == senderFriend.email){
                            return {
                                ...entry,
                                unRead: (entry.unRead + 1)
                            }
                        } else {
                            return entry
                        }
                    })
                })
                ping.play()
                return messageData
            })

            

        } else {
        // message IS from the opened chat
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
        }
    })

    return(
        <div className="mainDiv">
            <Friends 
                user={user} 
                setSelectedFriend={setSelectedFriend}
                selectedFriend={selectedFriend}
                friendsInfo={friendsInfo}
                socket={socket}
                setMessages={setMessages}
                handleReset={handleReset}
                setFriendsInfo={setFriendsInfo}
            />
            {selectedFriend ? (<Chat 
                user={user}
                selectedFriend={selectedFriend}
                friendsInfo={friendsInfo}
                setFriendsInfo={setFriendsInfo}
                socket={socket}
                messages={messages}
                setMessages={setMessages}
                key={resetKey}
                convertIntoTimeZone={convertIntoTimeZone}
                userTimeZone={userTimeZone}
            />) : <FriendsScreen 
                selectedFriend={selectedFriend}
            />}
        </div>
    )
}

export default Main