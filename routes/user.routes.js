const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {UserModel} = require("./models/User.Model")

const cors = require("cors");

const userController = Router();

userController.use(cors());

userController.get("/",async(req,res) => {
    const result=await UserModel.find()
    res.send(result)
})

userController.post("/signup", async (req, res) => {
    let {email,password,age}=req.body;
    bcrypt.hash(password,6).then(async function(hash){
        const user = new UserModel({email,password:hash,age})
        await user.save()
        res.send("Sign up successfull")
    })
    .catch(() =>{
      res.send("something went wrong")
    })
})

userController.post("/login", async (req, res) => {
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


module.exports = 
    userController;
