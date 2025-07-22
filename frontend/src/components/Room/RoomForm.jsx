import React, { useState, useRef, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../utils/axios.js'

const RoomForm = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    theme: 'green-dark',
  })

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

  const handleSubmit = (e) => {
    e.preventDefault();
    createRoomMutation.mutate(form);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
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
              onChange={handleChange}
              className="block w-full border bg-gray-100 border-gray-300 rounded px-3 py-2"
            >
              <option value="green-dark">Green (Dark Mode)</option>
              <option value="green-light">Green (Light Mode)</option>
              <option value="yellow-dark">Yellow (Dark Mode)</option>
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
  )
}

export default RoomForm