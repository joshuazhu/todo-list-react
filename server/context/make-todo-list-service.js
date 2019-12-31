const { DynamoDB } = require('aws-sdk');
const {
  makeGetTodoItem,
  makeGetTodoLists,
  makeUpdateTodoItem,
  makeCreatenewTodoItem
} = require('../service/todo-list/index');

const makeTodoListServiceFromContext = () => {
  const todoListTable = 'todos';
  const todoListDocumentClient = new DynamoDB.DocumentClient({
    params: {
      TableName: todoListTable
    }
  });

  const getTodoItem = makeGetTodoItem({ todoListDocumentClient });
  const updateTodoItem = makeUpdateTodoItem({ todoListDocumentClient, getTodoItem });
  return {
    getTodoList: makeGetTodoLists({ todoListDocumentClient }),
    create: makeCreatenewTodoItem({ todoListDocumentClient }),
    get: getTodoItem,
    update: updateTodoItem
  };
};

module.exports = { makeTodoListServiceFromContext };
