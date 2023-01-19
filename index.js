const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const userController=require("./routes/user.routes")

const cors = require("cors")
const {UserModel} = require("./models/User.Model")

const {connection} = require("./config/db")
require('dotenv').config()

const authentication=require("./middlewares/authentication")
const authorisation=require("./middlewares/authorisation")


const app = express();
app.use(express.json())

app.use(cors())

// app.use("/user",userController)


app.get("/", (req, res) => {
    res.send("Welcome ")
})

app.post("/signup", async (req, res) => {
    let {email,password}=req.body;
    bcrypt.hash(password,6).then(async function(hash){
        const user = new UserModel({email,password:hash})
        await user.save()
        res.send("Sign up successfull")
    })
    .catch(() =>{
      res.send("something went wrong")
    })
})

app.post("/login", async (req, res) => {
    let {email,password}=req.body;
    let user=await UserModel.findOne({email})
    let hash=user.password
    bcrypt.compare(password,hash, function(err,result){
      if(result){
        var token = jwt.sign({email:email}, 'secret');
        console.log(token)
        res.send({"msg":"Login successfull", "token" : token})
      }
      else{
        res.send("Login failed, invalid credentials")
       }
    })

})



app.get("/dashboard", authentication,(req,res) =>{
    res.send("Dashboard")
})


app.post("/dashboard/create", authentication, authorisation (["admin","seller"])),async (req,res) => {
    res.send("dashboard created")
}

app.delete("dashboard/:cardId", authentication, authorisation(["admin"]), async (req,res) =>{
    res.send("deleted"+" "+req.params.cardId)
})

app.listen(8080, async () => {
    try{
        await connection
        console.log("connected to db successfully")
    }
    catch(err){
        console.log("err connecting to db")
        console.log(err)
    }
    console.log("listening on PORT 8080")
})
