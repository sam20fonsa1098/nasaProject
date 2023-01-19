import { Launch } from '@domain/entities/Launch';
import { ILaunchRepository } from './ILaunchRepository';

export class FakeMapLaunchRepository implements ILaunchRepository {
  private launches: Map<number, Launch> = new Map();
  private flightNumber = 0;

  async list(): Promise<Launch[]> {
    return [...this.launches.values()];
  }

  async create(launch: Launch): Promise<void> {
    Object.assign(launch, {
      _flightNumber: this.flightNumber,
    });
    this.launches.set(this.flightNumber, launch);
    this.flightNumber++;
  }

  abort(flightNumber: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
