import { Request, Response } from 'express';
import { PlanetsController } from '@infra/controllers/PlanetsController';
import { FilterPlanetsDTO } from '@application/dtos/FilterPlanetsDTO';

export class PlanetsMiddleware {
  private planetsController: PlanetsController = new PlanetsController();

  public async list(request: Request, response: Response): Promise<void> {
    const query: FilterPlanetsDTO = {
      ...request.query,
      isHabitable: Boolean(request.query.isHabitable),
    };
    const planetsDTO = await this.planetsController.list(query);
    response.json(planetsDTO);
    return;
  }
}
