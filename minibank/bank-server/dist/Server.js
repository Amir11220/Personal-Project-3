"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Customer_1 = __importDefault(require("./routes/Customer"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const startServer = async () => {
    try {
        await (0, typeorm_1.createConnection)({
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
    }
    catch (error) {
        console.error("Unable to connect to database:", error);
        process.exit(1);
    }
    app.use('/api', Customer_1.default);
    app.listen(port, () => console.log(`Server started at: http://localhost:${port}`));
};
startServer();
//# sourceMappingURL=Server.js.map
