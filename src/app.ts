import express from "express";
import * as bodyParser from "body-parser";
import { UserRoutes } from "../routes/userRoutes";
import {ClassRoutes} from "../routes/classRoutes";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public routes(): void {
        this.app.use("/api/classes", new ClassRoutes().router);
        this.app.use("/api/users", new UserRoutes().router);
    }

    public config(): void {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(bodyParser.json());
    }

    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log(" API is running at http://localhost:%d", this.app.get("port"));
        });
    }
}

const server = new App();

server.start();
