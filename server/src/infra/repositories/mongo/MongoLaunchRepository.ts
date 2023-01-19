import { Launch } from '@domain/entities/Launch';
import { IPaging } from '@domain/repositories/IBaseRepository';
import { ILaunchRepository } from '@domain/repositories/ILaunchRepository';
import { launchModel } from './schemas/Launch';

export class MongoLaunchRepository implements ILaunchRepository {
  async list(paging: IPaging): Promise<Launch[]> {
    const launches = await launchModel
      .find({})
      .skip(
        paging && paging.page ? (paging.page - 1) * (paging.limit || 10) : 1,
      )
      .limit(paging && paging.limit ? paging.limit : 10)
      .sort({ flightNumber: 1 });
    return launches.map((launch) => new Launch(launch));
  }

  async create(entity: Launch): Promise<void> {
    const latestLaunch = await launchModel.findOne().sort('-flightNumber');
    let flightNumber = 0;
    if (latestLaunch) {
      flightNumber = latestLaunch.flightNumber + 1;
    }
    await launchModel.findOneAndUpdate({ flightNumber }, entity.toJson(), {
      upsert: true,
    });
  }

  async abort(flightNumber: number): Promise<void> {
    await launchModel.updateOne(
      {
        flightNumber,
      },
      {
        upcoming: false,
        success: false,
      },
    );
  }
}
