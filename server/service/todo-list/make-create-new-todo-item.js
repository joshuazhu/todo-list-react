const uuid = require('uuid');

const makeCreatenewTodoItem = ({
  todoListDocumentClient
}) => async ({
  userId,
  name
}) => {
  const newTodoItem = {
    userId,
    name,
    completed: false,
    id: uuid.v4()
  };

  const params = {
    Item: newTodoItem
  };

  await todoListDocumentClient.put(params).promise();
  return newTodoItem;
};

module.exports = { makeCreatenewTodoItem };
