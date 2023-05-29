import { mongooseConnect } from "@/lib/mongoose";
import { Useri } from "@/models/Useri";
import bcrypt from 'bcrypt'

export async function POST(req){
    try {
        await mongooseConnect();
        const {username, email, password: pass} = await req.json()

        const isExisting = await Useri.findOne({email})

        if(isExisting){
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(pass, 10)

        const newUser = await Useri.create({username, email, password: hashedPassword})

        const {password, ...user} = newUser._doc

        return new Response(JSON.stringify(user), {status: 201})
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500})
    }
}