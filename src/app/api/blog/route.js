import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import { Blog } from "@/models/Blog";
import { Useri } from "@/models/Useri";

export async function GET(req) {
  await db.connect()

  try {
    const blogs = await Blog.find({}, { 
      title: 1,
      summary: 1,
      imgUrl: 1,
      likes: 1,
      authorId: 1,
      createdAt: 1
   }).limit(5)
      // const blogs = await Blog.find({}).limit(5).populate({
      //    path: "authorId", select: 'username', model: Useri 
      //   });
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
