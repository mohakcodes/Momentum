import {
  Check,
  Sparkles,
  Flame,
  Trophy,
  PartyPopper
} from 'lucide-react'

export const toastStyles = [
  {
    id: 'default',
    icon: Check,
    message: 'Checked in successfully!',
    xpCost: 0,
    style: {
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-800',
      textColor: 'text-gray-800',
      bgColor: 'bg-white',
    },
  },
  {
    id: 'sparkle',
    icon: Sparkles,
    message: 'You’re glowing!',
    xpCost: 15,
    style: {
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-800',
      bgColor: 'bg-purple-50',
    },
  },
  {
    id: 'fire',
    icon: Flame,
    message: 'You’re on fire!',
    xpCost: 20,
    style: {
      iconBg: 'bg-orange-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-700',
      bgColor: 'bg-orange-50',
    },
  },
  {
    id: 'trophy',
    icon: Trophy,
    message: 'Victory streak!',
    xpCost: 30,
    style: {
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-700',
      textColor: 'text-yellow-800',
      bgColor: 'bg-yellow-50',
    },
  },
  {
    id: 'party',
    icon: PartyPopper,
    message: 'It’s a celebration!',
    xpCost: 40,
    style: {
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      textColor: 'text-pink-800',
      bgColor: 'bg-pink-50',
    },
  },
]