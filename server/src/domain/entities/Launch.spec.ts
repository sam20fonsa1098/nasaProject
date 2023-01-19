import { Launch } from './Launch';

describe('Launch Unit Test', () => {
  it('should be able to create a Launch', () => {
    const launch = new Launch({
      customers: ['samuel'],
      destination: 'planet',
      launchDate: new Date(),
      mission: 'someMission',
      rocket: 'someRocket',
      success: true,
      upcoming: true,
      flightNumber: 0,
    });
    expect(launch.destination).toBe('planet');
  });
});
