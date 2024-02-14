CREATE TABLE room (
  room_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  price DECIMAL NOT NULL,
  image VARCHAR(255) NOT NULL
);

INSERT INTO room (name, price, image) VALUES ( 'Room 1', 100, 'images/147562016.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 2', 200, 'images/182122162.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 3', 300, 'images/185343591.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 4', 400, 'images/2064524.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 5', 500, 'images/25362760.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 6', 110, 'images/27739069.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 7', 120, 'images/295988113.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 8', 130, 'images/295995447.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 9', 140, 'images/343917485.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 10', 150, 'images/352237324.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 11', 800, 'images/386301443.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 12', 900, 'images/389160759.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 13', 350, 'images/405119700.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 14', 160, 'images/438373260.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 15', 700, 'images/448717302.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 16', 100, 'images/484049253.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 17', 680, 'images/484050625.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 18', 540, 'images/494663886.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 19', 300, 'images/50781474.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 20', 530, 'images/86639018.webp');
INSERT INTO room (name, price, image) VALUES ( 'Room 21', 150, 'images/99861737.webp');

CREATE TABLE booking (
  booking_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  CONSTRAINT fk_room_booking FOREIGN KEY (room_id) REFERENCES room(room_id)
);

-- available rooms by date range at least ( this is simple as we have to filter between dates)

