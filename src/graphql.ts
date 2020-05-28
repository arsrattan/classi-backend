import "reflect-metadata";
import "source-map-support/register"
import Redis from "ioredis";
import {buildSchemaSync} from "type-graphql";
import {ApolloServer} from "apollo-server-lambda";
import {UserResolver} from "./resolvers/UserResolver";
import {ClassResolver} from "./resolvers/ClassResolver";
import {RedisPubSub} from "graphql-redis-subscriptions";
import {PostResolver} from "./resolvers/PostResolver";

const options: Redis.RedisOptions = {
    host: "127.0.0.1",
    port: 6379,
    retryStrategy: times => Math.max(times * 100, 3000),
};

const pubsub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
});

const schema = buildSchemaSync({
    resolvers: [UserResolver, ClassResolver, PostResolver],
    validate: false,
    pubSub: pubsub,
    //authMode: "null",
});

const graphQlServer = new ApolloServer({
    schema,
    playground: true,
    introspection: true,
    context: ({ event, context }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
    }),
});

export function graphqlHandler(event, context, cb) {
    context.callbackWaitsForEmptyEventLoop = false;
    return graphQlServer.createHandler({
        cors: {
            origin: '*',
        },
    })(event, context, cb);
};

