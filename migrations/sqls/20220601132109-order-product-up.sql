CREATE TABLE orders_products (
  id serial PRIMARY KEY,
  orderId integer NOT NULL REFERENCES orders(id),
  productId integer NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL
);