import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../utils/axios.js'
import RoomForm from './RoomForm.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import {Eye, Trash2} from 'lucide-react'

const getUserRooms = async() => {
  const res = await api.get('/room');
  return res.data.rooms;
}

const removeRoom = async(id) => {
  const res = await api.delete(`/room/${id}`);
  console.log(res.data);
  return res.data;
}

const Rooms = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);

  const { data: rooms = [], isLoading, isError } = useQuery({
    queryKey: ['rooms'],
    queryFn: getUserRooms,
  })

  const {mutate: deleteRoom, isPending} = useMutation({
    mutationFn: removeRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: (error) => {
      console.error('Failed to delete room:', error);
    }
  })

  const handleDelete = (id) => {
    deleteRoom(id);
  };


  if (isLoading) return <p className="text-center mt-8 text-gray-500">Loading...</p>
  if (isError) return <p className="text-center mt-8 text-red-500">Something went wrong</p>

  return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Your Habit Rooms</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-blue-700 transition cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            Create Room +
          </button>
        </div>

        {rooms.length === 0 ? (
          <p className="text-gray-500">You haven't created any rooms yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
            {rooms.map((room) => {
              const lastCheckIn = room.checkIns?.[0]?.date
              const formattedDate = lastCheckIn
                ? new Date(lastCheckIn).toLocaleDateString('en-CA')
                : 'N/A'

              return (
                <div
                  key={room.id}
                  className="flex items-start justify-between bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all"
                >
                  <div className='flex flex-col gap-1 min-h-[80px]'>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">{room.name}</h2>
                    {room.description && (
                      <p className="text-sm text-gray-700 mt-1">
                        {room.description.length > 40
                          ? `${room.description.slice(0, 40)}...`
                          : room.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => navigate(`/room/${room.id}`)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-800 bg-green-200 hover:bg-green-300 rounded-md transition cursor-pointer"
                      >
                        View <Eye size={18}/>
                      </button>
                      <button 
                        onClick={() => handleDelete(room.id)}
                        disabled={isPending}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition cursor-pointer"
                      >
                        {isPending ? 'Deleting...' : <>Delete <Trash2 size={18}/></>}
                      </button>
                    </div>
                    <p className="text-xs text-gray-800">
                      Last updated: <span className="font-medium">{formattedDate}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {showForm && <RoomForm onClose={() => setShowForm(false)} />}
      </div>
  )
}

export default Rooms