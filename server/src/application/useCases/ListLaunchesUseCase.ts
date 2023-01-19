import { LaunchDTO } from '@application/dtos/LaunchDTO';
import { ILaunch } from '@domain/entities/Launch';
import { IPaging } from '@domain/repositories/IBaseRepository';
import { ILaunchRepository } from '@domain/repositories/ILaunchRepository';
import { IUseCase } from './IUseCase';

export class ListLaunchesUseCase
  implements IUseCase<IPaging, Array<LaunchDTO>>
{
  private repository: ILaunchRepository;

  constructor(repository: ILaunchRepository) {
    this.repository = repository;
  }

  async execute(paging: IPaging): Promise<ILaunch[]> {
    const launches = await this.repository.list(paging);
    return launches.map((launch) => launch.toJson());
  }
}
