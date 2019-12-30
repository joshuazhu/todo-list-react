const { ApolloServer, gql } = require('apollo-server-lambda');
const get = require('lodash/get');
const { makeTodoListServiceFromContext } = require('./context/make-todo-list-service');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type TodoItem {
    id: ID!
    userId: String
    name: String
    completed: Boolean
  }

  type TodoListEchoResponse {
    echo: String
  }

  input TodoListEchoInput {
    echo: String
  }

  input TodoItemInput {
    name: String!
    completed: Boolean
    userId: String!
  }

  type Query {
    todoListHealthCheck: Boolean!
    todoLists(userId: String!): [TodoItem]
  }

  type Mutation {
    todoListEcho(input: TodoListEchoInput!): TodoListEchoResponse
    createNewTodoItem(input: TodoItemInput!): TodoItem
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todoListHealthCheck: (root, args, context) => true,
    todoLists: (root, args, context) => {
      const userId = get(args, 'userId');
      return context.todoList.getTodoList({ userId });
    }
  },
  Mutation: {
    todoListEcho: (root, args) => ({ echo: args.input.echo }),
    createNewTodoItem: (root, args, context) => {
      const newTodoItem = get(args, 'input');

      return context.todoList.create(newTodoItem);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    todoList: makeTodoListServiceFromContext()
  }
});

exports.graphqlHandler = server.createHandler();
