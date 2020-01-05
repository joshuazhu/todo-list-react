const { ApolloServer, gql, AuthenticationError } = require('apollo-server-lambda');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const get = require('lodash/get');
const { makeTodoListServiceFromContext } = require('./context/make-todo-list-service');

const client = jwksClient({
  jwksUri: 'https://dev-de1a2iwi.au.auth0.com/.well-known/jwks.json'
});

function getKey (header, cb) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return err;
    }
    var signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

const options = {
  audience: 'fpAf2ROBWYllLh4YkWXeGN2hhZNszM86',
  issuer: 'https://dev-de1a2iwi.au.auth0.com/',
  algorithms: ['RS256']
};

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

  input NewTodoItemInput {
    name: String!
    completed: Boolean
    userId: String!
  }

  input TodoItemInput {
    userId: String!
    id: String!
    name: String
    completed: Boolean
  }

  type Query {
    todoListHealthCheck: Boolean!
    todoLists(userId: String!): [TodoItem]
  }

  type Mutation {
    todoListEcho(input: TodoListEchoInput!): TodoListEchoResponse
    createNewTodoItem(input: NewTodoItemInput!): TodoItem
    updateTodoItem(input: TodoItemInput!): TodoItem
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todoListHealthCheck: (root, args, context) => true,
    todoLists: async (root, args, context) => {
      try {
        const { userId } = await context.user;
        return context.todoList.getTodoList({ userId });
      } catch (e) {
        throw new AuthenticationError('You must be logged in to do this');
      }
    }
  },
  Mutation: {
    todoListEcho: (root, args) => ({ echo: args.input.echo }),
    createNewTodoItem: (root, args, context) => {
      try {
        const newTodoItem = get(args, 'input');
        return context.todoList.create(newTodoItem);
      } catch (e) {
        throw new AuthenticationError('You must be logged in to do this');
      }
    },
    updateTodoItem: (root, args, context) => {
      try {
        const updateTodoItem = get(args, 'input');
        return context.todoList.update(updateTodoItem);
      } catch (e) {
        throw new AuthenticationError('You must be logged in to do this');
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event }) => {
    const token = event.headers.authorization;
    const user = new Promise((resolve, reject) => {
      jwt.verify(token, getKey, options, (err, authenticatedUser) => {
        if (err) {
          return reject(err);
        }
        resolve({
          userId: get(authenticatedUser, 'sub'),
          email: get(authenticatedUser, 'email')
        });
      });
    });

    return {
      todoList: makeTodoListServiceFromContext(),
      user
    };
  }
});

exports.graphqlHandler = server.createHandler();
