const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profiles(profileID: ID!): Profile
    me: Profile
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    savedBooks(bookID: bookID!): Book
    removeBook(savedBook: bookID!, bookID: ID!): Book
  }
`;

module.exports = typeDefs;
