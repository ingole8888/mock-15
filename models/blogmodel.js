const mongoose=require("mongoose")


const blogschema=new mongoose.Schema({
    userId:{type:String,required:true},
    title:{type:String,required:true},
    category:{type:String,required:true},
    author:{type:String,required:true},
    content:{type:String,required:true},
    image:{type:String,required:true}
})

const BlogModel=mongoose.model("bloglists",blogschema)

module.exports=BlogModel

 