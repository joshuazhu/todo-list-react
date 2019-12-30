const { DynamoDB } = require('aws-sdk');
const { makeGetTodoLists } = require('../service/todo-list/index');
const { makeCreatenewTodoItem } = require('../service/todo-list/make-create-new-todo-item');

const makeTodoListServiceFromContext = () => {
  const todoListTable = 'todos';
  const todoListDocumentClient = new DynamoDB.DocumentClient({
    params: {
      TableName: todoListTable
    }
  });

  return {
    getTodoList: makeGetTodoLists({ todoListDocumentClient }),
    create: makeCreatenewTodoItem({ todoListDocumentClient })
  };
};

module.exports = { makeTodoListServiceFromContext };
