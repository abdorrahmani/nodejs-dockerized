import {createClient} from 'redis';
import mongoose from 'mongoose';
import express from "express"
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 3000;

const mongoURI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}` +
    `@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

mongoose.connect(mongoURI)
    .then(() => console.log(`Connected to MongoDB at ${mongoURI}`))
    .catch((err) => console.error('MongoDB connection error:', err));

const redisClient = createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}` +
        `@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on('connect', () => {
    console.log(`Connected to Redis at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

await redisClient.connect();

app.get('/', async (req, res) => {
    try {
        const appName = process.env.APP_NAME || 'Node.js App';
        res.status(200).send(`Welcome to ${appName}!`);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred!' });
    }
});

app.get('/cache', async (req, res) => {
    try {
        const key = 'sampleKey';
        const value = await redisClient.get(key);

        if (value) {
            return res.status(200).send({ message: 'Cache Hit', data: value });
        }

        const newValue = 'This is a cached value.';
        await redisClient.set(key, newValue, { EX: 60 });
        res.status(200).send({ message: 'Cache Miss', data: newValue });
    } catch (error) {
        console.error('Redis error:', error);
        res.status(500).send({ error: 'An error occurred!' });
    }
});

app.get('/mongo', async (req, res) => {
    try {
        const collection = mongoose.connection.db.collection('anophel');
        await collection.insertOne({ message: 'Hello, MongoDB!' })

        const result = await collection.findOne({});
        res.status(200).send({ message: 'MongoDB Data', data: result });
    } catch (error) {
        console.error('MongoDB error:', error);
        res.status(500).send({ error: 'An error occurred!' });
    }
});

app.listen(PORT, () => {
    console.log(`${process.env.APP_NAME || 'App'} running at http://localhost:${PORT}`);
});