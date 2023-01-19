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

  it('should be able to get a list of launches', async () => {
    const response = await request(app)
      .get('/v1/launches')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
    expect(Array.isArray(response.body)).toBeTruthy();
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
