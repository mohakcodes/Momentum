import api from '../../utils/axios';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getYearRangeFromCheckIns } from '../../utils/checkInYearRange';
import { findCurrMaxStreak } from '../../utils/streaks';

import YearHeatMap from '../YearHeatMap';
import useThemeStore from '../../store/useThemeStore';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getRoomById = async (id) => {
  const res = await api.get(`/room/${id}`);
  return res.data.room;
};

const checkIfDoneToday = async (id) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const utcDate = date.toISOString();

  const res = await api.get(`/checkin/${id}?date=${utcDate}`);
  return res.data.doneToday;
};

const checkInNow = async (id) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const utcDate = date.toISOString();
  const res = await api.post(`/checkin/check/${id}?date=${utcDate}`);
  console.log(res);
};

const HabitRoom = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: room, isLoading, isError } = useQuery({
    queryKey: ['room', id],
    queryFn: () => getRoomById(id),
    enabled: !!id,
  });

  const { data: doneToday, isLoading: isCheckingToday } = useQuery({
    queryKey: ['checkInStatus', id],
    queryFn: () => checkIfDoneToday(id),
    enabled: !!id,
  });

  const checkInMutation = useMutation({
    mutationFn: () => checkInNow(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room', id] });
      queryClient.invalidateQueries({ queryKey: ['checkInStatus', id] });
    },
    onError: (err) => {
      const msg = err.response?.data?.message || 'Failed to check-in';
      console.error('Check-in error:', err);
      alert(msg);
    },
  });

  const handleCheckIn = () => {
    if (!doneToday) checkInMutation.mutate();
  };

  const isDisabled = checkInMutation.isPending || doneToday;
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const checkIns = room?.checkIns || [];
  const { minYear, maxYear } = useMemo(() => getYearRangeFromCheckIns(checkIns), [checkIns]);

  const { theme, themeConfig } = useThemeStore();
  const currentTheme = themeConfig[theme];
  const fontColor = currentTheme?.fontColor || 'text-gray-800';

  const streaks = useMemo(() => {
    return findCurrMaxStreak(checkIns,selectedYear);
  },[checkIns,selectedYear])

  if (isLoading || isCheckingToday) return <div className="text-center mt-16 text-gray-500">Loading room...</div>;
  if (isError) return <div className="text-center mt-16 text-red-500">Something went wrong loading the room.</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-8">
        <div className='flex-1'>
          <h1 className={`text-2xl sm:text-3xl font-bold ${fontColor}`}>{room.name}</h1>
          <p className={`${fontColor} mt-1`}>{room.description || 'No description available.'}</p>
        </div>
        <button
          onClick={handleCheckIn}
          disabled={isDisabled}
          className={`
            px-4 sm:px-5 py-2 rounded-lg transition font-medium self-stretch sm:self-auto
            text-white disabled:cursor-not-allowed disabled:bg-gray-600
            ${!doneToday ? currentTheme.button : ''}
          `}
        >
          {doneToday
            ? 'Checked in today'
            : checkInMutation.isPending
            ? 'Checking in...'
            : 'Daily Check-In'}
        </button>
      </div>
      
      <div className="flex sm:flex-row flex-col justify-between sm:items-start items-center gap-4 sm:gap-0">
        <div className='flex items-center gap-3'>
          <div>
            <label className={`text-md font-medium ${fontColor}`}>Year </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className={`border border-gray-300 rounded px-3 py-1 ${fontColor} ${currentTheme.pageBg}`}
            >
              {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map((year) => (
               <option
                  key={year}
                  value={year}
                  className={`${currentTheme.pageBg} ${fontColor}`}
                >
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={`text-md font-medium ${fontColor}`}>Month </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className={`border border-gray-300 rounded px-3 py-1 ${fontColor} ${currentTheme.pageBg}`}
            >
              <option value={-1}>All</option>
              {
                months.map((m, i) => (
                  <option 
                    key={i} 
                    value={i} 
                    className={`${currentTheme.pageBg} ${fontColor}`}
                  >
                    {m}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
        <div className={`flex flex-col gap-1 text-md ${fontColor}`}>
          <p>
            Max streak: <strong>{streaks.maxStreak}</strong> days
          </p>
          <p>
            Current streak: <strong>{streaks.currStreak}</strong>
            {streaks.currStreak > 0 ? '🔥' : '⛔'}
          </p>
        </div>
      </div>  

      <YearHeatMap
        year={selectedYear} 
        month={selectedMonth} 
        checkIns={checkIns}
        checkInBoxClass={currentTheme.checkInBox}
        checkInBoxHoverClass={currentTheme.checkInBoxHover}
        checkInBoxBorderClass={currentTheme.checkInBoxBorder}
        nonCheckInBoxClass={currentTheme.nonCheckInBox}
      />
    </div>
  );
};

export default HabitRoom;