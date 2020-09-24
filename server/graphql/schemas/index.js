const { gql } = require('apollo-server-lambda');
const { get, property } = require('lodash');
const { USER_ID } = require('../../constant');
const typeDefs = gql`
  type TodoList {
    id: ID!
    userId: String
    listName: String
    completed: Boolean
  }

  type UpdateResponse {
    success: Boolean!
  }

  input TodoItemInput {
    listName: String
  }

  type Query {
    todoListHealthCheck: Boolean!
    todoLists: [TodoList]
  }

  type Mutation {
    todoListCreate(input: TodoItemInput!): TodoList
    todoListUpdate(id:ID! input: TodoItemInput!): UpdateResponse
  }
`;

const resolvers = {
  Query: {
    todoListHealthCheck: (root, args, context) => true,
    todoLists: async (root, args, context) => {
      return context.todoList.getTodoLists({ userId: USER_ID });
    }
  },
  Mutation: {
    todoListCreate: (root, args, context) => {
      const newTodoItem = get(args, 'input');
      return context.todoList.create({
        ...newTodoItem,
        userId: USER_ID
      });
    },
    todoListUpdate: async (root, args, context) => {
      const { listName } = get(args, 'input');
      const id = get(args, 'id');

      await context.todoList.update({
        id,
        listName,
        userId: USER_ID
      });

      return {
        success: true
      };
    }
  }
};

module.exports = {
  resolvers,
  typeDefs
};
