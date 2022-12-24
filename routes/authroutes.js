const express = require("express")
const bcrypt  = require("bcrypt")

const jwt = require('jsonwebtoken');

const AuthModel =require("../models/authmodel")
const authController = express.Router();

authController.post("/signup",async (req, res) => {
    const {email, password} = req.body;

    await bcrypt.hash(password, 6, async function(err, hash) {
        if(err){
            return res.status(500).send("Password Error, Please try again...")
        }
        const user = new AuthModel({
            email,
            password : hash
        })
        await user.save();
         return res.status(200).send({ message: "Signup successfull", user: user})
    });
})

authController.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await AuthModel.findOne({email})
  
    if(!user){
        return res.status(501).send("Login Failed, User Not Found!");
    }
    const hash = user.password;
    
    await bcrypt.compare(password, hash, function(err, result) {
       if(err){
        return res.send("Login Failed, please try again later")
    }

    if(result){
        const token=jwt.sign({email:user.email,userId:user._id},"shhhhh")
        
        return res.status(200).send({message:"login succesfully",token:token,data:user})
    }
    else{
        res.status(401).send("invalid password")
    }
    });
})

module.exports = authController