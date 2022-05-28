import handler from '../handlers/user.handler';
import { Router } from 'express';
import { isValidPassword } from '../middleware/isPassword';
import { isValidEmail } from '../middleware/isEmail';
import { tokenValidator } from '../middleware/isToken';

const app = Router();

app.get('/index', tokenValidator, handler.getUsers);

app.get('/show/:id', tokenValidator, handler.getUser);

app.post('/create', isValidEmail, isValidPassword, handler.createUser);

app.put('/update/:id', tokenValidator, handler.updateUser);

app.delete('/delete/:id', tokenValidator, handler.deleteUser);

app.post('/login', handler.loginUser);

export default app;
