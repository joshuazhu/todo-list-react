const isEmpty = require('lodash/isEmpty');

const makeUpdateTodoItem = ({
  todoListDocumentClient,
  getTodoItem
}) => async (updateTodoItem) => {
  const { userId, id } = updateTodoItem;
  const todoItem = await getTodoItem({ userId, id });

  if (isEmpty(todoItem)) {
    throw new Error('todo item not exists');
  }

  const params = {
    Item: updateTodoItem
  };

  await todoListDocumentClient.put(params).promise();
  return updateTodoItem;
};

module.exports = { makeUpdateTodoItem };
