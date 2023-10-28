const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"],});
const Users =  prisma.user;

exports.CreateUsers = async (username,password) =>{
    if(!username || !password) throw new Error("Data not provide");
    const hashPassword = bcrypt.hashSync(password, 8);
    const result = await Users.create({
        data:{
            username : username,
            pwd : hashPassword
        },
        select:{
            username : true,
            created_at : true,
            user_picture : true,
        }
    });
    return result;
}

exports.findUsername = async (username) =>{
    if(!username) throw new Error("Data not provide");
    const result = await Users.findFirst({
        where:{
            username : username
        }
    });
    return result;
}

exports.findUserLoginCredentials = async (username, password) => {
    if (!username || !password) throw new Error("Error! data is not valid");
    const result = await Users.findFirst({
        where:
        {
            username: username
        },
        select: {
            user_id: true,
            pwd: true
        }
    })
    const checkPassword = bcrypt.compareSync(password, result.pwd);
    if (!checkPassword) throw new Error("Error! password not match");
    return result;
}

exports.getUserdata = async (uid) =>{
    if(!uid) throw new Error("Error! uid not provide");
    const result = await Users.findUnique({
        where:{
            user_id : uid,
        },
        select:{
            username : true,
            created_at : true,
            user_picture : true,
        }
    });
    return result;
}