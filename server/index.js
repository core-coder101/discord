const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const { rejects } = require('assert')
const { resolve } = require('path')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'discord'
})

const server = http.createServer(app)

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{



    socket.on("registerUser", async (data) => {

        try{

        const dbEmail = await new Promise((resolve,reject) => {
            db.query("SELECT * FROM users WHERE email = ?", [data.email], (err,results) =>{
                if(err){
                    reject(err)
                } else{
                    resolve(results)
                }
            })
        })

        if(dbEmail.length > 0){
            socket.emit("registerError", "Email already in use")
            return
        } else{}
        
        let hashedPassword = await bcrypt.hash(data.password, 8)
        let colorsArray = ["black", "blue", "fuchsia", "gray", "#3BA55C","maroon","olive",'#E44235', 'teal', '#FAA61A', '#E1721F', '#904FAD', '#757E8A']
        console.log(colorsArray.length);
        let x = Math.floor(Math.random() * 12)
        let color = colorsArray[x]

        data = {
            ...data,
            password: hashedPassword,
            color: color
        }

        let tokenData = {
            email: data.email,
            id: data.id,
        }

        db.query("INSERT INTO users SET ?", data, (err) =>{
            if(err){
                console.log(err);
            } else{

            console.log("User Registered");
            const token = jwt.sign(tokenData,process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN })
            const cookieOptions = {
                maxAge: process.env.COOKIE_EXPIRES_IN,
                httpOnly: true
            }
            socket.emit("createToken",token, cookieOptions)
            }
        })
    } catch(err){
        console.log(err);
    }
    })
    socket.on("loginUser", async (data) => {
        try{
            let dbData = await new Promise((resolve,reject) =>{
                db.query("SELECT * FROM users WHERE email = ?", [data.email], (err, result)=>{
                    if(err){
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            })

            if(!dbData.length > 0){
                socket.emit("loginError", "Invalid Email")
                return
            } else{
                console.log(dbData);
                bcrypt.compare(data.password, dbData[0].password,(err, matched) =>{
                    if(err){
                        console.log(err);
                    } else if(matched){
                        // Correct Email and Correct Password:
                        let tokenData = {
                            email: dbData[0].email,
                            id: dbData[0].id,
                        }
                        const token = jwt.sign(tokenData,process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN })
                        const cookieOptions = {
                            maxAge: process.env.COOKIE_EXPIRES_IN,
                            httpOnly: true
                        }
                        socket.emit("createToken",token, cookieOptions)
                    } else if(!matched){
                        // Correct Email but Wrong Password
                        socket.emit('loginError', 'Incorrect password')
                    }
                })
            }
            
            
        } catch(err){
            console.log(err);
        }
    })
    socket.on("requestUserData", async (data) => {
        try{
            let dbData = await new Promise((resolve,reject) => {
                db.query("SELECT * FROM users WHERE email = ?", [data.email], (err,result) =>{
                    if(err){
                        reject(err);
                    } else{
                        resolve(result);
                    }
                })
            })

            if(!dbData.length > 0){
               console.log("requestData failed: email not found in DB");
               return;
            }

            socket.emit("receiveUserData", dbData[0])

        } catch(err){
            console.log(err);
        }
    })
    socket.on("requestFriendsData", async (data) => {
        try{
            let dbData = await new Promise((resolve, reject) => {
                db.query("SELECT friendEmail FROM friends WHERE userEmail = ?", [data.email], (err,result) => {
                    if(err){
                        reject(err)
                    } else{
                        resolve(result)
                    }
                })
            })
            let friendsData = await new Promise(async (resolve,reject) => {
                let tempArr = []
                let columnsToGet = ["id","email", "displayName", "userName", "photoURL", "color", "status"]
                
                await Promise.all(dbData.map(async (data) =>{
                    try{
                        let friendData = await new Promise((resolve, reject) =>{
                            db.query("SELECT ?? FROM users WHERE email = ?", [columnsToGet, data.friendEmail], (err, result) =>{
                                if(err){
                                    reject(err)
                                } else{
                                    resolve(result[0])
                                }
                            })
                        })
                        tempArr.push(friendData)
                    } catch(err){
                        reject(err)
                    }
                    

                }))

                resolve(tempArr);
            })
            

            console.log('friends Data: ' , friendsData);
            socket.emit("receiveFriendsData", friendsData)
            

        } catch(err){
            console.log(err);
        }
    })
})


server.listen(5000, () => {
    console.log("Server Running on Port 5000");
})