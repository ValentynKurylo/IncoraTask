const express = require('express')
require('dotenv').config()

const userRouter = require('./routers/userRouter')

const app =express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.json("Hello world")
})

app.use('/users', userRouter)

app.listen(3000, ()=>{
    console.log("App listen 3000")
})
