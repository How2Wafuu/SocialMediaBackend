const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"],});
const calendar =  prisma.calendar;

exports.createAppointment = async (date,title,description) =>{
    if(!date || !title) throw new Error("Error! data not provide");
    const result = await calendar.create({
        data:{
            start_time : date,
            title : title,
            description : description,
        },
        select:{
            start_time : true,
            title : true,
            description : true,
        }
    });
    return result;
}

exports.getAllAppointment = async () =>{
    const result = await calendar.findMany({
        select:{
            id : true,
            start_time : true,
            title : true,
            description : true,
        },orderBy:{
            start_time : "desc"
        }
    });
    return result;
}

exports.getAppointment = async (date) =>{
    if(!date) throw new Error("Error! date not provide");
    const result = await calendar.findFirst({
        where:{
            start_time : date
        },
        select:{
            start_time : true,
            title : true,
            description : true,
        }
    });
    return result;
}

//Delete an Appointment by id
exports.deleteAppointment = async (id) =>{
    if(!id) throw new Error("Error! ID not provide : "+id);
    const result = await calendar.delete({
        where:{
            id : id
        }
    });
    return result;
}



