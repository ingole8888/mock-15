const express=require("express")
const cors = require('cors')

const connection= require("./config/config")
const authController=require("./routes/authroutes")
const blroutes=require("./routes/blogroutes")
const authentication =require("./middleware/authentication")

require('dotenv').config()

const app=express()
app.use(express.json())
app.use(cors())

app.use("/user", authController)
app.use("/blog", authentication,blroutes)


app.get("/",(req,res)=>{
    return res.status(200).send("HomePage");
})

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("db connected");
    }
    catch(err){
        console.log(err);
    }
    console.log(`db connect at ${process.env.PORT}`);
})