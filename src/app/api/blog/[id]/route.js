import { verifyJwtToken } from "@/lib/jwt";
import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { Useri } from "@/models/Useri";

export async function GET(req, ctx) {
  await mongooseConnect();

  const id = ctx.params.id;

  try {
      const blog = await Blog.findById(id).populate({
        path: "authorId", select: 'username', model: Useri
       }).select('-password')
      return new Response(JSON.stringify(blog), { status: 200 })
  } catch (error) {
    console.log(error);
      return new Response(JSON.stringify(null), { status: 500 })
  }
}

export async function PUT(req, ctx) {
  await mongooseConnect();
  const id = ctx.params.id;

  const accessToken = req.headers.get('authorization');
  const token = accessToken.split(' ')[1];
  const decoded = await verifyJwtToken(token);

  if(!accessToken || !decoded){
      return new Response(JSON.stringify({
          error:'unauthorized (wrong or expired token)'
      }), {
          status: 403
      });
  }

  try {
    const body = await req.json();
    const blog = await Blog.findById(id).populate({path:'authorId', select: 'username', model: Useri});
    
    if(blog?.authorId?._id.toString() !== decoded._id.toString()){
        return new Response(JSON.stringify({
           msg: 'Only the author can update this blog'
        }), {
            status: 403
        });
    }

    const updateBlog = await Blog.findByIdAndUpdate(id, {
        $set: {...body}
    }, {    new: true   });

    return new Response(JSON.stringify(updateBlog), { status: 200 });

  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(null), {status: 500})
  }
}
export async function DELETE(req, ctx) {
  await mongooseConnect();

  const id = ctx.params.id;

  // const accessToken = req.headers.authorization;
  // const token = accessToken.split(' ')[1];

  // const decodedToken = verifyJwtToken(token);

  // if (!accessToken || !decodedToken) {
  //   return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 });
  // }

  try {
    // const blog = await Blog.findById(id).populate('authorId');
    // // if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
    // //   return new Response(JSON.stringify({ msg: 'Only author can delete his blog' }), { status: 403 });
    // // }

    await Blog.findByIdAndDelete(id);

    return new Response(JSON.stringify({ msg: 'Successfully deleted blog' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
