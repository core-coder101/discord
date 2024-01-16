import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import LoginOrRegister from "./components/LoginOrRegister";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

document.addEventListener('contextmenu',event => {
  if(event.button === 2){
    // event.preventDefault()
  }
}, false)

function App() {

  const cookies = new Cookies

  useEffect(() =>{
    let token = cookies.get('token')
    if(token){
      let decoded = jwtDecode(token)
      console.log(decoded);
      setUser(decoded)
    }
  }, [])  

  const [user, setUser] = useState(null)

  return (
    <div className="App">
      { user ? <Main user={user} /> : <LoginOrRegister setUser={setUser} /> }
    </div>
  );
}

export default App;
