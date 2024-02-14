import { gql } from '@apollo/client'

const GET_BOOKING = gql`
  query GetBooking($id: ID!) {
    booking(id: $id) {
      id
      email
    }
  }
`

const BOOK_ROOM = gql`
  mutation BookRoom(
    $roomId: ID!
    $from: String!
    $to: String!
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    bookRoom(
      input: {
        roomId: $roomId
        from: $from
        to: $to
        email: $email
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      id
      room {
        id
      }
    }
  }
`

type Booking = {
  id: string
  email: string
}

export { GET_BOOKING, BOOK_ROOM }
export type { Booking }
