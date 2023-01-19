import { connect, disconnect } from 'mongoose';

async function connectToMongo(mongoUrl: string) {
  await connect(mongoUrl);
}

async function disconnectToMongo() {
  await disconnect();
}

export { connectToMongo, disconnectToMongo };
