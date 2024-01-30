import React, { useEffect, useState } from "react";

function FriendsScreenButton(props){
    let {
        text,
        selectedButton,
        setSelectedButton,
    } = props

    const [customClass, setCustomClass] = useState("")

    useEffect(()=>{
        if(selectedButton === text){
            setCustomClass("FriendsButtonDivHIGHLIGHTED")
        } else {
            setCustomClass("")
        }
    }, [selectedButton, text])

    return (
        <div onClick={()=>{setSelectedButton(text)}} className={"FriendsButtonDiv " + customClass}>
            <div>
                <h6 className="FriendsScreenButton">{text}</h6>
            </div>
        </div>
    )

}

// FriendsButtonDivHIGHLIGHTED

export default FriendsScreenButton