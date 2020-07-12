"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlHandler = void 0;
require("reflect-metadata");
require("source-map-support/register");
const type_graphql_1 = require("type-graphql");
const apollo_server_lambda_1 = require("apollo-server-lambda");
const UserResolver_1 = require("./resolvers/UserResolver");
const ClassResolver_1 = require("./resolvers/ClassResolver");
const PostResolver_1 = require("./resolvers/PostResolver");
const RegistrationResolver_1 = require("./resolvers/RegistrationResolver");
const schema = type_graphql_1.buildSchemaSync({
    resolvers: [UserResolver_1.UserResolver, ClassResolver_1.ClassResolver, PostResolver_1.PostResolver, RegistrationResolver_1.RegistrationResolver],
    validate: false,
});
const graphQlServer = new apollo_server_lambda_1.ApolloServer({
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
function graphqlHandler(event, context, cb) {
    context.callbackWaitsForEmptyEventLoop = false;
    return graphQlServer.createHandler({
        cors: {
            origin: '*',
            credentials: true,
        },
    })(event, context, cb);
}
exports.graphqlHandler = graphqlHandler;
;
//# sourceMappingURL=graphql.js.map