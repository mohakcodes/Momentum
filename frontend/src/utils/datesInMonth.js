export const getDaysInMonth = (year,month) => {
    const days = [];
    const date = new Date(year, month, 1);

    while(date.getMonth() === month){
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return days;
}