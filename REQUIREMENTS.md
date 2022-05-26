# API Requirements

## API Endpoints

### Products

- Index `/products/index` [GET] [token required]
- Read `/products/show/:id` [GET] [token required]
- Create `/products/create` [POST] [token required]

      Data = {
        name: req.body.name,
        price: req.body.price,
      };

- Update `/products/update/:id` [PUT] [token required]

      Data = {
        name: req.body.name,
        price: req.body.price,
      };

- Delete `/products/delete/:id` [DELETE] [token required]

---

### Users

- Index `/users/index` [GET] [token required]
- Read `/users/show/:id` [GET] [token required]
- Create `/users/create` [POST]

      Data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        streetNumber: req.body.streetNumber,
        streetName: req.body.streetName,
        city: req.body.city,
      };

- Update `/users/update/:id` [PUT] [token required]

      Data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        streetNumber: req.body.streetNumber,
        streetName: req.body.streetName,
        city: req.body.city,
      };

- Delete `/users/delete/:id` [DELETE] [token required]
- Auth `/users/login` [POST]

      Data = {
        email: req.body.email,
        password: req.body.password,
      };

---

### Orders

- Index `/orders/index` [GET] [token required]
- Read `/orders/show/:id` [GET] [token required]
- Create `/orders/create` [POST] [token required]

      Data = {
        products: req.body.products,
        userId: req.body.userId,
        status: req.body.status,
      };

- Update `/orders/update/:id` [PUT] [token required]

      Data = {
        products: req.body.products,
        userId: req.body.userId,
        status: req.body.status,
      };

- Delete `/orders/delete/:id` [DELETE] [token required]

---

---

## Data Shapes

### Product

#### Table: products

    => id `SERIAL PRIMARY KEY`
    => name `VARCHAR`
    => price `INTEGER`

### User

#### Table: users

    => id `SERIAL PRIMARY KEY`
    => name `VARCHAR`
    => email `VARCHAR`
    => password `VARCHAR`
    => addressId `INTEGER

#### Table: addresses

    => id `SERIAL PRIMARY KEY`
    => streetNumber `INTEGER`
    => streetName `VARCHAR`
    => city `VARCHAR`

### Order

#### Table: orders

    => id `SERIAL PRIMARY KEY`
    => user_id `INTEGER` `REFERENCES users(id)`
    => status `BOOLEAN`

Table: order_products

    => order_id `INTEGER` `REFERENCES orders(id)`
    => product_id `INTEGER` `REFERENCES products(id)`
    => quantity `INTEGER`
