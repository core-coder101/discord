import React, { useState } from "react";
import Login from "./Login";
import Register from './Register'
import { io } from "socket.io-client";
import Cookies from "universal-cookie"
import {jwtDecode} from "jwt-decode"

function LoginOrRegister(props){
    const [selectedPage, setSelectedPage] = useState('login')

    let {setUser} = props


    const socket = io.connect("http://localhost:5000")

    const cookies = new Cookies()

    socket.on("createToken", (token, cookieOptions)=>{

        cookies.set("token", token,)
        let decoded = jwtDecode(token)
        setUser(decoded)
    })

    

    function changeSelectedPage(page){
        setSelectedPage(page)
    }

    return(
        selectedPage == 'login' ? <Login 
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