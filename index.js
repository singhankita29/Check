const express = require("express")
const cors = require("cors")
const connection = require("./config/db")
const userController = require("./routes/user.routes")


require('dotenv').config()


const app = express() 
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.send("Welcome")
})

app.use("/user", userController)


app.listen(process.env.URL, async () => {
    try{
        await connection
        console.log("DB connected")
    }
    catch(err){
        console.log(err)
        console.log("error occur")
    }
    console.log(`Listning on port ${process.env.URL}`)
})