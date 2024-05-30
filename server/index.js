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
const { resolve } = require('path')
const { rejects } = require('assert')

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
        origin: "*",
        setAllowedOrigins: "*",
        methods: ["GET", "POST"]
    }
})


io.on("connection", (socket)=>{

    let userEmail
    // socket.on("joinRoom", (userEmail)=>{
    //     console.log("joined room ", userEmail);
    //     socket.join(userEmail)
    // })
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
        }
        const dbUserName = await new Promise((resolve,reject) => {
            db.query("SELECT * FROM users WHERE userName = ?", [data.userName], (err,results) =>{
                if(err){
                    reject(err)
                } else{
                    resolve(results)
                }
            })
        })
        
        if(dbUserName.length > 0){
            socket.emit("registerError", "Username must be unique")
            return
        }

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
                db.query("SELECT * FROM friends WHERE userEmail = ? ORDER BY lastMessageDate DESC;", [data.email], (err,result) => {
                    if(err){
                        reject(err)
                    } else{
                        resolve(result)
                    }
                })
            })
            let friendsData = await new Promise(async (resolve,reject) => {
                let tempArr = []
                let columnsToGet = ["id","email", "displayName", "userName", "photoURL", "color", "status",]
                console.log("dbData", dbData);
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
                        tempArr.push({...friendData, unRead: data.unRead})
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
    socket.on("setStatus", (data,status) => {

        userEmail = data.email

        db.query("UPDATE users SET status = ? WHERE email = ?", [status, data.email], (err) => {
            if(err){
                console.log(err);
            } else{
                console.log("status: ", status);
                io.emit("friendStatusChange", userEmail, status)
            }
        })
    })
    socket.on("getMessages", async (selectedFriend, user) => {
        try{
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            let messages = await new Promise((resolve,reject) => {
                let query = "SELECT * FROM messages WHERE (senderEmail = ? AND receiverEmail = ?) OR (senderEmail = ? AND receiverEmail = ?) ORDER BY date DESC;"
                db.query(query, [selectedFriend.email, user.email, user.email, selectedFriend.email],(err, result)=>{
                    if(err){
                        reject(err)
                    } else{
                        resolve(result)
                    }
                })
            })
                socket.emit("receiveMessages", messages)
        } catch(err){
            console.log(err);
        }
    })
    // socket.on("markAsUnRead", (friendEmail, userEmail) => {
    //     db.query("UPDATE friends SET unRead = unRead + 1 WHERE (userEmail = ? AND friendEmail = ?)", [userEmail, friendEmail], (err, result) => {
    //         if(err){
    //             console.log(err);
    //         } else{
    //             console.log(result);
    //         }
    //     })
    // })
    socket.on("sendMessage", async (message, sender, receiver) => {
        try {
            // console.log("message: ", message);
            // console.log("sender: ", sender);
            // console.log("receiver: ", receiver);

            let date = new Date()

            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            console.log("date: ", date);

            // let dataToAdd = {
            //     senderEmail: sender.email,
            //     receiverEmail: receiver.email,
            //     message: message,
            //     date: date
            // }

            // const localDate = new Date(date.toLocaleString("en-US", { timeZone: userTimeZone }));

            let dataToSend = {
                senderEmail: sender.email,
                receiverEmail: receiver.email,
                message: message,
                date: date,
                }
            let query = "INSERT INTO messages SET ?"

            // await db.query("UPDATE friends WHERE userEmail = ? OR userEmail = ? SET lastMessageDate = ?", [dataToSend.senderEmail, dataToSend.receiverEmail, dataToSend.date])
            console.log(dataToSend.date);
            await db.query("UPDATE friends SET lastMessageDate = ? WHERE userEmail = ? AND friendEmail = ?", [dataToSend.date, dataToSend.senderEmail, dataToSend.receiverEmail]);
            await db.query("UPDATE friends SET lastMessageDate = ? WHERE friendEmail = ? AND userEmail = ?", [dataToSend.date, dataToSend.senderEmail, dataToSend.receiverEmail]);
            await db.query(query, dataToSend, (err) => {
                if(err){
                    console.log(err);
                } else {
                    io.emit(receiver.email, dataToSend)
                    io.emit(sender.email, dataToSend)
                    // console.log("sending message to room ", receiver.email);
                    // io.to(receiver.email).emit(receiver.email, dataToSend)
                    // socket.emit("markAsUnRead", dataToSend.receiverEmail, dataToSend.senderEmail)
                    db.query("UPDATE friends SET unRead = unRead + 1 WHERE (userEmail = ? AND friendEmail = ?)", [dataToSend.receiverEmail, dataToSend.senderEmail], (err, result) => {
                        if(err){
                            console.log(err);
                        } else{
                            console.log(result);
                        }
                    })
                }
            })

        } catch(err){
            console.log(err);
        }
    })
    socket.on("markAsRead", (friendEmail, userEmail) => {
        db.query("UPDATE friends SET unRead = 0 WHERE (userEmail = ? AND friendEmail = ?)", [userEmail, friendEmail])
    })
    socket.on("sendFriendRequest", async (enteredUserName, user)=>{
        try{
            let columnsToGet = ["userName","displayName","photoURL","color"]
            let dbDataArr = await new Promise((resolve,reject)=>{
                db.query("SELECT ?? FROM users WHERE userName = ?", [columnsToGet, enteredUserName], (err,result)=>{
                    if(err){
                        reject(err)
                    } else{
                        resolve(result)
                    }
                })
            })
            if(!(dbDataArr.length > 0)){
                // the entered username is not in db
                socket.emit("friendRequestError", "Username not found")
                return;
            }

            let friendRequestData = await new Promise((resolve,reject)=>{
                db.query("SELECT * FROM friendrequests WHERE receiverUserName = ?", [enteredUserName], (err,result)=>{
                    if(err){
                        reject(err);
                    } else{
                        resolve(result)
                    }
                })
            })

            if(friendRequestData && friendRequestData.length > 0){
                // a request was found in friendrequests table
                socket.emit("friendRequestError", "Already pending request")
                return;
            }

                let [dbData] =  dbDataArr
                let dataForDB = {
                    senderUserName: user.userName,
                    receiverUserName: dbData.userName,
                }
                let dataForSender = {
                    ...dataForDB,
                    ...dbData,
                }
                let dataForReceiver = {
                    ...dataForDB,
                    userName: user.userName,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    color: user.color,
                }
                await new Promise((resolve,reject)=>{
                    db.query("INSERT INTO friendrequests SET ?", [dataForDB], (err) => {
                        if(err){
                            reject(err)
                        } else {
                            resolve();
                        }
                    })
                })
                let senderEventName = ("friendRequest" + dataForDB.senderUserName)
                let receiverEventName = ("friendRequest" + dataForDB.receiverUserName)
                socket.emit("friendRequestSuccess", "Friend request sent!")
                io.emit(senderEventName, dataForSender)
                io.emit(receiverEventName, dataForReceiver)
                console.log("Friend Request sent, dataForDB: ", dataForDB);
            

        } catch(err){
            console.log(err);
        }
    })
    socket.on("getFriendRequests", async (userName)=>{
        try{
            let dbData = await new Promise((resolve,reject) => {
                db.query("SELECT senderUserName,receiverUserName FROM friendrequests WHERE (senderUserName = ? OR receiverUserName = ?)", [userName,userName], (err, result)=>{
                    if(err){
                        reject(err)
                    } else{
                        resolve(result)
                    }
                })
            })
            console.log("dbData: ", dbData);
            if(dbData && dbData.length > 0){
                // socket.emit("receiveFriendRequests", dbData)
                let finalArr = await Promise.all(dbData.map(async(request)=>{
                    try{
                        console.log("request: ", request);
                        let UserNameToFind = ""
                        if(request.senderUserName == userName){
                            UserNameToFind = request.receiverUserName
                        } else {
                            UserNameToFind = request.senderUserName
                        }
                        let userInfo = await new Promise((resolve,reject)=>{
                            db.query("SELECT displayName,photoURL,color FROM users WHERE userName = ?", [UserNameToFind], (err, result)=>{
                                if(err){
                                    reject(err)
                                } else{
                                    resolve(result[0])
                                }
                            })
                        })

                        return {
                            ...request,
                            ...userInfo,
                        }

                    } catch(err){
                        console.log(err);
                    }
                    
                }))

                socket.emit("receiveFriendRequests", finalArr)

            }
        } catch(err){
            console.log(err);
        }
    })
    socket.on("removeRequest", async (request)=>{
        try{
            await new Promise((resolve,reject)=>{
                db.query("DELETE FROM friendrequests WHERE senderUserName = ? AND receiverUserName = ?", [request.senderUserName, request.receiverUserName], (err)=>{
                    if(err){
                        reject(err)
                    } else{
                        resolve("done");
                    }
                })
            })
                let senderEventName = ("removeFriendRequest" + request.senderUserName)
                let receiverEventName = ("removeFriendRequest" + request.receiverUserName)
                io.emit(senderEventName, request)
                io.emit(receiverEventName, request)

        } catch(err){
            console.log(err);
        }
    })
    socket.on("acceptRequest", async (request, user)=>{
        try{
            // await new Promise((resolve, reject)=>{
            //     db.query("DELETE FROM friendrequests WHERE senderUserName = ? AND receiverUserName = ?", [request.senderUserName, request.receiverUserName], (err)=>{
            //         if(err){
            //             reject(err)
            //         } else{
            //             resolve();
            //         }
            //     })
            // })

            let friendEmailArr = await new Promise((resolve, reject)=>{
                db.query("SELECT email FROM users WHERE userName = ?", [request.senderUserName], (err, result)=>{
                    if(err){
                        reject(err)
                    } else{
                        resolve(result)
                    }
                })
            })

            if(!(friendEmailArr && friendEmailArr.length > 0)){
                // user doesn't exist in db
                return
            }
            let friendEmail = friendEmailArr[0].email
            let friendInfoArr = await new Promise((resolve,reject)=>{
                db.query("SELECT * FROM friends WHERE (userEmail = ? AND friendEmail = ?) OR (userEmail = ? AND friendEmail = ?)", [user.email, friendEmail, friendEmail, user.email], (err, result)=>{
                    if(err){
                        reject(err);
                    } else{
                        resolve(result)
                    }
                })
            })

            if(friendInfoArr && friendInfoArr.length > 0){
                return
            }

            let date = new Date()

            let dataForDB1 = {
                userEmail: user.email,
                friendEmail: friendEmail,
                lastMessageDate: date,
            }
            let dataForDB2 = {
                userEmail: friendEmail,
                friendEmail: user.email,
                lastMessageDate: date,
            }



            await new Promise((resolve, reject)=>{
                db.query("INSERT INTO friends SET ?", dataForDB1,(err)=>{
                    if(err){
                        reject(err)
                    } else{
                        resolve()
                    }
                })
            })
            await new Promise((resolve, reject)=>{
                db.query("INSERT INTO friends SET ?", dataForDB2,(err)=>{
                    if(err){
                        reject(err)
                    } else{
                        resolve()
                    }
                })
            })
            let columnsToGet = ["id", "email", "displayName", "userName", "photoURL", "color", "status"]
            let friendInfo = await new Promise((resolve, reject) => {
                db.query("SELECT ?? FROM users WHERE email = ?", [columnsToGet, friendEmail], (err, result)=>{
                    if(err){
                        reject(err)
                    } else{
                        resolve(result[0])
                    }
                })
            })
            
            let userToSend = {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
                userName: user.userName,
                photoURL: user.photoURL,
                color: user.color,
                status: user.status,
                unread: 0,
            }
            let friendInfoToSend = {
                ...friendInfo,
                unread: 0,
            }


            console.log("friendInfoToSend: ", friendInfoToSend);
            console.log("userToSend: ", userToSend);
            socket.emit("addFriend" + user.email, friendInfoToSend)
            io.emit("addFriend" + friendEmail, userToSend)


        } catch(err){
            console.log(err);
        }
    })



    let disconnected = false
    socket.on("disconnect", async () => {
        try{
            if(!disconnected){
                disconnected = true
                await new Promise((resolve,reject)=>{
                    db.query("UPDATE users SET status = ? WHERE email = ?", ["offline", userEmail], (err) => {
                        if(err){
                            reject(err);
                        } else{
                            console.log("offline");
                            io.emit("friendStatusChange", userEmail,"offline")
                            resolve();
                        }
                    })
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