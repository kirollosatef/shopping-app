import handler from '../handlers/product.handler';
import { Router } from 'express';
import { tokenValidator } from '../middleware/isToken';

const app = Router();

app.get('/index', handler.getProducts);

app.get('/show/:id', handler.getProduct);

app.post('/create', tokenValidator, handler.createProduct);

app.put('/update/:id', tokenValidator, handler.updateProduct);

app.delete('/delete/:id', tokenValidator, handler.deleteProduct);

export default app;
