import React, { useState } from "react";

function Login(props){

    let {
        setSelectedPage,
        socket,
        setUser
    } = props

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    function handleChange(event){
        let { name, value } = event.target
        setFormData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function loginUser(){
        socket.emit("loginUser", formData)
    }

    return(
        <div className="LoginMainDiv">
            <div className="FormAreaOuterDiv">
                <div className="WelcomeDiv">
                    <h5>Welcome back!</h5>
                    <p>We're so excited to see you again!</p>
                    <div className="FormDiv">
                        <h6>EMAIL OR PHONE NUMBER <span style={{color:"red"}}>*</span></h6>
                        <input value={formData.email} name="email" onChange={(e)=>{handleChange(e)}} />
                        <h6>PASSWORD <span style={{color:"red"}}>*</span></h6>
                        <input value={formData.password} type="password" name="password" onChange={(e)=>{handleChange(e)}} />
                        <a href="">Forgot your password?</a>
                        <button onClick={loginUser}>Log in</button>
                        <div>
                            <p>Need an account?</p>
                            <button className="loginRegisterLinks" onClick={()=>{setSelectedPage('register')}} href="">Register</button>
                        </div>
                    </div>
                </div>
                    
                <div className="QRCodeOuterDiv">
                    <img src="https://e7.pngegg.com/pngimages/240/21/png-clipart-qr-code-barcode-scanners-business-cards-others-angle-text.png" />
                    <h4>Log in with QR Code</h4>
                    <p>Scan this with the <span style={{fontWeight: "bold"}}>Discord mobile app</span> to log in instantly.</p>
                </div>
            </div>
        </div>
    )
}

export default Login