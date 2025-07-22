export const getYearRangeFromCheckIns = (checkIns) => {
    if(!checkIns || checkIns.length === 0){
        const currentYear = new Date().getFullYear();
        return { minYear: currentYear, maxYear: currentYear };
    }
    const years = checkIns.map(ci => new Date(ci.date).getFullYear());
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    return {minYear,maxYear};
}