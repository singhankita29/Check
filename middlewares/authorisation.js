const {UserModel}=require("../models/User.Model")

const authorisation = (roles) => {
    const permittedRoles = roles;
    //new function
    return async (req,res,next) => {
        console.log(permittedRoles)
        const {email} = req.body
        const user = await UserModel.findOne({email})
        console.log(user)
        if(permittedRoles.includes(user.role)){
            next()
        }
        else{
            res.send("You are not authorised")

        }
} 
}

    module.exports=authorisation