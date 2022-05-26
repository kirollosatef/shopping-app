CREATE TABLE addresses
(
  id serial PRIMARY KEY,
  streetNumber INTEGER NOT NULL,
  streetName varchar(255) NOT NULL,
  city varchar(255) NOT NULL,
);
CREATE TABLE users
(
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  addressId integer REFERENCES addresses(id)
);
CREATE TABLE orders
(
  id serial PRIMARY KEY,
  userId integer NOT NULL REFERENCES users(id),
  status varchar(255) NOT NULL
);
CREATE TABLE products
(
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  price integer NOT NULL
);
CREATE TABLE oreders_products
(
  id serial PRIMARY KEY,
  orderId integer NOT NULL REFERENCES orders(id),
  productId integer NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL
);