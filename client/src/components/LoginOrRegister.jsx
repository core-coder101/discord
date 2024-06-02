import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from './Register'
import Cookies from "universal-cookie"
import {jwtDecode} from "jwt-decode"

function LoginOrRegister(props){
    const [selectedPage, setSelectedPage] = useState('login')

    let {setUser, socket} = props


    

    const cookies = new Cookies()

    useEffect(()=> {
        function handleCreateToken(token, cookieOptions){

            cookies.set("token", token,)
            let decoded = jwtDecode(token)
            if(decoded){
                socket.emit("requestUserData", decoded)
                socket.emit("requestFriendsData", decoded)
                socket.emit("setStatus", decoded, "online")
            }
        }
        socket.on("createToken", handleCreateToken)
        return () => {socket.off("createToken", handleCreateToken)}
    }, [])


    return(
        selectedPage === 'login' ? <Login 
            socket={socket}
            setUser={setUser}
            setSelectedPage={setSelectedPage} 
        /> : <Register 
            socket={socket}
            setUser={setUser}
            setSelectedPage={setSelectedPage}
        />
    )
}

export default LoginOrRegister