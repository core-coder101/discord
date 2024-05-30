import React, { useEffect, useState } from "react";
import ActiveNow from "./ActiveNow";

function AddFriend(props){
    let {
        socket,
        user,
        friendsInfo,
    } = props

    const [inputValue, setInputValue] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [customClass, setCustomClass] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        if(inputValue === user.userName){
            setErrorMessage("Sadly you can't friend yourself -_-")
            return;
        }
        let filtered = []
        filtered = friendsInfo.filter((friend)=>{
            return friend.userName === inputValue
        })
        if(filtered.length > 0){
            setErrorMessage("Alredy friends with that user")
            return;
        }
        socket.emit("sendFriendRequest", inputValue, user)
    }
    useEffect(()=>{
        setErrorMessage("")
        setSuccessMessage("")
        if(inputValue === ""){
            setDisabled(true)
            setCustomClass("disabledButton")
        } else{
            setDisabled(false)
            setCustomClass("")
        }
    }, [inputValue])
    
    socket.on("friendRequestError", (errorMessage)=>{
        setErrorMessage(errorMessage)
        setSuccessMessage("")
    })

    socket.on("friendRequestSuccess", (message)=>{
        setErrorMessage("")
        setSuccessMessage(message)
    })

    return (
        <div className="AddFriendMainDiv">
            <div className="AddFriendDiv">
                <div className="AddFriendInnerDiv">
                    <h6>ADD FRIEND</h6>
                    <p>You can add friends with their Discord username.</p>
                    <form onSubmit={(e)=>{handleSubmit(e)}}>
                    <div className="AddFriendInputDiv">
                        <input value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} type="text" required placeholder="You can add friends with their Discord username." />
                        <button className={customClass} disabled={disabled}>Send Friend Request</button>
                    </div>
                    {errorMessage && <p className="AddFriendError">{errorMessage}</p>}
                    {successMessage && <p className="AddFriendSuccess">{successMessage}</p>}
                    </form>
                </div>
            </div>
            
            <ActiveNow />
        </div>
    )
}

export default AddFriend