import { initMongoConnection } from "./db";
import { setupServer } from "./server";

setupServer();
initMongoConnection();