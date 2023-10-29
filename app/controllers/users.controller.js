const usersServiecs = require("../services/users.services");
const jwt = require('jsonwebtoken');

exports.testRoute = async (req , res) =>{
    res.status(200).send("EIEI");
}

exports.createUser = async (req, res) =>{
    const body = req.body;
    const username = body.username;
    const password = body.password;
    const repass = body.repass;
    if(!username || !password || !repass) return res.status(404).send({success:false,message:"Data not provide"});
    const finder = await usersServiecs.findUsername(username);
    if(finder) return res.status(208).send({success:false,message:"Duplicate Username"});
    if(password !== repass) return res.status(404).send({success:false,message:"Password not match"}); 

    try{
        const Users = await usersServiecs.CreateUsers(username,password);
        res.status(201).send({success:true,data:Users});
    } catch (err){
        console.log(err);
        res.status(404).send({success:false,message:"Error!"});
    }
}

exports.Login = async (req, res) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;
    if (!username || !password) return res.status(404).send({ success: false, message: "Invalid login credentials" });
    try {
        const Account = await usersServiecs.findUserLoginCredentials(username, password);
        if (!Account.user_id) return res.status(404).send({ success: false, message: "Undefined login credentials" });
        const signedToken = await jwt.sign({ data: {uid: Account.user_id,} }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '1d',
          });
        await res.cookie('accessToken', signedToken ,  {
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 1)),
          });
        return res.status(200).send({
            success: true,
            message: "Authenticated",
            accessToken: signedToken
        });

    } catch (err) {
        console.log(err);
        res.status(404).send({
            success: false,
            message: "Error! Login"
        });
    }
}

exports.getData = async (req,res) =>{
    const uid = req.uid;
    try{
        const result = await usersServiecs.getUserdata(uid);
        res.status(200).send({success:true,data:result});
    }catch(err){
        console.log(err);
        res.status(404).send("Error! get user data");
    }
}

exports.getAllUsers = async (req,res) =>{
    try{
        const result = await usersServiecs.getAllUsers();
        res.status(200).send({success:true,data:result});
    } catch (err){
        console.log(err);
        res.status(400).send({success:false,message:"Error!"});
    }
}
