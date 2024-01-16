import React, { useState } from "react";
import ServerIcon from "./ServerIcon";
import { FaDiscord } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { RiDownloadLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import FriendProfile from "./FriendProfile";
import Friend from "./Friend";
import UserIcon from './UserIcon'
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";







function Friends(props){

    let {
        user
    } = props

    // for scrollbar
    const [scrollbarVisibility, setScrollbarVisibility] = useState("")

    return(
        <div
        className="friendsAndServersDiv ">
            <div className="serversDiv col-3">
            <div className="iconOutsideDiv">
                <div className="selectedIconHighlight">
                </div>
                <div className="directMessagesIconDiv">
                    <FaDiscord className="directMessagesIcon" color="white" />
                </div>           
            </div>
            <div>
                <div className="iconSeperator">   
                </div>
            </div>
            
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />
            <ServerIcon />

            <div>
                <div className="iconSeperator">   
                </div>
            </div>

            <div className="iconOutsideDiv">
                <div className="selectedIconHighlight">
                </div>
                <div className="sideBarIconsDiv addServerIcon">
                    <IoMdAdd className="sideBarIcons" color="#23A559" />
                </div>           
            </div>
            <div className="iconOutsideDiv">
                <div className="selectedIconHighlight">
                </div>
                <div className="sideBarIconsDiv exploreServers">
                    <MdExplore className="sideBarIcons" color="#23A559" />
                </div> 
            </div>
            <div>
                <div className="iconSeperator">   
                </div>
            </div>
            <div className="iconOutsideDiv">
                <div className="selectedIconHighlight">
                </div>
                <div className="sideBarIconsDiv downloadAppIcon">
                    <RiDownloadLine className="sideBarIcons" color="#23A559" />
                </div> 
            </div>
        </div>
        <div
        onMouseEnter={() => {setScrollbarVisibility("")}}
        onMouseLeave={() => {setScrollbarVisibility("scrollbarDisappear")}}
        className={"friendsMainDiv col-10 " + scrollbarVisibility}>
            <div className="findConversationOuterDiv">
                <div className="findConversation">
                    <p>Find or start a conversation</p>
                </div>
            </div>
            <div className="SideBarPanels">
                <div>
                    <IoPerson className="sideBarIcons" color="#949BA4" />
                </div>
                <h6>Friends</h6>
            </div>
            <div className="SideBarPanels">
                <div>
                    <IoPerson className="sideBarIcons" color="#949BA4" />
                </div>
                <h6>Nitro</h6>
            </div>
            <div className="SideBarPanels">
                <div>
                    <MdEmail className="sideBarIcons" color="#949BA4" />
                </div>
                <h6>Message Requests</h6>
            </div>
            <div className="SideBarPanels">
                <div>
                    <FaShop className="sideBarIcons" color="#949BA4" />
                </div>
                <h6>Shop</h6>
            </div>
            <div className="directMessages">
                <p>Direct Messages</p>
                <IoMdAdd color="#949BA4" />
            </div>
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <div className="selfStatus">
                <div className="selfStatusInfoDiv">
                    <UserIcon />
                    <div className="selfInfo">
                        <h6>{user.displayName}</h6>
                        <p>Online</p>
                    </div>
                </div>
                <div className="selfStatusIconsDiv">
                    <div className="selfStatusIconsInnerDiv">
                        <FaMicrophoneSlash className="selfStatusIcons" color="red" />
                    </div>
                    <div className="selfStatusIconsInnerDiv">
                        <FaHeadphones className="selfStatusIcons" color="white" />
                    </div>
                    <div className="selfStatusIconsInnerDiv">
                        <FaGear className="selfStatusIcons" color="white" />
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Friends