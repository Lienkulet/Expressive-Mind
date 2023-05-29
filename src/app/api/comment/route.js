import {verifyJwtToken} from '@/lib/jwt';
import { mongooseConnect } from "@/lib/mongoose";
import { Comment } from '@/models/Comment';

export async function POST(req){
    await mongooseConnect();;

        const accessToken = req.headers.get('authorization');
        const token = await accessToken.split(' ')[1];
        const decoded = verifyJwtToken(token);

        if(!accessToken || !decoded){
            return new Response(JSON.stringify({
                error:'unauthorized (wrong or expired token)'
            }), {
                status: 403
            });
        }    

        try {
            const body = await req.json();

            let newComment = await Comment.create(body);
            newComment = await newComment.populate('authorId');

            return new Response(JSON.stringify(newComment), { status: 200 })
        } catch (error) {
            return new Response(JSON.stringify(null), {status: 500})
        }
}