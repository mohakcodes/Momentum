import prisma from '../utils/prismaClient.js'
import { findCurrMaxStreak } from '../utils/streaks.js';

export const getRoom = async(req,res) => {
    const {id} = req.params;
    const userId = req.user.userId;
    try {
        if(id){
            const room = await prisma.room.findFirst({
                where: {id, userId},
                include: {
                    checkIns: {
                        orderBy: {date: 'desc'},
                    }
                }
            })
            if (!room) {
                return res.status(404).json({ message: "Room Not Found" });
            }
            return res.status(200).json({ message: "Room Fetched", room });
        }
        else{
            const rooms = await prisma.room.findMany({
                where: {userId},
                orderBy: {createdAt: 'desc'},
                include: {
                    checkIns: {
                        orderBy: {date: 'desc'},
                        take: 1
                    },
                    _count: {
                        select: {checkIns: true}
                    }
                }
            });
            return res.status(200).json({message:"Rooms Fetched", rooms})
        }
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const getRoomStreaks = async(req,res) => {
    const {id} = req.params;
    const targetYear = parseInt(req.query.year) || new Date().getFullYear();

    if (!id) {
        return res.status(400).json({ message: "Room ID is required." });
    }

    try {
        const room = await prisma.room.findUnique({
            where: {id: id},
            include: {
                checkIns: {
                    orderBy: {date: 'desc'}
                }
            }
        })
        
        const streaks = findCurrMaxStreak(room.checkIns, targetYear);
        return res.status(200).json(streaks);
    } 
    catch (err) {
        console.error("Error getting room streaks:", err);
        return res.status(500).json({ message: "Failed to get streaks." });
    }
}

export const createRoom = async(req,res) => {
    const { name, description, theme } = req.body;
    const userId = req.user.userId;

    try {
        const roomExists = await prisma.room.findFirst({where: {userId, name}})
        if(roomExists){
            return res.status(400).json({message:"Room with same name already exists"})
        }

        const createdRoom = await prisma.room.create({data: {name,userId,description,theme}})
        return res.status(201).json({message:"Room Created", room: createdRoom})
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const removeRoom = async(req,res) => {
    const {id} = req.params;
    const userId = req.user.userId;

    try {
        const room = await prisma.room.findFirst({
            where: {id, userId}
        })
        if(!room){
            return res.status(404).json({ message: "Room not found or access denied." });
        }
        await prisma.room.delete({
            where: { id }
        });
        return res.status(200).json({ message: "Room deleted successfully." });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });   
    }
}