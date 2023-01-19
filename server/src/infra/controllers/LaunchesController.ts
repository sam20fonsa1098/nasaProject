import { LaunchDTO } from '@application/dtos/LaunchDTO';
import { CreateLaunchUseCase } from '@application/useCases/CreateLaunchUseCase';
import { ListLaunchesUseCase } from '@application/useCases/ListLaunchesUseCase';
import { IPaging } from '@domain/repositories/IBaseRepository';
import { MongoLaunchRepository } from '@infra/repositories/mongo/MongoLaunchRepository';

export class LaunchesController {
  private listLaunchesUseCase: ListLaunchesUseCase;
  private creteLaunchUseCase: CreateLaunchUseCase;

  constructor() {
    const repository = new MongoLaunchRepository();
    this.listLaunchesUseCase = new ListLaunchesUseCase(repository);
    this.creteLaunchUseCase = new CreateLaunchUseCase(repository);
  }

  async list(paging: IPaging): Promise<Array<LaunchDTO>> {
    return this.listLaunchesUseCase.execute(paging);
  }

  async create(launch: LaunchDTO): Promise<void> {
    await this.creteLaunchUseCase.execute(launch);
  }
}
