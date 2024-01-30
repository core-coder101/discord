import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import FriendsScreenButton from "./FriendsScreenButton"

function FriendsScreen(props){

    let {
        selectedFriend,
    } = props

    const [highlight, setHighlight] = useState("")
    const [color, setColor] = useState("")

    return(
        <div className="FriendsScreenDiv">
            <div className="fixedTopSection">
                <div className="Friends">
                    <div>
                        <IoPerson className="ChattingIcons" color="#949BA4" />
                    </div>
                    <h6 style={{color:"white"}}>Friends</h6>
                </div>
                <div className="seperator">

                </div>
                <FriendsScreenButton 
                    text="Online"
                />
                <FriendsScreenButton 
                    text="All"
                />
                <FriendsScreenButton 
                    text="Pending"
                />
                <FriendsScreenButton 
                    text="Blocked"
                />
                <div className="addFriendDiv">
                    <h6>Add Friend</h6>
                </div>
            </div>
        </div>
    )
}

export default FriendsScreen

// light grey color: #949BA4