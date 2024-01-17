import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import LoginOrRegister from "./components/LoginOrRegister";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client"

document.addEventListener('contextmenu',event => {
  if(event.button === 2){
    // event.preventDefault()
  }
}, false)

function App() {

  const cookies = new Cookies
  const socket = io.connect("http://localhost:5000")

  useEffect(() =>{
    let token = cookies.get('token')
    if(token){
      let decoded = jwtDecode(token)
      socket.emit("requestData", decoded)
      // console.log(decoded);
      // setUser(decoded)
    }
  }, [])  

  const [user, setUser] = useState(null)

  return (
    <div className="App">
      { user ? <Main user={user} socket={socket} /> : <LoginOrRegister socket={socket} setUser={setUser} /> }
    </div>
  );
}

export default App;
