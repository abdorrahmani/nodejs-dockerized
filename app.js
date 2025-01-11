import { createClient } from 'redis';
import {MongoClient} from "mongodb";
import express from "express"

const app = express();
const port = 3000;

const redisClient = createClient({ url: 'redis://redis:6379' });
redisClient.on('error', (err) => console.error('Redis Error:', err));

const mongoUrl = 'mongodb://mongo:27017';
const mongoClient = new MongoClient(mongoUrl);

app.get('/', async (req, res) => {
    try {
        await redisClient.connect();
        await mongoClient.connect();

        const db = mongoClient.db('testdb');
        const collection = db.collection('testCollection');

        await redisClient.set('key', 'Hello, Redis!');

        const redisValue = await redisClient.get('key');

        await collection.insertOne({ message: 'Hello, MongoDB!' });

        const mongoDoc = await collection.findOne();

        res.json({
            redisValue,
            mongoDoc,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong!');
    } finally {
        await redisClient.disconnect();
        await mongoClient.close();
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
