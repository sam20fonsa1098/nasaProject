import { FilterPlanetsDTO } from '@application/dtos/FilterPlanetsDTO';
import { PlanetDTO } from '@application/dtos/PlanetsDTO';
import { ListPlanetsUseCase } from '@application/useCases/ListPlanetsUseCase';
import { MongoPlanetsRepository } from '@infra/repositories/mongo/MongoPlanetsRepository';

export class PlanetsController {
  private listPlanetsUseCase: ListPlanetsUseCase;

  constructor() {
    this.listPlanetsUseCase = new ListPlanetsUseCase(
      new MongoPlanetsRepository(),
    );
  }

  async list(filter: FilterPlanetsDTO): Promise<Array<PlanetDTO>> {
    return this.listPlanetsUseCase.execute(filter);
  }
}
