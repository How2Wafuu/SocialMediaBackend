const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"],});
const post =  prisma.post;

exports.createPosts = async (uid,post_title,post_content) =>{
    if(!uid || !post_title || !post_content) throw new Error("Error! data not provide");
    const date = new Date();
    const result = await post.create({
        data:{
            post_user_id : uid,
            post_title : post_title,
            post_content : post_content,
            created_at : date,

        },
        select:{
            post_user_id : true,
            post_title : true,
            post_content : true,
            created_at : true,
        }
    });
    return result;
}

exports.getAllPosts = async () =>{
    const result = await post.findMany({
        select:{
            post_id : true,
            post_user_id : true,
            post_title : true,
            post_content : true,
            created_at : true,
        },orderBy:{
            created_at : "desc"
        }
    });
    return result;
}