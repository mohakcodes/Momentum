export const findCurrMaxStreak = (checkIns, selectedYear) => {
    const dateSet = new Set();

    checkIns.forEach(({date}) => {
        const localDate = new Date(date);
        const year = localDate.getFullYear();
        if(year === selectedYear){
            const dateStr = localDate.toLocaleDateString('en-CA');
            dateSet.add(dateStr);
        }
    })

    const sortedDates = Array.from(dateSet)
                             .map(dateStr => new Date(dateStr))
                             .sort((a,b) => a-b)

    let maxStreak = 0;
    let currStreak = 0;
    let prevDate = null;

    for(const date of sortedDates){
        if(!prevDate){
            currStreak = 1;
        }
        else{
            const diff = (date-prevDate)/(1000*60*60*24);
            if(diff === 1){
                currStreak++;
            }
            else if(diff === 0){
                continue;
            }
            else{
                currStreak = 1;
            }
        }
        maxStreak = Math.max(maxStreak,currStreak);
        prevDate = date;
    }

    const today = new Date();
    today.setHours(0,0,0,0);
    const todayStr = today.toLocaleDateString('en-CA');
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString('en-CA');
    
    const isTodayChecked = dateSet.has(todayStr);
    const isYesterdayChecked = dateSet.has(yesterdayStr);
    
    return {
        maxStreak, 
        currStreak: (isTodayChecked || isYesterdayChecked) ? currStreak : 0
    };
}