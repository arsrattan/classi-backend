import "reflect-metadata";
import express, {Application} from "express";
import * as http from 'http'
import Redis from "ioredis";
import * as bodyParser from "body-parser";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server-express";
import {UserResolver} from "./resolvers/UserResolver";
import {ClassResolver} from "./resolvers/ClassResolver";
import {RedisPubSub} from "graphql-redis-subscriptions";
import {PostResolver} from "./resolvers/PostResolver";

class App {
    public config(app: Application): void {
        app.set("port", process.env.PORT || 3000);
        app.use(express.json());
        app.use(bodyParser.json());
    }

    public async start(): Promise<void> {
        let app = express();
        this.config(app);
        const options: Redis.RedisOptions = {
            host: "127.0.0.1",
            port: 6379,
            retryStrategy: times => Math.max(times * 100, 3000),
        };
        const pubsub = new RedisPubSub({
            publisher: new Redis(options),
            subscriber: new Redis(options)
        });
        const schema = await buildSchema({
            resolvers: [UserResolver, ClassResolver, PostResolver],
            emitSchemaFile: true,
            validate: false,
            pubSub: pubsub
            //authMode: "null",
        });

        const graphQlServer = new ApolloServer({schema, context: ({ req }) => {
                return {req};
            }
        });
        graphQlServer.applyMiddleware({app});
        const httpServer = http.createServer(app);
        graphQlServer.installSubscriptionHandlers(httpServer);
        httpServer.listen(app.get("port"), () => {
            console.log(`🚀 Server ready at http://localhost:${app.get("port")}${graphQlServer.graphqlPath}`)
            console.log(`🚀 Subscriptions ready at ws://localhost:${app.get("port")}${graphQlServer.subscriptionsPath}`)
        })
    }
}
const server = new App();
server.start();
