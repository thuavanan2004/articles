import express, { Express } from "express";
import env from "dotenv";
env.config();
import connect from "./config/database";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolver";
import { requireAuth } from "./middlewares/auth.middleware";

const startServer = async () => {
  connect();

  const app: Express = express();
  const port: string | number = process.env.PORT || 3002;

  // GraphQL
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: (context) => {
      return context;
    },
  });
  app.use("/graphql", requireAuth);
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: app,
    path: "/graphql",
  });

  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
};

startServer();
