import "reflect-metadata";
import "source-map-support/register"
import {buildSchemaSync} from "type-graphql";
import {ApolloServer} from "apollo-server-lambda";
import {UserResolver} from "./resolvers/UserResolver";
import {ClassResolver} from "./resolvers/ClassResolver";
import {PostResolver} from "./resolvers/PostResolver";
import {RegistrationResolver} from "./resolvers/RegistrationResolver";


const schema = buildSchemaSync({
    resolvers: [UserResolver, ClassResolver, PostResolver, RegistrationResolver],
    validate: false,
    //authMode: "null",
});

const graphQlServer = new ApolloServer({
    schema,
    context: ({ event, context }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
    }),
    playground: true,
    introspection: true,
});

export function graphqlHandler(event, context, cb) {
    context.callbackWaitsForEmptyEventLoop = false;
    return graphQlServer.createHandler({
        cors: {
            origin: '*',
            credentials: true,
        },
    })(event, context, cb);
};

