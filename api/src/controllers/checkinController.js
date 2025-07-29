import prisma from "../utils/prismaClient.js";
import { DateTime } from "luxon";
import { findCurrMaxStreak } from "../utils/streaks.js";
import { getCoinReward } from '../utils/reward.js'

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
    const {date, timeZone} = req.body;
    const userId = req.user.userId;

    if(!roomId || !date || !timeZone){
        return res.status(400).json({error:"RoomId ,Date & TimeZone are required"})
    }
    
    try {
        const localDate = DateTime.fromISO(date, {zone: timeZone}).toISODate();
        const midNightInUTC = DateTime.fromISO(localDate, {zone: timeZone}).toUTC().toJSDate();
        const userYear = DateTime.fromISO(date, {zone: timeZone}).year;

        const checkIn = await prisma.checkIn.upsert({
            where:{
                roomId_date:{
                    roomId,
                    date:midNightInUTC
                }
            },
            update:{},
            create:{
                roomId,
                date: midNightInUTC
            }
        })

        const checkIns = await prisma.checkIn.findMany({
            where: {roomId},
        })

        const {currStreak, maxStreak} = findCurrMaxStreak(checkIns, userYear);
        const xpReward = getCoinReward(currStreak);

        await prisma.user.update({
            where: {id: userId},
            data: {
                xp: {increment: xpReward}
            }
        })

        const updatedUser = await prisma.user.findUnique({
            where: {id: userId},
            select: { id: true, username: true, xp: true, themes: true}
        })

        return res.json({ doneToday: true, checkIn, currStreak, xpReward, updatedUser });
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