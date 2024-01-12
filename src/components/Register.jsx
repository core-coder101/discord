import React from "react";

function Register(props){

    let {
        setSelectedPage
    } = props

    return(
        <div className="LoginMainDiv">
            <div className="FormAreaOuterDiv">
                <div className="RegisterDiv">
                    <h4>Create an account</h4>
                    <div className="FormDiv">
                        <h6>EMAIL </h6>
                        <input />
                        <h6>DISPLAY NAME</h6>
                        <input />
                        <h6>USERNAME</h6>
                        <input />
                        <h6>PASSWORD <spann style={{color:"red"}}>*</spann></h6>
                        <a href="">Forgot your password?</a>
                        <button>Log in</button>
                        <div>
                            <p>Need an account?</p>
                            <button className="loginRegisterLinks" onClick={()=>{setSelectedPage('login')}} href="">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register