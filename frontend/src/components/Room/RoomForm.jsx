import React, { useState, useRef, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useUserStore from '../../store/useUserStore.js'
import api from '../../utils/axios.js'
import UnlockThemeModal from './UnlockThemeModal.jsx'

const allThemes = [
  { value: 'fresh-forest', label: 'Fresh Forest', isFree: true },
  { value: 'mustard-dusk', label: 'Mustard Dusk', isFree: true },
  { value: 'citrus-sky', label: 'Citrus Sky', isFree: true },
  { value: 'aqua-mint', label: 'Aqua Mint', isFree: false, cost: 10 },
  { value: 'rose-night', label: 'Rose Night', isFree: false, cost: 15 },
  { value: 'midnight-purple', label: 'Midnight Purple', isFree: false, cost: 20 },
  { value: 'peachy-sunset', label: 'Peachy Sunset', isFree: false, cost: 20 },
  { value: 'sky-violet', label: 'Sky Violet', isFree: false, cost: 25 },
]

const RoomForm = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    theme: 'fresh-forest',
  })
  
  const { user, setUser } = useUserStore();
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedLockedTheme, setSelectedLockedTheme] = useState(null);

  const unlockedThemes = user?.themes || [];

  const modalRef = useRef()
  const queryClient = useQueryClient()

  const createRoomMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/room', payload);
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      onClose()
    },
    onError: (err) => {
      const msg = err.response?.data?.message || "Failed to create room"
      console.error("Create room error:", err)
      alert(msg)
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleThemeChange = (e) => {
    const selectedValue = e.target.value;
    const selectedTheme = allThemes.find(t => t.value === selectedValue);
    const isUnlocked = selectedTheme.isFree || unlockedThemes.includes(selectedTheme.value);

    if(!isUnlocked){
      setSelectedLockedTheme(selectedTheme);
      setShowBuyModal(true); 
    }
    else{
      setForm(prev => ({...prev, theme: selectedValue}))
    }
  }

  const handleUnlockClick = async () => {
    try {
      const res = await api.post('/user/unlock-theme', {
        theme: selectedLockedTheme.value,
      });
      setUser(res.data.user);
      setForm(prev => ({ ...prev, theme: selectedLockedTheme.value }));
      setShowBuyModal(false);
      setSelectedLockedTheme(null);
    } 
    catch (err) {
      alert(err.response?.data?.message || 'Failed to unlock theme');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createRoomMutation.mutate(form);
  }

  useEffect(() => {
    console.log("Selected locked theme:", selectedLockedTheme);
  }, [selectedLockedTheme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(showBuyModal) return;
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose, showBuyModal])

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div
          ref={modalRef}
          className="w-full max-w-md p-6 bg-white bg-opacity-95 rounded-lg shadow-lg mx-4"
        >
          <h2 className="text-xl font-semibold mb-4">Create a Room</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
              <input
                name="name"
                type="text"
                placeholder="Think of a Habit"
                value={form.name}
                onChange={handleChange}
                required
                className="block w-full border bg-gray-100 border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Describe about Habit"
                rows="2"
                value={form.description}
                onChange={handleChange}
                className="block w-full border bg-gray-100 border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
              <select
                name="theme"
                value={form.theme}
                onChange={handleThemeChange}
                className="block w-full border bg-gray-100 border-gray-300 rounded px-3 py-2"
              >
                {
                  allThemes.map((theme) => {
                    const isUnlocked = theme.isFree || unlockedThemes.includes(theme.value);
                    const label = isUnlocked ? theme.label : `${theme.label} 🔒 (${theme.cost} XP)`;
                    return(
                      <option
                        key={theme.value}
                        value={theme.value}
                      >
                        {label}
                      </option>
                    )
                  })
                }
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

      {showBuyModal && selectedLockedTheme && (
        <UnlockThemeModal
          theme={selectedLockedTheme}
          onCancel={() => {
            setShowBuyModal(false)
            setSelectedLockedTheme(null)
          }}
          onConfirm={handleUnlockClick}
        />
      )}
    </>
  )
}

export default RoomForm