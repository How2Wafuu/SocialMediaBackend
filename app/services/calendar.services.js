const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"],});
const calendar =  prisma.calendar;

exports.createAppointment = async (date,title,description) =>{
    if(!date || !title || !description) throw new Error("Error! data not provide");
    // const date = new Date();
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

exports.deleteAppointment = async (date) =>{
    console.log(date)
    if(!date) throw new Error("Error! date not provide");
    const result = await calendar.delete({
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

