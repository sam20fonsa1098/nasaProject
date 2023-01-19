import { Launch } from '@domain/entities/Launch';
import { IBaseRepository } from './IBaseRepository';

export interface ILaunchRepository extends IBaseRepository<Launch> {
  abort(flightNumber: number): Promise<void>;
}
