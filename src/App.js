import React from "react";
import Main from "./components/Main";
import LoginOrRegister from "./components/LoginOrRegister";

let user = false
document.addEventListener('contextmenu',event => {
  if(event.button === 2){
    // event.preventDefault()
  }
}, false)

function App() {
  return (
    <div className="App">
      { user ? <Main /> : <LoginOrRegister /> }
    </div>
  );
}

export default App;
