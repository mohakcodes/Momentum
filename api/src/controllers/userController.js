import prisma from '../utils/prismaClient.js'

const themePrices = {
  'aqua-mint': 10,
  'rose-night': 15,
  'midnight-purple': 20,
  'peachy-sunset': 20,
  'sky-violet': 25,
}

export const unlockTheme = async(req,res) => {
    try {
        const userId = req.user.userId;
        const {theme} = req.body;

        if (!theme || !(theme in themePrices)) {
            return res.status(400).json({ message: 'Invalid theme' });
        }

        const cost = themePrices[theme];
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.themes.includes(theme)) {
            return res.status(400).json({ message: 'Theme already unlocked' });
        }

        if (user.xp < cost) {
            return res.status(400).json({ message: 'Not enough XP' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                xp: {decrement: cost},
                themes: {push: theme},
            },
        })

        return res.status(200).json({
            message: 'Theme unlocked successfully',
            user: updatedUser,
        });
    }
    catch (err) {
        console.error('Unlock theme error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}