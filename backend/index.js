import { ApolloServer } from "@apollo/server";
// 新建server
import { startStandaloneServer } from "@apollo/server/standalone";
// start the server

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server);

console.log(`Server is ready at ${url}`)