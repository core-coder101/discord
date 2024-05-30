import React, { useEffect, useState } from "react";
import Friends from './Friends'
import Chat from "./Chat";
import FriendsScreen from "./FriendsScreen"

function Main(props){

    const [selectedFriend, setSelectedFriend] = useState({email: ""})
    const [messages, setMessages] = useState([])
    const [friendRequests, setFriendRequests] = useState([])

    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let {
        user,
        friendsInfo,
        setFriendsInfo,
        socket,
    } = props

    // useEffect(()=>{
    //     socket.emit("joinRoom", user.email)
    // }, [])

    useEffect(()=>{
        console.log("getFriendRequests");
        socket.emit("getFriendRequests", user.userName)
    }, [])
    
    socket.on("receiveFriendRequests", (dbData)=>{
        console.log("received friend requests: ", dbData);
        setFriendRequests(dbData)
    })
    let eventName = ("removeFriendRequest" + user.userName)

    socket.on(eventName, (request)=>{
        setFriendRequests((prev) => {

            if(prev && prev.length == 0){
                return prev
            }

            return prev.filter(entry => {
                return !(entry.senderUserName == request.senderUserName && entry.receiverUserName == request.receiverUserName)
            })
        })
    })

    let receiveRequestEvent = ("friendRequest" + user.userName)

    socket.on(receiveRequestEvent, (data)=>{
        setFriendRequests(prev => {
            if(prev.length == 0){
                return [ data ]
            }



            if(data.senderUserName == prev[prev.length - 1].senderUserName && data.receiverUserName == prev[prev.length - 1].receiverUserName){
                return prev
            } else {
                return [
                    data,
                    ...prev,
                ]
            }
        })
    })

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

    // selectedFriend && (selectedFriend.email == "" || selectedFriend.email) && friendsInfo && friendsInfo.length > 0 && socket.on(user.email, (messageData) => {
    //     console.log(messageData);
    //     console.log(selectedFriend);
    //     console.log(!(messageData.senderEmail == user.email) && !(messageData.senderEmail == selectedFriend.email));

    //     if(!(messageData.senderEmail === user.email) && !(messageData.senderEmail === selectedFriend.email)){
    //         // message IS NOT from the opened chat so we 
    //         // check if its from one of our friends
    //         let filteredFriendArray = friendsInfo.filter((friend) => {
    //             return messageData.senderEmail == friend.email
    //         })
    //         if(filteredFriendArray.length == 0){
    //             // message isn't from one of our friends so we return
    //             return;
    //         }
    //         // message IS from one of our friends but their chat is not opened
    //         // so we FIRST CHECK IF ITS A REPETITIVE MESSAGE THEN show a notif on the friend icon
    //         setPrevMessage((prev) => {
    //             console.log("prev: ", prev);
    //             console.log("messageData: ", messageData);
    //             if(!messageData){
    //                 return prev
    //             }
    //             if(prev.date == messageData.date){
    //                 return prev;
    //             } else {
    //             console.log(filteredFriendArray);
    //             let [senderFriend] = filteredFriendArray
    //             // socket.emit("markAsUnRead", senderFriend.email, user.email)
    //             setFriendsInfo((prev) => {
    //                 return prev.map((entry)=>{
    //                     if(entry.email == senderFriend.email){
    //                         return {
    //                             ...entry,
    //                             unRead: (entry.unRead + 1)
    //                         }
    //                     } else {
    //                         return entry
    //                     }
    //                 })
    //             })
    //             ping.play()
    //             return messageData
    //             }
    //         })

            

    //     } else {
    //     // message IS from the opened chat
    //     socket.emit("markAsRead", user.email, messageData.receiverEmail)
    //     let messageDate = convertIntoTimeZone(messageData.date)
    //     setMessages(prev => {
    //         if(prev && (prev.length > 0) && (prev[0].date.toLocaleString() == messageDate.toLocaleString())){
    //             return prev;
    //         } else {

    //             let formattedMessageData = { ...messageData }
    //             formattedMessageData.date = convertIntoTimeZone(formattedMessageData.date)

    //             return [
    //                 formattedMessageData,
    //                 ...prev,
    //             ]
    //         }
    //     })

    //     setFriendsInfo((prev) => {
    //          let filteredFriend = prev.filter((friend) => {
    //             return ( (friend.email == messageData.senderEmail) || (friend.email == messageData.receiverEmail))
    //         })
    //         console.log("filteredFriend: ", filteredFriend);
    //         let filteredArray = prev.filter((friend) => {
    //             return !( (friend.email == messageData.senderEmail) || (friend.email == messageData.receiverEmail))
    //         })
    //         console.log("filteredArray: ", filteredArray);
    //         let finalArray = [
    //             ...filteredFriend,
    //             ...filteredArray,
    //         ]
    //         console.log("Updating friendsInfo: ", finalArray);
    //         return finalArray
    //     })
    //     }
    // })

    useEffect(() => {
        if (selectedFriend && friendsInfo && friendsInfo.length > 0) {
            const handleMessage = (messageData) => {
                console.log(messageData);
                console.log(selectedFriend);
                console.log(!(messageData.senderEmail === user.email) && !(messageData.senderEmail === selectedFriend.email));
    
                if (!(messageData.senderEmail === user.email) && !(messageData.senderEmail === selectedFriend.email)) {
                    // Message is not from the opened chat
                    let filteredFriendArray = friendsInfo.filter((friend) => {
                        return messageData.senderEmail === friend.email;
                    });
                    if (filteredFriendArray.length === 0) {
                        // Message isn't from one of our friends
                        return;
                    }
                    // Message is from one of our friends but their chat is not opened
                    setPrevMessage((prev) => {
                        if (!messageData) {
                            return prev;
                        }
                        if (prev.date === messageData.date) {
                            return prev;
                        } else {
                            let [senderFriend] = filteredFriendArray;
                            setFriendsInfo((prev) => {
                                return prev.map((entry) => {
                                    if (entry.email === senderFriend.email) {
                                        return {
                                            ...entry,
                                            unRead: (entry.unRead + 1)
                                        };
                                    } else {
                                        return entry;
                                    }
                                });
                            });
                            ping.play();
                            return messageData;
                        }
                    });
                } else {
                    // Message is from the opened chat
                    socket.emit("markAsRead", user.email, messageData.receiverEmail);
                    let messageDate = convertIntoTimeZone(messageData.date);
                    setMessages((prev) => {
                        if (prev && prev.length > 0 && prev[0].date.toLocaleString() === messageDate.toLocaleString()) {
                            return prev;
                        } else {
                            let formattedMessageData = { ...messageData };
                            formattedMessageData.date = convertIntoTimeZone(formattedMessageData.date);
                            return [formattedMessageData, ...prev];
                        }
                    });
    
                    setFriendsInfo((prev) => {
                        let filteredFriend = prev.filter((friend) => {
                            return (friend.email === messageData.senderEmail || friend.email === messageData.receiverEmail);
                        });
                        let filteredArray = prev.filter((friend) => {
                            return !(friend.email === messageData.senderEmail || friend.email === messageData.receiverEmail);
                        });
                        let finalArray = [...filteredFriend, ...filteredArray];
                        return finalArray;
                    });
                }
            };
    
            socket.on(user.email, handleMessage);
    
            return () => {
                socket.off(user.email, handleMessage);
            };
        }
    }, [selectedFriend, friendsInfo, socket, user.email]);
    
    

    socket.on("addFriend" + user.email, (friend) => {
        setFriendsInfo(prev => {
            if(friend.email == prev[0].email){
                return prev
            } else {
                return [friend, ...prev]
            }
        })
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
            {selectedFriend.email ? (<Chat 
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
                socket={socket}
                selectedFriend={selectedFriend}
                user={user}
                friendsInfo={friendsInfo}
                friendRequests={friendRequests}
                setFriendRequests={setFriendRequests}
            />}
        </div>
    )
}

export default Main