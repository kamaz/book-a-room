# Hotel booking application

This is a simple hotel room booking application.

## Prerequisites

- Install Docker and Docker Compose.

## TODO

- [x] Database design and data modelling about availability of hotel rooms and bookings
- [x] Feature to find available rooms by date range at least - if you can add more please do so.
- [x] Feature to create a booking with basic details of customer for a hotel room.
- [x] Bonus: automated testing

## Assumptions

- Skipping concept of hotels and just have a list of rooms.
- There are a small type errors.
- As a boutique website, we do not display many rooms (no pagination is implemented).
- Authentication is not included; users must provide their email address with each booking.
- We generate a unique booking ID.
- There is no server-side rendering; it is client-only.
- Single country and price setting.
- Assets are packaged.
- Error handling and error boundaries are skipped, as this is a simple application for room booking.
- Double bookings are possible if someone manually adjusts dates.
- Checking for reverse date mapping (e.g., past to future) is skipped; we trust our users to use the interface correctly.
- Using interfaces might seem like overkill, but past experiences have shown they are essential when extending functionality, especially on the graph layer.
- Security concerns are not addressed.
- Disable caching.
- Retries and caching are skipped.
- Missing types for GraphQL `query` and `mutation`.
- Sharing types between GraphQL and the web, ensuring compatibility, is not implemented.
- User or session management is not required.
- Separate search from functionality from `postgres`.
- No logging or monitoring is considered.
- No analytics and auditing is considered.
- Before running `e2e` test you have to clean-up `room_availability` entry.

```sql
select * from room_availability where room_id = '<replace with id of a room>';

delete from room_availability where room_id = '<replace with id of a room>';
insert into room_availability values ('<replace with id of a room>', '[,]');
```

## How to run

Before running ensure you have following port available as they will be used by docker compose:

- `5432` - PostgreSQL
- `4000` - GraphQL
- `3000` - Web application

```shell
docker compose up
```

Once the application is up and running you can access it the browser by going to [http://localhost:3000](http://localhost:3000).

## Testing

We use cypress for testing, configured in the [e2e](./e2e) directory. To run the test:

```shell
cd e2e
npm run run
```

To open in visual mode:

```shell
cd e2e
npm run open
```

## DB

To log in to the database, run the command below. The password is postgres.

```shell
docker compose exec db psql -U postgres -d postgres -W
```
