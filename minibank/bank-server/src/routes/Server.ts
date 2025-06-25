import express from 'express';
import { createConnection } from 'typeorm';
import bankerRouter from './routes/Banker';
import customerRouter from './routes/Customer';
import transactionRouter from './routes/Transaction';

const app = express();
const port = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "wweabc123",
            database: "minibank",
            synchronize: true,
            entities: [__dirname + "/entities/*{.js,.ts}"]
        });
        console.log("connected to postgres database...");
    } catch (error) {
        console.error("Unable to connect to database:", error);
        process.exit(1);
    }

    app.use(express.json());
    app.use('/api', customerRouter);
    app.use('/api', bankerRouter);
    app.use('/api', transactionRouter);
    app.listen(port, () => console.log(`Server started at: http://localhost:${port}`));
};

startServer();
