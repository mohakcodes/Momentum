import prisma from "../utils/prismaClient.js";

export const isCheckInDoneToday = async(req,res) => {
    const {roomId} = req.params;
    const {date} = req.query;
    try {
        if(!roomId || !date){
            return res.status(400).json({error:"RoomId & Date are required"})
        }

        const dayToUse = new Date(date);
        
        const checkIn = await prisma.checkIn.findUnique({
            where:{
                roomId_date:{
                    roomId,
                    date:dayToUse
                }
            }
        })

        return res.json({ doneToday: !!checkIn });
    }
    catch (err) {
        console.error("Error in isCheckInDoneToday:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const checkInNow = async(req,res) => {
    const {roomId} = req.params;
    const {date} = req.query;
    
    try {
        if(!roomId || !date){
            return res.status(400).json({error:"RoomId & Date are required"})
        }
        
        const dayToUse = new Date(date);
        
        const checkIn = await prisma.checkIn.upsert({
            where:{
                roomId_date:{
                    roomId,
                    date:dayToUse
                }
            },
            update:{},
            create:{
                roomId,
                date: dayToUse
            }
        })
        return res.json({ doneToday: true, checkIn });
    } 
    catch (err) {
        console.error("Error in checkInNow:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getAllCheckIns = async(req,res) => {
    const {roomId} = req.params;

    try {
        if(!roomId){
            return res.status(400).json({error:"RoomId is required"})
        }        
        const allRoomChecks = await prisma.checkIn.findMany({
            where:{ roomId },
            orderBy: {date: "asc"}
        })

        return res.status(200).json({checks: allRoomChecks})
    } 
    catch (err) {
        console.error("Error in getAllCheckIns:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}