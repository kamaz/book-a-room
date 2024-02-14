import {
  RoomEntity,
  Room,
  BookingEntity,
  Booking,
} from '../types/definition.js'

const toRoom = (entity: RoomEntity): Room => {
  return {
    id: entity.room_id,
    ...entity,
  }
}

const toBooking = (entity: BookingEntity): Booking => {
  return {
    id: entity.booking_id,
    from: entity.start_date,
    to: entity.end_date,
    email: entity.email,
    firstName: entity.first_name,
    lastName: entity.last_name,
    roomId: entity.room_id,
  }
}

export { toRoom, toBooking }
