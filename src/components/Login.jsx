import React from "react";

function Login(props){

    let {
        setSelectedPage
    } = props

    return(
        <div className="LoginMainDiv">
            <div className="FormAreaOuterDiv">
                <div className="WelcomeDiv">
                    <h5>Welcome back!</h5>
                    <p>We're so excited to see you again!</p>
                    <div className="FormDiv">
                        <h6>EMAIL OR PHONE NUMBER <spann style={{color:"red"}}>*</spann></h6>
                        <input />
                        <h6>PASSWORD <spann style={{color:"red"}}>*</spann></h6>
                        <input />
                        <a href="">Forgot your password?</a>
                        <button>Log in</button>
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