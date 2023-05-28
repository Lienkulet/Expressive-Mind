import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import { Blog } from "@/models/Blog";
import { Useri } from "@/models/Useri";

export async function GET(req) {
  await db.connect()

  try {
      const blogs = await Blog.find({}).sort({createdAt: -1}).limit(10).populate({
         path: "authorId", select: 'username', model: Useri 
        }).maxTimeMS(20000).lean();
      return new Response(JSON.stringify(blogs), { status: 200 })
  } catch (error) {
    console.log(error);
      return new Response(JSON.stringify(null), { status: 500 })
  }
}

export async function POST(req) {
  await db.connect();

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
      { status: 403 }
    );
  }

  try {
    const { title, summary, caption, desc, category, imageUrl, authorId } =
      await req.json();

    const newBlog = await Blog.create({
      title,
      summary, 
      caption,
      desc,
      category,
      imgUrl: imageUrl,
      authorId,
    });

    return new Response(JSON.stringify(newBlog), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
