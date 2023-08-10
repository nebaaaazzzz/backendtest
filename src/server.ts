import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers/resolvers";
import typeDefs from "./schema";
import express from "express";
import mongoose from "mongoose";
import User from "./models/User";
import { verifyJwtToken } from "./helpers/jwt";

async function bootstrap() {
  await mongoose.connect(process.env.DATABASE_URL);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      if (req.headers.authorization) {
        const token: string = req.headers.authorization.split(" ")[1];
        const userPayload = verifyJwtToken(token);
        const user = await User.findById(userPayload.sub);
        return { user };
      }
    },
  });
  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}
bootstrap();
