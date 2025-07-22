export const getCheckInDateSet = (checkIns) => {
  return new Set(
    checkIns.map(ci => new Date(ci.date).toLocaleDateString('en-CA'))
  );
};