import { createServer } from 'http';
import * as dotenv from 'dotenv';
import { app } from './app';
import { connectToMongo } from '@infra/repositories/mongo/connection';
// import { join } from 'path';
// import { readFileSync } from 'fs';

async function startServer() {
  dotenv.config();
  await connectToMongo(`${process.env.MONGO_URL}`);
  // return createServer(
  //   {
  //     cert: readFileSync(join(__dirname, '..', '..', '..', '..', 'cert.pem')),
  //     key: readFileSync(join(__dirname, '..', '..', '..', '..', 'key.pem')),
  //   },
  //   app,
  // );
  return createServer(app);
}

startServer()
  .then((server) => {
    server.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
