import mongoose from 'mongoose';

require('dotenv').config();

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

export async function initMongoConnection() {
    await mongoose.connect(`mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/contacts${MONGODB_DB}`);
    console.log("Mongo connection successfully established!");   
};
