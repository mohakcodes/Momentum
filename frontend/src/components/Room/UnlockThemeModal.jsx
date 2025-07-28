const UnlockThemeModal = ({theme, onCancel, onConfirm}) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Unlock Theme</h3>
            <p className="mb-4">
              Want to unlock <strong>{theme.label}</strong> for <strong>{theme.cost} XP</strong>?
            </p>
            <div className="flex justify-end gap-2">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                    Cancel
                </button>
                <button
                    type='button'
                    onClick={onConfirm}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                    Unlock
                </button>
            </div>
        </div>
    </div>
  )
}

export default UnlockThemeModal