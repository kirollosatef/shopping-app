CREATE TABLE users
(
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  address varchar(255) NOT NULL
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
CREATE TABLE orders_products
(
  id serial PRIMARY KEY,
  orderId integer NOT NULL REFERENCES orders(id),
  productId integer NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL
);