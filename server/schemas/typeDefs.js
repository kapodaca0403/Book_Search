const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    savedBooks(book: saveBook): User
    removeBook(bookID: String): User
  }
  input SaveBook {
    bookID: String
    authors: [String]
    description: String
    title: String
    link: String
    image: String
  }
  type Book {
    bookID: String
    authors: [String]
    description: String
    title: String
    link: String
    image: String
  }
`;

module.exports = typeDefs;
