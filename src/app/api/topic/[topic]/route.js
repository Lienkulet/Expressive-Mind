import db from "@/lib/db";
import { Blog } from "@/models/Blog";
import { Useri } from "@/models/Useri";

export  async function GET(req, ctx){
    await db.connect()
    
    try {
        const topic = ctx.params.topic;

        const blog = await Blog.find({category: topic}).sort({createdAt: -1}).populate({
            path: "authorId", select: 'username', model: Useri
        });

        return new Response(JSON.stringify(blog), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(null), {status: 500})
    }
}