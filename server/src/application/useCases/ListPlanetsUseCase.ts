import { FilterPlanetsDTO } from '@application/dtos/FilterPlanetsDTO';
import { PlanetDTO } from '@application/dtos/PlanetsDTO';
import { Planet } from '@domain/entities/Planet';
import { IPlanetsRepository } from '@domain/repositories/IPlanetsRepository';
import { IUseCase } from './IUseCase';

export class ListPlanetsUseCase
  implements IUseCase<FilterPlanetsDTO, Array<PlanetDTO>>
{
  private repository: IPlanetsRepository;

  constructor(repository: IPlanetsRepository) {
    this.repository = repository;
  }

  async execute(filter: FilterPlanetsDTO): Promise<PlanetDTO[]> {
    let planets: Array<Planet> = await this.repository.list({});
    if (filter) {
      planets = planets.filter(
        (planet) => planet.isHabitable === filter.isHabitable,
      );
    }
    const planetsDTO: Array<PlanetDTO> = planets.map((planet) =>
      planet.toJson(),
    );
    return planetsDTO;
  }
}
