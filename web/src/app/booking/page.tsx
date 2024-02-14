'use client'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { useSearchParams } from 'next/navigation'
import { GET_ROOM, Room } from '@/graph/rooms'
import { BOOK_ROOM } from '@/graph/booking'
import { Currency } from '@/components/currency'

export default function Booking() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomId = searchParams.get('room_id')
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const [bookMutation] = useMutation(BOOK_ROOM)
  const { loading, error, data } = useQuery<{ room: Room }>(GET_ROOM, {
    variables: { id: roomId },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  const room = data!.room

  return (
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
      <h2 className='text-center text-3xl mb-10'>Booking Reservation</h2>

      <form
        className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'
        method='post'
        onSubmit={(e) => {
          e.preventDefault()
          const firstName = e.target.firstName.value
          const lastName = e.target.lastName.value
          const email = e.target.email.value
          bookMutation({
            variables: {
              roomId: roomId,
              from: from,
              to: to,
              email: email,
              firstName: firstName,
              lastName: lastName,
            },
          }).then((booking) => {
            router.push(`/confirm?booking_id=${booking.data.bookRoom.id}`)
          })
        }}
      >
        <div>
          <div>
            <h2 className='text-lg font-medium text-gray-900'>
              Contact information
            </h2>

            <div className='mt-4'>
              <label
                htmlFor='email-address'
                className='block text-sm font-medium text-gray-700'
              >
                Email address
              </label>
              <div className='mt-1'>
                <input
                  required
                  type='email'
                  id='email-address'
                  name='email'
                  autoComplete='email'
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>
          </div>

          <div className='pt-10'>
            <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
              <div>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  First name
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    required
                    id='first-name'
                    name='firstName'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Last name
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    required
                    id='last-name'
                    name='lastName'
                    autoComplete='family-name'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-10 lg:mt-0'>
          <h2 className='text-lg font-medium text-gray-900'>Booking summary</h2>

          <div className='mt-4 rounded-lg border border-gray-200 bg-white shadow-sm'>
            <ul role='list' className='divide-y divide-gray-200'>
              <li key={room.id} className='flex px-4 py-6 sm:px-6'>
                <div className='flex-shrink-0'>
                  <img src={room.image} className='w-20 rounded-md' />
                </div>

                <div className='ml-6 flex flex-1 flex-col'>
                  <div className='flex'>
                    <div className='min-w-0 flex-1'>
                      <h4 data-testid={`cart-${room.id}`} className='text-sm'>
                        {room.id}
                      </h4>
                    </div>
                  </div>
                  <div className='flex mt-2'>
                    <div className='min-w-0 flex-1'>
                      <h5 className='text-sm'>
                        {from} - {to}
                      </h5>
                    </div>
                  </div>

                  <div className='flex flex-1 items-end justify-between pt-2'>
                    <p className='mt-1 text-sm font-medium text-gray-900'>
                      <Currency value={room.price} />
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <dl className='space-y-6 order-gray-200 px-4 py-6 sm:px-6'>
              <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
                <dt className='text-base font-medium'>Total</dt>
                <dd className='text-base font-medium text-gray-900'>
                  <Currency value={room.price} />
                </dd>
              </div>
            </dl>

            <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
              <button
                data-testid='book-room'
                type='submit'
                className='w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
