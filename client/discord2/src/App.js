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

  const [user, setUser] = useState(null)
  const [friendsInfo, setFriendsInfo] = useState(null)

  const cookies = new Cookies()
  const socket = io.connect("http://localhost:5000")

  useEffect(() =>{
    let token = cookies.get('token')
    if(token){
      let decoded = jwtDecode(token)
      if(decoded){
        socket.emit("requestUserData", decoded)
        socket.emit("requestFriendsData", decoded)
        socket.emit("setStatus", decoded, "online")
      }

    }
  }, [])


  socket.on('receiveUserData', (dbData)=>{
    console.log(dbData);
    setUser(dbData);
  })
  socket.on("receiveFriendsData", (data) => {
    console.log(data);
    setFriendsInfo(data);
  })

  return (
    <div className="App">
      { user ? <Main 

        user={user} 
        socket={socket} 
        friendsInfo={friendsInfo}
        setFriendsInfo={setFriendsInfo}
      
      /> : <LoginOrRegister 

        socket={socket}
        setUser={setUser}

      /> }
    </div>
  );
}

export default App;
