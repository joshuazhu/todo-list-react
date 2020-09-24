const uuid = require('uuid');

const makeCreateTodoList = ({
  todoListDocumentClient
}) => async ({
  userId,
  listName
}) => {
  const todoListId = uuid.v4();
  const newTodoList = {
    userId,
    listName,
    completed: false,
    id: todoListId
  };

  const params = {
    Item: newTodoList
  };

  await todoListDocumentClient.put(params).promise();
  return newTodoItem;
};

module.exports = { makeCreateTodoList };
