import orderRoutes from './order.routes';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import { Application } from 'express';

export function allRoutes(app: Application): void {
  app.use('/orders', orderRoutes);
  app.use('/users', userRoutes);
  app.use('/products', productRoutes);
}
