import { LaunchDTO } from '@application/dtos/LaunchDTO';
import { Launch } from '@domain/entities/Launch';
import { ILaunchRepository } from '@domain/repositories/ILaunchRepository';
import { IUseCase } from './IUseCase';

export class CreateLaunchUseCase implements IUseCase<LaunchDTO, void> {
  private repository: ILaunchRepository;

  constructor(repository: ILaunchRepository) {
    this.repository = repository;
  }

  async execute(launchDTO: LaunchDTO): Promise<void> {
    const launch = new Launch(launchDTO);
    await this.repository.create(launch);
  }
}
