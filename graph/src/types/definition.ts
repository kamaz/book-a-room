const typeDefs = `#graphql
  interface Room {
    id: ID!
    name: String
    price: Int
    image: String
  }

  type SingleRoom implements Room {
    id: ID!
    name: String
    price: Int
    image: String
  }

  interface Booking { 
    id: ID!
    room: Room!
    from: String
    to: String
    firstName: String!
    lastName: String!
    email: String!
  }

  type SingleRoomBooking implements Booking {
    id: ID!
    room: Room!
    from: String!
    to: String!
    firstName: String!
    lastName: String!
    email: String!
  }

  input BookingInput {
    roomId: ID!
    from: String!
    to: String!
    email: String!
    firstName: String!
    lastName: String!
  }  

  type Query {
    rooms: [Room]!
    room(id: ID!): Room
    booking(id: ID!): Booking
  }

  type Mutation {
    bookRoom(input: BookingInput!): Booking
  }
`

type RoomEntity = {
  room_id: string
  name: string
  price: number
  image: string
}

type BookingEntity = {
  booking_id: string
  room_id: string
  start_date: string
  end_date: string
  email: string
  first_name: string
  last_name: string
}

type Room = {
  id: string
  name: string
  price: number
  image: string
}

type Booking = {
  id: string
  from: string
  to: string
  email: string
  firstName: string
  lastName: string
  roomId: string
}

type BookingInput = {
  roomId: string
  from: string
  to: string
  email: string
  firstName: string
  lastName: string
}

type BookingRepository = {
  getRooms(): Promise<Array<RoomEntity>>
  getRoomById(id: string): Promise<RoomEntity>
  getBookingById(id: string): Promise<BookingEntity>
  saveBooking(booking: BookingInput): Promise<BookingEntity>
}

type BookingContext = {
  dataSources: {
    bookingDataSource: BookingRepository
  }
}

export { typeDefs }
export type {
  RoomEntity,
  BookingEntity,
  BookingContext,
  Room,
  Booking,
  BookingRepository,
  BookingInput,
}
