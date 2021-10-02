const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("books");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("books");
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    book: async (parent, { bookId }) => {
      return Book.findOne({ _id: bookId });
    },
    me: async (parent, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("books");
      }
      throw new AuthenticationError("You must be logged in");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPW = await user.isCorrectPassword(password);

      if (!correctPW) {
        throw new AuthenticationError(
          "Password or Email address incorrect, please try again"
        );
      }
      const token = signToken(user);
      return { token, user };
    },
    savedBooks: async (parent, { book }, context) => {
      if (context.user) {
        return Book.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("Must be logged in");
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return Book.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBook: { bookId: bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError("Must be logged in");
    },
  },
};
module.exports = resolvers;
