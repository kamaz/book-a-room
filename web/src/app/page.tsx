'use client'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { GET_ROOMS, Room } from '@/graph/rooms'
import { Currency } from '@/components/currency'
import { Calendar } from '@/components/calendar'

export default function Home() {
  const router = useRouter()
  const [from, setFrom] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })
  const [to, setTo] = useState({
    day: new Date().getDate() + 1,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })
  const { loading, error, data } = useQuery<{ rooms: Array<Room> }>(GET_ROOMS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <main className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
      <h2 className='text-center text-3xl mb-10'>Booking Room App</h2>

      <div className='flex justify-center items-center'>
        <div>
          <h3>From</h3>
          <Calendar
            onChange={(value) => {
              setFrom(value)
            }}
          />
        </div>
        <div>
          <h3>To</h3>
          <Calendar
            onChange={(value) => {
              setTo(value)
            }}
          />
        </div>
        <button className='rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'>
          Search
        </button>
      </div>

      <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
        {data!.rooms.map((room) => (
          <div key={room.id}>
            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2'>
              <img
                src={room.image}
                className='h-full w-full object-cover object-center group-hover:opacity-75'
              />
            </div>
            <div className='mt-4 flex items-center justify-between text-base font-medium text-gray-900'>
              <h3>{room.name}</h3>
              <p>
                <Currency value={room.price} />
              </p>
            </div>
            <p className='mt-1 mb-3 text-sm text-gray-500'>{room.id}</p>
            <button
              data-testid={`book-room-${room.id}`}
              className='w-full rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200'
              onClick={() =>
                router.push(
                  `/booking?room_id=${room.id}&from=${from.year}-${from.month}-${from.day}&to=${to.year}-${to.month}-${to.day}`,
                )
              }
            >
              Book
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
