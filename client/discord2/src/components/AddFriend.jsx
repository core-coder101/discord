import React, { useEffect, useState } from "react";
import ActiveNow from "./ActiveNow";

function AddFriend(props){
    let {
        socket,
        user,
        friendsInfo,
    } = props

    const [inputvalue, setInputValue] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [customClass, setCustomClass] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        if(inputvalue === user.userName){
            setErrorMessage("Sadly you can't friend yourself -_-")
            return;
        }
        let filtered = []
        filtered = friendsInfo.filter((friend)=>{
            return friend.userName === inputvalue
        })
        if(filtered.length > 0){
            setErrorMessage("Alredy friends with that user")
            return;
        }
        socket.emit("sendFriendRequest", inputvalue, user)
    }
    useEffect(()=>{
        setErrorMessage("")
        if(inputvalue === ""){
            setDisabled(true)
            setCustomClass("disabledButton")
        } else{
            setDisabled(false)
            setCustomClass("")
        }
    }, [inputvalue])
    

    return (
        <div className="AddFriendMainDiv">
            <div className="AddFriendDiv">
                <div className="AddFriendInnerDiv">
                    <h6>ADD FRIEND</h6>
                    <p>You can add friends with their Discord username.</p>
                    <form onSubmit={(e)=>{handleSubmit(e)}}>
                    <div className="AddFriendInputDiv">
                        <input onChange={(e)=>{setInputValue(e.target.value)}} type="text" required placeholder="You can add friends with their Discord username." />
                        <button className={customClass} disabled={disabled}>Send Friend Request</button>
                    </div>
                    {errorMessage && <p className="AddFriendError">{errorMessage}</p>}
                    </form>
                </div>
            </div>
            
            <ActiveNow />
        </div>
    )
}

export default AddFriend