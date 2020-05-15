import express, {Application} from "express";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server-express";
import {UserResolver} from "./resolvers/UserResolver";
import {ClassResolver} from "./resolvers/ClassResolver";
import PostController from "./controllers/PostController";

class App {
    public config(app: Application): void {
        app.set("port", process.env.PORT || 3000);
        app.use(express.json());
        app.use(bodyParser.json());
    }

    public async start(): Promise<void> {
        let app = express();
        this.config(app);
        const schema = await buildSchema({
            resolvers: [UserResolver, ClassResolver, PostController],
            emitSchemaFile: true,
            validate: false,
            //authMode: "null",
        });

        let graphQlServer = new ApolloServer({schema, context: ({ req }) => {
                return {req};
            }
        });
        graphQlServer.applyMiddleware({app});
        app.listen(app.get("port"), () => {
            console.log(" API is running at http://localhost:%d%s", app.get("port"), graphQlServer.graphqlPath);
        });
    }
}
const server = new App();
server.start();
