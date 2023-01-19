import { AuthMiddleware } from '@infra/http/express/middlewares/AuthMiddleware';
import { LaunchesMiddleware } from '@infra/http/express/middlewares/LaunchesMiddleware';
import { Router } from 'express';

const launchesRouter = Router();
const launchesMiddleware = new LaunchesMiddleware();

launchesRouter.get(
  '/',
  AuthMiddleware.authenticate,
  launchesMiddleware.list.bind(launchesMiddleware),
);

launchesRouter.post('/', launchesMiddleware.create.bind(launchesMiddleware));

export { launchesRouter };
