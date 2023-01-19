import { Planet } from '@domain/entities/Planet';
import { IPlanetsRepository } from '@domain/repositories/IPlanetsRepository';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Duplex } from 'stream';
import { MongoPlanetsRepository } from './mongo/MongoPlanetsRepository';

export class CsvPlanetsRepository implements IPlanetsRepository {
  private planets: Array<Planet> = [];
  private repository: MongoPlanetsRepository = new MongoPlanetsRepository();

  async create(planet: Planet): Promise<void> {
    this.planets.push(planet);
  }

  async list(): Promise<Planet[]> {
    if (this.planets.length > 0) {
      return this.planets;
    }
    return new Promise((resolve, reject) => {
      const duplexStream: Duplex = createReadStream(
        join(__dirname, '..', '..', '..', 'data', 'kepler_data.csv'),
      ).pipe(
        parse({
          comment: '#',
          columns: true,
          delimiter: ',',
        }),
      );

      duplexStream.on('data', (planet: Planet) => {
        const entityPlanet = new Planet(planet);
        this.repository.create(entityPlanet);
        this.planets.push(entityPlanet);
      });

      duplexStream.on('end', () => {
        resolve(this.planets);
      });

      duplexStream.on('error', (error) => {
        reject(error);
      });
    });
  }
}
