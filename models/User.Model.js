const mongoose=require("mongoose")

const topicSchema=new mongoose.Schema({
  email:String,
  password:String,
})

const UserModel=mongoose.model("user", topicSchema)

module.exports={
    UserModel
}