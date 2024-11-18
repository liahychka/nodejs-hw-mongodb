import { initMongoConnection } from "./db";
import { setupServer } from "./server";
import 'dotenv/config';

initMongoConnection().then(() => {
  setupServer();
});