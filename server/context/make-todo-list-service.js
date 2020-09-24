const { DynamoDB } = require('aws-sdk');
const {
  makeGetTodoLists,
  makeUpdateTodoList,
  makeCreateTodoList
} = require('../service/todo-list/index');

const makeTodoListServiceFromContext = () => {
  const todoListTable = 'todos';
  const todoListDocumentClient = new DynamoDB.DocumentClient({
    params: {
      TableName: todoListTable
    }
  });

  const getTodoLists = makeGetTodoLists({ todoListDocumentClient });
  const updateTodoList = makeUpdateTodoList({ todoListDocumentClient, getTodoLists });
  return {
    getTodoLists: makeGetTodoLists({ todoListDocumentClient }),
    create: makeCreateTodoList({ todoListDocumentClient }),
    get: getTodoLists,
    update: updateTodoList
  };
};

module.exports = { makeTodoListServiceFromContext };
