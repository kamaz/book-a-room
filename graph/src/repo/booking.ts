import knex from 'knex'
import { BookingRepository } from '../types/definition.js'

const pg = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})

class BookingDataSource implements BookingRepository {
  getRooms = async () => {
    return pg.select().from('room')
  }
  getRoomById = async (id: string) => {
    return pg.select().where('room_id', id).from('room').first()
  }
  getBookingById = async (id: string) => {
    return pg.select().where('booking_id', id).from('booking').first()
  }
  saveBooking = async ({ roomId, from, to, firstName, lastName, email }) => {
    return pg
      .insert({
        room_id: roomId,
        start_date: from,
        end_date: to,
        first_name: firstName,
        last_name: lastName,
        email: email,
      })
      .returning('booking_id')
      .into('booking')
      .then((booking) => {
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
