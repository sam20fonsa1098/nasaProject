import { Planet } from '@domain/entities/Planet';
import { IPlanetsRepository } from './IPlanetsRepository';

export class FakePlanetsRepository implements IPlanetsRepository {
  private planets: Array<Planet> = [];

  async create(planet: Planet): Promise<void> {
    this.planets.push(planet);
  }

  async list(): Promise<Planet[]> {
    return this.planets;
  }
}
