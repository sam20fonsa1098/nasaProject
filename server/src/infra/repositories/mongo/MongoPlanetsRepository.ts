import { Planet } from '@domain/entities/Planet';
import { IPlanetsRepository } from '@domain/repositories/IPlanetsRepository';
import { planetModel } from './schemas/Planets';

export class MongoPlanetsRepository implements IPlanetsRepository {
  async list(): Promise<Planet[]> {
    const planets = await planetModel.find({});
    return planets.map((planet) => new Planet(planet));
  }

  async create(entity: Planet): Promise<void> {
    await planetModel.updateOne(
      { kepler_name: entity.kepler_name },
      entity.toJson(),
      { upsert: true },
    );
  }
}
