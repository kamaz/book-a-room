'use client'
import { GET_BOOKING, Booking } from '@/graph/booking'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@apollo/client'

export default function Confirmation() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('booking_id')
  const { loading, error, data } = useQuery<{ booking: Booking }>(GET_BOOKING, {
    variables: { id: bookingId },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  const booking = data!.booking

  return (
    <div className='bg-gray-50'>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-center text-3xl mb-10'>Great ready to go 🚀</h2>
        <h3 className='text-center text-2xl mb-10 text-gray-800'>
          📩 is on it way to{' '}
          <span data-testid='confirm-email'>{booking.email}</span>
        </h3>
        <h4
          data-testid='booking-id'
          className='text-center text-2xl mb-10 text-gray-800'
        >
          {booking.id}
        </h4>
      </div>
    </div>
  )
}
