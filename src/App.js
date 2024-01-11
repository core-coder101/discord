import React from "react";
import Main from "./components/Main";
import Login from "./components/Login";

let user = true
document.addEventListener('contextmenu',event => {
  if(event.button === 2){
    // event.preventDefault()
  }
}, false)

function App() {
  return (
    <div className="App">
      { user ? <Main /> : <Login /> }
    </div>
  );
}

export default App;
