import "reflect-metadata";
import "source-map-support/register"
import {buildSchemaSync} from "type-graphql";
import {ApolloServer} from "apollo-server-lambda";
import {UserResolver} from "./resolvers/UserResolver";
import {ClassResolver} from "./resolvers/ClassResolver";
import {PostResolver} from "./resolvers/PostResolver";


const schema = buildSchemaSync({
    resolvers: [UserResolver, ClassResolver, PostResolver],
    validate: false,
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

