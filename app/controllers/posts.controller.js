const postService = require('../services/posts.services');


exports.testRoute = async (req , res) =>{
    res.status(200).send("Posts EIEI");
}

exports.createPosts = async (req, res) =>{
    const body = req.body;
    const uid = req.uid;
    console.log(uid);
    const title = body.title;
    const content = body.content;
    if(!title || !content) return res.status(404).send({success:false,message:"Data not provide"});
    // if(!uid) return res.status(404).send({success:false,message:"Invalid login credentials"});
    try{
        const Posts = await postService.createPosts(uid,title,content);
        res.status(201).send({success:true,data:Posts});
    } catch (err){
        console.log(err);
        res.status(400).send({success:false,message:"Error!"});
    }
}

exports.getAllPosts = async (req,res) =>{
    try{
        const result = await postService.getAllPosts();
        res.status(200).send({success:true,data:result});
    } catch (err){
        console.log(err);
        res.status(400).send({success:false,message:"Error!"});
    }
}
