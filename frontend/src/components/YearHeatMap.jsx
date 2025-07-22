import { getDaysInMonth } from '../utils/datesInMonth'
import { getCheckInDateSet } from '../utils/checkInDates';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const YearHeatMap = ({ year, month, checkIns }) => {
  const checkInSet = getCheckInDateSet(checkIns);

  const visibleMonths = month === -1 ? months.map((_, i) => i) : [month];

  return (
    <div className={`grid gap-4 sm:gap-6 ${
        visibleMonths.length === 1
        ? 'grid-cols-1 place-items-center'
        : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    }`}>
      {visibleMonths.map((monthIndex) => {
        const days = getDaysInMonth(year, monthIndex);
        return (
          <div 
            key={monthIndex} 
            className={`w-full ${
                visibleMonths.length === 1 ? 'max-w-xs w-full' : ''
            }`}
          >
            <div className='text-md text-gray-800 mb-2 text-center'>{months[monthIndex]}</div>
            <div className={`grid grid-cols-7 w-full ${visibleMonths.length === 1 ? 'gap-[6px] p-2' : 'gap-1'}`}>
              {days.map((day, i) => {
                const dateStr = day.toLocaleDateString('en-CA');
                const checkedIn = checkInSet.has(dateStr);

                return (
                  <div
                    key={i}
                    title={day.toDateString()}
                    className={`
                      aspect-square min-w-0 rounded-sm w-full
                      ${checkedIn 
                        ? 'bg-green-500 hover:bg-green-600 hover:scale-[1.05] border border-green-700 shadow-sm' 
                        : 'bg-slate-700'}
                    `}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default YearHeatMap;
