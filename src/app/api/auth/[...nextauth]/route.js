import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { Useri } from "@/models/Useri";
import { signJwtToken } from "@/lib/jwt";
import bcrypt from 'bcrypt'
import { mongooseConnect } from "@/lib/mongoose";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                username: {label: 'Email', type: 'text', placeholder: 'John Doe'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, req){
                const {email, password} = credentials
               
                await mongooseConnect();

                const user = await Useri.findOne({ email })

                if(!user){
                    throw new Error("Invalid input")
                }

                // 2 parameters -> 
                // 1 normal password -> 123123
                // 2 hashed password -> dasuytfygdsaidsaugydsaudsadsadsauads
                const comparePass = await bcrypt.compare(password, user.password)

                if(!comparePass){
                    throw new Error("Invalid input")
                } else {
                    const {password, ...currentUser} = user._doc

                    const accessToken = signJwtToken(currentUser, {expiresIn: '6d'})

                    return {
                        ...currentUser,
                        accessToken
                    }
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.accessToken = user.accessToken
                token._id = user._id
            }

            return token
        },
        async session({session, token}){
            if(token){
                session.user._id = token._id
                session.user.accessToken = token.accessToken
            }

            return session
        }
    }
})

export {handler as GET, handler as POST}