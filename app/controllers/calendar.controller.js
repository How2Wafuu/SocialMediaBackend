const calendarService = require('../services/calendar.services');

exports.testRoute = async (req , res) =>{
    res.status(200).send("Calendar Test Route");
}

exports.createAppointment = async (req, res) =>{
    const body = req.body;
    const date = body.date;
    const title = body.title;
    const description = body.description;
    if(!title || !description) return res.status(400).send({success:false,message:"Service error : Data not provided"});

    try{
        const Posts = await calendarService.createAppointment(date,title,description);
        res.status(201).send({success:true,data:Posts});
    } catch (err){
        console.log(err);
        res.status(400).send({success:false,message:"Error!"});
    }
}
exports.getAllAppointment = async (req,res) =>{
    try{
        const result = await calendarService.getAllAppointment();
        res.status(200).send({success:true,data:result});
    } catch (err){
        console.log(err);
        res.status(400).send({success:false,message:"Error!"});
    }
}

exports.getAppointment = async (req,res) =>{
    const date = req.params.date;
    try{
        const result = await calendarService.getAppointment(date);
        res.status(200).send({success:true,data:result});
    } catch (err){
        console.log(err);
        res.status(400).send({success:false,message:"Error!"});
    }
}

//Delete an Appointment by id
exports.deleteAppointment = async (req,res) =>{
    let id = req.body.id;
    if (isNaN(id)) {
        return res.status(400).send({ success: false, message: "Invalid ID provided" });
    }
    id = parseInt(id);
    try{
        const result = await calendarService.deleteAppointment(id);
        res.status(200).send({success:true,data:result});
    } catch (err){
        console.log(err);
        res.status(400).send({success:false,message:"Error!"+err});
    }
}