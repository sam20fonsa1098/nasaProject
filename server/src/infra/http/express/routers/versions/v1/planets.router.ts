import { PlanetsMiddleware } from '@infra/http/express/middlewares/PlanetsMiddleware';
import { Router } from 'express';

const planetsRouter = Router();
const planetsMiddleware = new PlanetsMiddleware();

planetsRouter.get('/', planetsMiddleware.list.bind(planetsMiddleware));

export { planetsRouter };
