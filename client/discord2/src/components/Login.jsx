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

    const [loginError, setLoginError] = useState('')

    socket.on('loginError', (errorMessage) => {
        setLoginError(errorMessage)
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

    function handleSubmit(e){
        e.preventDefault()
        loginUser()
    }

    return(
        <div className="LoginMainDiv">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div className="FormAreaOuterDiv">
                <div className="WelcomeDiv">
                    <h5>Welcome back!</h5>
                    <p>We're so excited to see you again!</p>
                    <div className="FormDiv">
                        <h6>EMAIL OR PHONE NUMBER <span style={{color:"red"}}>*</span></h6>
                        <input type="email" errorMessage="Test" value={formData.email} name="email" onChange={(e)=>{handleChange(e)}} required />
                        <h6>PASSWORD <span style={{color:"red"}}>*</span></h6>
                        <input value={formData.password} type="password" name="password" onChange={(e)=>{handleChange(e)}} required />
                        {loginError && (
                            <div className="errorDiv">
                                <p>{loginError}</p>
                            </div>)}
                        <a href="">Forgot your password?</a>
                        <button type="submit">Log in</button>
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
            </form>
        </div>
    )
}

export default Login