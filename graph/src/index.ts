import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import {
  typeDefs,
  BookingContext,
  RoomEntity,
  BookingInput,
} from './types/definition.js'
import { BookingDataSource } from './repo/booking.js'
import { toRoom, toBooking } from './response/mapper.js'

const resolvers = {
  SingleRoomBooking: {
    room(_root, _args, { dataSources: { bookingDataSource } }) {
      const { roomId } = _root
      return bookingDataSource.getRoomById(roomId).then(toRoom)
    },
  },
  Booking: {
    __resolveType() {
      return 'SingleRoomBooking'
    },
  },
  Room: {
    __resolveType() {
      return 'SingleRoom'
    },
  },
  Query: {
    rooms: (_, { filter }, { dataSources: { bookingDataSource } }) => {
      if (filter) {
        return bookingDataSource
          .getRoomsByAvailability(filter.from, filter.to)
          .then((rooms: Array<RoomEntity>) => rooms.map(toRoom))
      }
      return bookingDataSource
        .getRooms()
        .then((rooms: Array<RoomEntity>) => rooms.map(toRoom))
    },
    room: (_, { id }: { id: string }, { dataSources: { bookingDataSource } }) =>
      bookingDataSource.getRoomById(id).then(toRoom),
    booking: (
      _,
      { id }: { id: string },
      { dataSources: { bookingDataSource } },
    ) => bookingDataSource.getBookingById(id).then(toBooking),
  },
  Mutation: {
    bookRoom: (
      _,
      { input }: { input: BookingInput },
      { dataSources: { bookingDataSource } },
    ) => bookingDataSource.saveBooking(input).then(toBooking),
  },
}

const server = new ApolloServer<BookingContext>({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  context: async () => {
    const bookingDataSource = new BookingDataSource()
    return {
      dataSources: {
        bookingDataSource: bookingDataSource,
      },
    }
  },
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
