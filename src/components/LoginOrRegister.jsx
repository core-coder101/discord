import React, { useState } from "react";
import Login from "./Login";
import Register from './Register'

function LoginOrRegister(){
    const [selectedPage, setSelectedPage] = useState('login')

    function changeSelectedPage(page){
        setSelectedPage(page)
    }

    return(
        selectedPage == 'login' ? <Login 
        setSelectedPage={setSelectedPage} 
        /> : <Register 
        setSelectedPage={setSelectedPage}
        />
    )
}

export default LoginOrRegister