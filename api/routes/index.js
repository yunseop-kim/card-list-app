import userRouter from './user';
import itemRouter from './item';

const applyRoutes = (app) => {
  app.use('/user', userRouter);
  app.use('/', itemRouter);
};

export default applyRoutes;
