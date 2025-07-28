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
            user: {id: user.id, username: user.username, xp: user.xp, themes: user.themes}
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

        const access_token = jwt.sign(
            {userId:existingUser.id, username: existingUser.username},
            process.env.JWT_SECRET,
            {expiresIn: "15m"}
        )

        const refresh_token = jwt.sign(
            {userId:existingUser.id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            user: {
                id: existingUser.id, 
                username: existingUser.username,
                xp: existingUser.xp,
                themes: existingUser.themes
            },
            access_token
        })
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const refresh = async(req,res) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        if(!refresh_token){
            return res.status(401).json({ message: "Refresh token not found. Please log in again." });
        }

        jwt.verify(refresh_token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                console.error("Refresh token invalid:", err);
                return res.status(401).json({ message: "Invalid or expired refresh token. Please log in again." });
            }
            const newAccessToken = jwt.sign(
                {userId: decoded.userId},
                process.env.JWT_SECRET,
                {expiresIn: "15m"}
            )

            return res.json({access_token: newAccessToken});
        })
    }
    catch (err) {
        console.error("Error in refresh:", err);
        res.status(500).json({ message: "Server error" });
    }
}

export const logout = (req, res) => {
  try {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return res.status(200).json({ message: 'Logout successful' });
  } 
  catch (err) {
    console.error("Error during logout:", err);
    return res.status(500).json({ message: 'Server error during logout' });
  }
};