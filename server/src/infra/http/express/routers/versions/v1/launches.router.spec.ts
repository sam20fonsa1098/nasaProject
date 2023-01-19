import {
  connectToMongo,
  disconnectToMongo,
} from '@infra/repositories/mongo/connection';
import request from 'supertest';
import * as dotenv from 'dotenv';
import { app } from '@infra/http/express/app';

describe('E2E launches tests', () => {
  beforeAll(async () => {
    dotenv.config();
    await connectToMongo(`${process.env.TEST_MONGO_URL}`);
  });

  it('should not be able to get a list of launches', async () => {
    await request(app)
      .get('/v1/launches')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(401);
  });

  it('should be able to create a launch', async () => {
    await request(app)
      .post('/v1/launches')
      .send({
        customers: ['samuel'],
        destination: 'planet',
        launchDate: new Date(),
        mission: 'someMission',
        rocket: 'someRocket',
        success: true,
        upcoming: true,
      })
      .expect(201);
  });

  afterAll(async () => {
    await disconnectToMongo();
  });
});
