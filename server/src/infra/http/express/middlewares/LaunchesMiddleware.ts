import { Request, Response } from 'express';
import { LaunchesController } from '@infra/controllers/LaunchesController';

export class LaunchesMiddleware {
  private launchesController = new LaunchesController();

  public async list(request: Request, response: Response): Promise<void> {
    const launches = await this.launchesController.list(request.query);
    response.json(launches);
    return;
  }

  public async create(request: Request, response: Response): Promise<void> {
    await this.launchesController.create({
      ...request.body,
      launchDate: new Date(request.body.launchDate),
    });
    response.sendStatus(201);
    return;
  }
}
