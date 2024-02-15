import knex from 'knex'
import { BookingRepository } from '../types/definition.js'

const pg = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})

const toRangeFilter = (filter: { from: string; to: string }) => {
  return `[${filter.from}, ${filter.to}]`
}

class BookingDataSource implements BookingRepository {
  getRooms = async () => {
    return pg.select().from('room')
  }

  getRoomById = async (id: string) => {
    return pg.select().where('room_id', id).from('room').first()
  }

  getRoomsByAvailability = async (from: string, to: string) => {
    return pg
      .select('room.*')
      .from('room')
      .join(
        'room_availability',
        'room.room_id',
        '=',
        'room_availability.room_id',
      )
      .whereRaw('room_availability.availability @> ?::daterange', [
        toRangeFilter({ from, to }),
      ])
  }

  getBookingById = async (id: string) => {
    return pg.select().where('booking_id', id).from('booking').first()
  }

  // ideally for this we would have integration test to verify all the cases are coverted
  saveBooking = async ({ roomId, from, to, firstName, lastName, email }) => {
    // lets get transaction
    // find the room and availability
    // and split changes based on the result
    //
    // 1] from
    // 2] to
    // we will get single range so we have delete and split on two
    // pg.select()
    //   .where('room_id', roomId)
    //   .andWhereRaw("availability @> '[?, ?]'::daterange", [from, to])
    //   .from('room_availability')
    //   .first()

    return pg.transaction(async (tx) => {
      const roomAvailability = await tx('room_availability')
        .select()
        .where('room_id', roomId)
        .whereRaw('availability @> ?::daterange', [toRangeFilter({ from, to })])
        .first()
      // we can have 4 combinations
      // case 1:
      // one is the case where we can't find entry which means it has been booked
      // we return error
      //
      // case 2: (,)
      // we can have 3 combinations
      // (,)
      //
      // case 3: (,2024-02-12) - available before
      // we can have 3 combinations
      // (,2024-02-12)
      //
      // case 4: (2024-02-12,) - availabe after
      // we can have 3 combinations
      // (2024-02-12,)
      //
      const [availableFrom, availableTo] = roomAvailability.availability
        .replace('(', '')
        .replace(')', '')
        .split(',')

      let availability = []
      if (availableFrom === '' && availableTo === '') {
        availability = [
          ['', from],
          [to, ''],
        ]
      } else if (availableFrom === '') {
        availability = [
          ['', from],
          [to, availableTo],
        ]
      } else {
        availability = [
          [availableFrom, from],
          [to, ''],
        ]
      }
      // we have to wait for deletion before we can insert
      await tx('room_availability')
        .delete()
        .where('room_id', roomId)
        .whereRaw('availability @> ?::daterange', [
          roomAvailability.availability,
        ])

      const result = await Promise.all([
        ...availability.map(([from, to]) => {
          let availabilityValue = ''
          if (from === '') {
            availabilityValue = `[${from},${to})`
          } else {
            availabilityValue = `(${from},${to}]`
          }
          return tx('room_availability').insert({
            room_id: roomId,
            availability: availabilityValue,
          })
        }),
        tx('booking')
          .insert({
            room_id: roomId,
            start_date: from,
            end_date: to,
            first_name: firstName,
            last_name: lastName,
            email: email,
          })
          .returning('booking_id'),
      ])
      // delete first

      //  concurrently insert 2 * booking

      // now we have to delete entry
      // 64528efe-347e-4497-93da-14e55bf9339d [2024-2-15, 2024-2-16]
      // select * from room_availability where room_id = '64528efe-347e-4497-93da-14e55bf9339d' and  availability @> '[2024-2-15, 2024-2-16]';
      // select * from room_availability where room_id = '64528efe-347e-4497-93da-14e55bf9339d';

      const booking = result[2]
      const bookingId = booking[0].booking_id
      return {
        booking_id: bookingId,
        start_date: from,
        end_date: to,
        room_id: roomId,
        first_name: firstName,
        last_name: lastName,
        email: email,
      }
    })
  }
}

export { BookingDataSource }
