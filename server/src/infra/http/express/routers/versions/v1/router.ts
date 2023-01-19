import { Router } from 'express';
import { authRouter } from './auth.router';
import { launchesRouter } from './launches.router';
import { planetsRouter } from './planets.router';

const v1Router = Router();

v1Router.use('/planets', planetsRouter);
v1Router.use('/launches', launchesRouter);
v1Router.use('/auth', authRouter);

export { v1Router };
