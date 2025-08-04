const StreakReminder = () => {
  return (
    <div className="mt-10 mb-3 px-4 max-w-3xl mx-auto py-6 rounded-2xl border bg-green-50 text-green-900 shadow-sm">
        <h2 className="text-xl font-bold mb-1 text-center">Need a Nudge?</h2>
        <p className="text-center text-sm">
          Get daily email reminders if you forget to check-in — sent at 8PM with rooms you missed.
        </p>
        <p className="text-center text-sm font-medium mt-2">7-day pack – <span className="text-green-700 font-semibold">50 XP</span></p>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setReminderModalOpen(true)}
            className="px-5 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl font-semibold transition"
          >
            Activate Reminder Pack
          </button> 
        </div>
      </div>
  )
}

export default StreakReminder