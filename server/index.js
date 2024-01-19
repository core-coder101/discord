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
        let colorsArray = ["aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon", "navy", "olive", 'purple', 'red', 'silver', 'teal', 'yellow']
        console.log(colorsArray.length);
        let x = Math.floor(Math.random() * 14)
        let color = colorsArray[x]

        data = {
            ...data,
            password: hashedPassword,
            color: color
        }

        db.query("INSERT INTO users SET ?", data, (err) =>{
            if(err){
                console.log(err);
            } else{

            console.log("User Registered");
            const token = jwt.sign(data,process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN })
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
                        let dbDataInObject = {...dbData[0]}
                        const token = jwt.sign(dbDataInObject,process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN })
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
})


server.listen(5000, () => {
    console.log("Server Running on Port 5000");
})