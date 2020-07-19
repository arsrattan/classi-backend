import "reflect-metadata";
import "source-map-support/register";
import { buildSchemaSync } from "type-graphql";
// import { ApolloServer } from "apollo-server-lambda";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./resolvers/UserResolver";
import { ClassResolver } from "./resolvers/ClassResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { userAuthChecker } from "./auth/isAuth";

void (async function bootstrap() {
  const schema = buildSchemaSync({
    resolvers: [UserResolver, ClassResolver, PostResolver],
    validate: false,
    authChecker: userAuthChecker,
  });

  const server = new ApolloServer({
    schema,
    context: () => ({
      authToken: "Bearer test",
    }),
  });

  // Start the server
  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);

  /*
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
      origin: "*",
      credentials: true,
    },
  })(event, context, cb);
}
*/
})();
