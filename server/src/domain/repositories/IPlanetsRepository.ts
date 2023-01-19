import { Planet } from '@domain/entities/Planet';
import { IBaseRepository } from './IBaseRepository';

export type IPlanetsRepository = IBaseRepository<Planet>;
