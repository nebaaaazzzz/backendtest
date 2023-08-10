import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID
    email: String
  }

  type Query {
    getMe: User
  }

  type Mutation {
    register(email: String!, password: String!): String
    login(email: String!, password: String!, oneTimeCode: String): String
    enableTwoFactor: String
    changePassword(
      email: String!
      password: String!
      oldPassword: String!
    ): String
  }
`;
export default typeDefs;
