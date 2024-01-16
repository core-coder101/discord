import React, { useState } from "react";


function Register(props){

    let {
        setSelectedPage,
        setUser,
        socket
    } = props

    // States
    const [formData, setFormData] = useState({
        email: '',
        displayName: '',
        userName: '',
        password: '',
        dateOfBirth: '',
    })
    const [checkbox, setCheckBox] = useState(false)

    function dataChange(event){
        let {name, value} = event.target

        setFormData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function registerUser(){
        socket.emit("registerUser", formData)
    }

    return(
        <div className="LoginMainDiv">
            <div className="FormAreaOuterDiv">
                <div className="RegisterDiv">
                    <h4>Create an account</h4>

                    <div className="FormDiv">
                    
                        <h6>EMAIL <span style={{color:"red"}}>*</span></h6>
                        <input name="email" value={formData.email} onChange={(e)=>{dataChange(e)}} required type="email" />
                        <h6>DISPLAY NAME</h6>
                        <input name="displayName" value={formData.displayName} onChange={(e)=>{dataChange(e)}} type="text" />
                        <h6>USERNAME <span style={{color:"red"}}>*</span></h6>
                        <input name="userName" value={formData.userName} onChange={(e)=>{dataChange(e)}} required type="text" />
                        <h6>PASSWORD <span style={{color:"red"}}>*</span></h6>
                        <input name="password" value={formData.password} onChange={(e)=>{dataChange(e)}} required type="password" />
                        <h6>DATE OF BIRTH <span style={{color:"red"}}>*</span></h6>
                            <input name="dateOfBirth" value={formData.dateOfBirth} onChange={(e)=>{dataChange(e)}} required type="date" />
                        <button className={!checkbox ? "disabledButton" : ""} disabled={!checkbox} onClick={registerUser}>Continue</button>
                        <div className="checkBoxDiv">
                            <input onClick={()=>{setCheckBox((prevValue)=>!prevValue)}} type="checkbox" />
                            <p>I have read and agree to Discord's <a href="">Terms of Services</a> and <a href="">Privacy Policy</a></p>
                        </div>
                        <div>
                            <button className="loginRegisterLinks" onClick={()=>{setSelectedPage('login')}} href="">Already have an account?</button>
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register