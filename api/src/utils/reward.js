const rewardMap = {
  3: 5,
  10: 5,
  17: 5,
  24: 5,
  31: 5,
  7: 15,
  14: 15,
  21: 15,
  28: 15,
};

export const getCoinReward = (currStreak) => rewardMap[currStreak] ?? 2;