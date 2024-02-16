CREATE EXTENSION btree_gist;

CREATE TABLE room (
  room_id uuid CONSTRAINT pk_room_id PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  price NUMERIC NOT NULL,
  image VARCHAR(255) NOT NULL
  -- other columns
  -- ,location POINT NOT NULL
  -- ,hotel_id uuid NOT NULL
);

CREATE TABLE room_availability (
  room_id uuid NOT NULL,
  availability daterange,
  EXCLUDE USING GIST (room_id WITH =, availability WITH &&),
  CONSTRAINT fk_room_room_availability FOREIGN KEY (room_id) REFERENCES room(room_id)
);

CREATE INDEX room_availability_room_id_idx ON room_availability USING GIST (availability);
CREATE INDEX room_availability_availability_idx ON room_availability USING GIST (availability);


WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 1', 100, 'images/147562016.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 2', 200, 'images/182122162.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 3', 300, 'images/185343591.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 4', 400, 'images/2064524.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 5', 500, 'images/25362760.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 6', 110, 'images/27739069.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 7', 120, 'images/295988113.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 8', 130, 'images/295995447.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 9', 140, 'images/343917485.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 10', 150, 'images/352237324.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 11', 800, 'images/386301443.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 12', 900, 'images/389160759.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 13', 350, 'images/405119700.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 14', 160, 'images/438373260.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 15', 700, 'images/448717302.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 16', 100, 'images/484049253.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 17', 680, 'images/484050625.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 18', 540, 'images/494663886.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 19', 300, 'images/50781474.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 20', 530, 'images/86639018.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;

WITH rows AS (
INSERT INTO room (name, price, image) VALUES ( 'Room 21', 150, 'images/99861737.webp') RETURNING room_id
)
INSERT INTO room_availability (room_id, availability) 
SELECT room_id, '[,]'::daterange 
FROM rows;


CREATE TABLE booking (
  booking_id uuid CONSTRAINT pk_booking_id PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_room_booking FOREIGN KEY (room_id) REFERENCES room(room_id)
);

-- Testing
-- insert into room_availability (room_id, availability) 
-- values ('b5c3d6a1-6f2f-4f5e-bc0e-2b3d330f9d4f', '[,]');
-- insert into room_availability (room_id, availability) 
-- values ('ceb0725e-b644-4458-add5-3ec888039a29', '[,2024-02-14)');
-- insert into room_availability (room_id, availability) 
-- values ('ceb0725e-b644-4458-add5-3ec888039a29', '(2024-02-16,]');
--
-- delete from room_availability where room_id = '1dd6c377-bdce-42ec-8f7c-80cf5aad6351';
-- insert into room_availability (room_id, availability) 
-- values ('1dd6c377-bdce-42ec-8f7c-80cf5aad6351', '[,2024-02-14)');
-- insert into room_availability (room_id, availability) 
-- values ('1dd6c377-bdce-42ec-8f7c-80cf5aad6351', '(2024-02-16,]');


-- what and wher
-- select * from room_availability where availability @> '[2024-02-14, 2024-02-16]'::daterange;
-- select "room".* from "room" inner join "room_availability" on "room"."room_id" = "room_availability"."room_id" where room_availability.availability @> '[2024-02-17, 2024-02-24]'::daterange;
-- select * from room_availability where availability @> '[2024-02-17, 2024-02-24]'::daterange;
-- select "room".* from "room" inner join "room_availability" on "room"."room_id" = "room_availability"."room_id" where room_availability.availability @> '[2024-02-17, 2024-02-24]'::daterange;
--
-- -- explain
-- explain select * from room_availability where availability @> '[2024-02-14, 2024-02-16]'::daterange;
-- explain select * from room_availability where availability @> '[2024-02-17, 2024-02-24]'::daterange;

/*
If a table is small (very roughly 100 rows or fewer), Postgres may estimate that it will be faster to read the table sequentially and filter out rows as needed, even for highly selective queries.
set enable_seqscan = off;

postgres=# explain select * from room_availability where availability @> '[2024-02-17, 2024-02-24]'::d
aterange;
                            QUERY PLAN                            
------------------------------------------------------------------
 Seq Scan on room_availability  (cost=0.00..1.04 rows=1 width=48)
   Filter: (availability @> '[2024-02-17,2024-02-25)'::daterange)
(2 rows)


                                           QUERY PLAN                                           
------------------------------------------------------------------------------------------------
 Index Scan using room_availability_idx on room_availability  (cost=0.13..8.15 rows=1 width=48)
   Index Cond: (availability @> '[2024-02-17,2024-02-25)'::daterange)
(2 rows)
*/
