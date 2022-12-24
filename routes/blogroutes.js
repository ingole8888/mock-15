const express=require("express")
const blroutes=express.Router()

const BlogModel=require("../models/blogmodel")


// get related to user
blroutes.get("/user",async(req,res)=>{
     const {userId}=req.body

    let data=await BlogModel.find({userId})
     return res.status(200).send({"message":"user blog",data})
    
})

// post blog
blroutes.post("/addblog",async(req,res)=>{
       
    const {userId,title,category,author,content,image}=req.body

    const data=new BlogModel({
        userId,title,category,author,content,image
    })

    await data.save()
    res.status(200).send({"message":"New Blog Added",data})
})

// delete blog
blroutes.delete("/:blogId",async(req,res)=>{
    const {blogId}=req.params
    const {userId}=req.body

    const blog=await BlogModel.findOne({userId})
    if(!blog){
        return res.status(404).send("blog not found")
    }
    else{

    await BlogModel.findByIdAndDelete({_id:blogId})
     return res.status(200).send("blog deleted")
    }
})

// edit blog
blroutes.put("/:blogId",async(req,res)=>{
    const {blogId}=req.params
    const {userId}=req.body

     const blog=await BlogModel.findOne({userId})
    if(!blog){
        return res.status(404).send("blog not found")
    }
    else{
    let updateblog=await BlogModel.findOneAndUpdate({_id:blogId},req.body,{new:true})
    return res.status(200).send({"message" : "blog successfully updated",updateblog})
    }
})

blroutes.get("/allblog",async(req,res)=>{
    const {category,author}=req.query
    
    if(category && !author){
        const blog=await BlogModel.find({category})
        return res.status(200).send({"message": "filter category",blog})
    }
    else if (category && author){
        const blog=await BlogModel.find({$or:[{category},{author}]})
        return res.status(200).send({"message": "filter category",blog})
    }
    else if(author && !category){
        const blog=await BlogModel.find({author})
        return res.status(200).send({"message": "filter category",blog})
    }
    else {
       const blog=await BlogModel.find()
        return res.status(200).send({"message": "filter category",blog})
    }
})


module.exports=blroutes
