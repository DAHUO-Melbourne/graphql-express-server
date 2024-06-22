import { ApolloServer } from "@apollo/server";
// 新建server
import { startStandaloneServer } from "@apollo/server/standalone";
// start the server
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers
})

const { url } = await startStandaloneServer(server);

console.log(`Server is ready at ${url}`)