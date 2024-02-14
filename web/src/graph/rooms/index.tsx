import { gql } from '@apollo/client'

type Room = {
  id: string
  name: string
  price: number
  image: string
}

const GET_ROOMS = gql`
  query GetRooms {
    rooms {
      id
      name
      price
      image
    }
  }
`

const GET_ROOM = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
      price
      image
    }
  }
`

export { GET_ROOMS, GET_ROOM }
export type { Room }
