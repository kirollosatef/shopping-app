CREATE TABLE orders (
  id serial PRIMARY KEY,
  userId integer NOT NULL REFERENCES users(id),
  status varchar(255) NOT NULL
);