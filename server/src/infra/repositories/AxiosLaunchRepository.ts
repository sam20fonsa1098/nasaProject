import { Launch } from '@domain/entities/Launch';
import { ILaunchRepository } from '@domain/repositories/ILaunchRepository';
import axios from 'axios';
import { MongoLaunchRepository } from './mongo/MongoLaunchRepository';

class AxiosLaunchRepository implements ILaunchRepository {
  private launches: Array<Launch> = [];
  private repository: MongoLaunchRepository = new MongoLaunchRepository();

  abort(flightNumber: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async list(): Promise<Launch[]> {
    const SPACEX_URL = 'https://api.spacexdata.com/v4/launches/query';
    const response = await axios.post(SPACEX_URL, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: 'rocket',
            select: {
              name: 1,
            },
          },
          {
            path: 'payloads',
            select: {
              customers: 1,
            },
          },
        ],
      },
    });
    const launches = response.data.docs;
    for (const launch of launches) {
      const entityLaunch = new Launch({
        flightNumber: launch.flight_number,
        mission: launch.name,
        rocket: launch.rocket.name,
        launchDate: launch.date_local,
        upcoming: launch.upcoming,
        success: launch.success,
        customers: launch.payloads.flatMap(
          (payload: { customers: Array<string> }) => payload.customers,
        ),
        destination: '',
      });
      this.repository.create(entityLaunch);
    }
    return this.launches;
  }

  create(entity: Launch): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { AxiosLaunchRepository };
