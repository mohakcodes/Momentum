import prisma from '../utils/prismaClient.js'

export const getRoom = async(req,res) => {
    const {id} = req.params;
    const userId = req.user.userId;
    try {
        if(id){
            const room = await prisma.room.findFirst({
                where:{id, userId}
            })
            if (!room) {
                return res.status(404).json({ message: "Room Not Found" });
            }
            return res.status(200).json({ message: "Room Fetched", room });
        }
        else{
            const rooms = await prisma.room.findMany({
                where:{userId}
            });
            return res.status(200).json({message:"Rooms Fetched", rooms})
        }
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const createRoom = async(req,res) => {
    const { name } = req.body;
    const userId = req.user.userId;

    try {
        const roomExists = await prisma.room.findFirst({where: {userId, name}})
        if(roomExists){
            return res.status(400).json({message:"Room with same name already exists"})
        }

        const createdRoom = await prisma.room.create({data: {name,userId}})
        return res.status(201).json({message:"Room Created", room: createdRoom})
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}