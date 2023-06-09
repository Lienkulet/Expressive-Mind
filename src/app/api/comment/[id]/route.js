import {verifyJwtToken} from '@/lib/jwt';
import { mongooseConnect } from '@/lib/mongoose';
import { Comment } from '@/models/Comment';
import { Useri } from '@/models/Useri';

export async function GET(req, ctx){
    await mongooseConnect();;
    const id = ctx.params.id
    try {
        const comments = await Comment.find({blogId: id}).sort({ createdAt: -1 }).populate(
            {
                path:'authorId',
                select: 'username',
                model: Useri
            }
            );

        return new Response(JSON.stringify(comments), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(null), {status: 500})
    }
}


export async function DELETE(req, {params: id}) {
    await mongooseConnect();;
  
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
      
        const comment = await Comment.findById(id).populate('authorId');

        if(comment?.authorId?._id.toString() !== decoded._id.toString()){
            return new Response(JSON.stringify({
                msg: 'Only the author can delete this comment'
             }), {
                 status: 401
             });
        }

        await Comment.findByIdAndDelete(id);
  
      return new Response(JSON.stringify({
          msg: 'Successfully deleted'
      }), {
          status: 200
      })
    } catch (error) {
      return new Response(JSON.stringify(null), {status: 500})
    }
  }
  