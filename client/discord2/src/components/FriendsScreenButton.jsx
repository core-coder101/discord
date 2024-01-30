import React, { useState } from "react";

function FriendsScreenButton(props){
    let {
        text,
    } = props

    const [color, setColor] = useState("#949BA4")

    return (
        <div onMouseEnter={()=>setColor("#DBDEE1")} onMouseLeave={()=>setColor("#949BA4")} className="FriendsButtonDiv">
            <div>
                <h6 style={{color: color}} className="FriendsScreenButton">{text}</h6>
            </div>
        </div>
    )

}

// FriendsButtonDivHIGHLIGHTED

export default FriendsScreenButton