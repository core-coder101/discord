import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { TbMessageCirclePlus } from "react-icons/tb";
import { RiInbox2Fill } from "react-icons/ri";
import { FaQuestionCircle } from "react-icons/fa";
import FriendsScreenButton from "./FriendsScreenButton"
import AddFriend from "./AddFriend";
import Online from "./Online";
import Pending from "./Pending";

function FriendsScreen(props){

    let {
        selectedFriend,
        socket,
        user,
        friendsInfo,
        friendRequests,
        setFriendRequests,
    } = props

    const [selectedButton,setSelectedButton] = useState("Online")

    return(
        <div className="FriendsScreenDiv">
            <div className="FriendsScreenFixedTopSection">
                <div className="FriendsScreenIconsDiv">
                    <div className="Friends">
                        <div>
                            <IoPerson className="ChattingIcons" color="#949BA4" />
                        </div>
                        <h6 style={{color:"white"}}>Friends</h6>
                    </div>
                    <div className="seperatorDiv">
                        <div className="seperator"></div>
                    </div>
                    <FriendsScreenButton 
                        text="Online"
                        selectedButton={selectedButton}
                        setSelectedButton={setSelectedButton}
                    />
                    <FriendsScreenButton 
                        text="All"
                        selectedButton={selectedButton}
                        setSelectedButton={setSelectedButton}
                    />
                    <FriendsScreenButton 
                        text="Pending"
                        selectedButton={selectedButton}
                        setSelectedButton={setSelectedButton}
                    />
                    <FriendsScreenButton 
                        text="Blocked"
                        selectedButton={selectedButton}
                        setSelectedButton={setSelectedButton}
                    />
                    <div onClick={()=>{setSelectedButton("Add Friend")}} className="addFriendButtonDiv">
                        <h6>Add Friend</h6>
                    </div>
                </div>
                <div className="RightIconsDiv">
                    <div>
                        <TbMessageCirclePlus className="ChattingIcons" color="#949BA4" fill="#949BA4" />
                    </div>
                    <div className="seperatorDiv">
                        <div className="seperator rightSeperator"></div>
                    </div>
                    <div>
                        <RiInbox2Fill className="ChattingIcons" color="#949BA4" />
                    </div>
                    <div>
                        <FaQuestionCircle className="ChattingIcons" color="#949BA4" />
                    </div>
                </div>
            </div>
            {selectedButton == "Add Friend" && <AddFriend
                socket={socket}
                user={user}
                friendsInfo={friendsInfo}
            />}
            {selectedButton == "Online" && <Online />}
            {selectedButton == "Pending" && <Pending 
                friendRequests={friendRequests}
                setFriendRequests={setFriendRequests}
                user={user}
                socket={socket}
            />}
            </div>
    )
}

export default FriendsScreen

// light grey color: #949BA4