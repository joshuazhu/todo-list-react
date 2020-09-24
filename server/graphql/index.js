const { ApolloServer } = require('apollo-server-lambda');
const { makeTodoListServiceFromContext } = require('../context/make-todo-list-service');
const { typeDefs, resolvers } = require('./schemas');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event }) => ({
    todoList: makeTodoListServiceFromContext()
  })
});

exports.handler = server.createHandler();
