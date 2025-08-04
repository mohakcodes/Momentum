import prisma from '../utils/prismaClient.js'
import {toastStyles} from '../constants/toastStyles.js'

export const unlockToast = async(req, res) => {
    const {toastName} = req.body;
    const userId = req.user.userId;

    try {
        const toast = toastStyles.find(t => t.id === toastName);
        if (!toast) {
            return res.status(400).json({ message: "Invalid toast ID" })
        }

        const user = await prisma.user.findUnique({ where: { id: userId } })

        if (user.unlockedToasts.includes(toastName)) {
            return res.status(400).json({ message: "Toast already unlocked" })
        }

        if (user.xp < toast.xpCost) {
           return res.status(400).json({ message: "Not enough XP" })
        }

        const updatedUser = await prisma.user.update({
            where: {id: userId},
            data: {
                xp: {decrement: toast.xpCost},
                unlockedToasts: {push: toastName},
            }
        })

        return res.status(200).json({
            message: "Toast unlocked!",
            xp: updatedUser.xp,
            unlockedToasts: updatedUser.unlockedToasts,
        })
    } 
    catch (err) {
        console.error("Error unlocking toast:", err)
        return res.status(500).json({ message: "Server error" })
    }
}

export const selectToast = async (req, res) => {
  const { toastName } = req.body;
  const userId = req.user.userId;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user.unlockedToasts.includes(toastName)) {
      return res.status(400).json({ message: "Toast not unlocked" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { selectedToast: toastName },
    });

    return res.status(200).json({
      message: "Toast selected!",
      selectedToast: updatedUser.selectedToast,
    });
  } catch (err) {
    console.error("Error selecting toast:", err);
    return res.status(500).json({ message: "Server error" });
  }
};