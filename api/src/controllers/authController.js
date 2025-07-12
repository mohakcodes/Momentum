import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../utils/prismaClient.js'

const usernameRegex = /^[a-z0-9._]+$/;

export const register = async(req,res) => {
    let {username, password} = req.body;
    try {
        username = username.trim().toLowerCase();
        if(!usernameRegex.test(username)){
            return res.status(400).json({
                message: "Username must be lowercase and can only contain letters, numbers, dots, or underscores"
            })
        }

        const existingUser = await prisma.user.findUnique({where: {username}});
        if(existingUser){
            return res.status(400).json({message:"Username already taken"})
        }

        const hashPass = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data: {username, password: hashPass}
        })

        res.status(201).json({
            message: "User Registered",
            user: {id: user.id, username: user.username}
        })
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const login = async(req,res) => {
    let {username, password} = req.body;
    try {
        username = username.trim().toLowerCase();

        const existingUser = await prisma.user.findUnique({where: {username}});
        if(!existingUser){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const passMatch = await bcrypt.compare(password, existingUser.password);
        if(!passMatch){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const token = jwt.sign(
            {userId:existingUser.id, username: existingUser.username},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.status(200).json({
            token,
            user: {id: existingUser.id, username: existingUser.username}
        })
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}