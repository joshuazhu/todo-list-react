const isEmpty = require('lodash/isEmpty');

const makeUpdateTodoList = ({
  todoListDocumentClient,
  getTodoLists
}) => async ({ userId, id, listName, completed = false }) => {
  const todoItem = await getTodoLists({ userId, id });

  if (isEmpty(todoItem)) {
    throw new Error('todo item not exists');
  }

  const params = {
    Key: {
      userId,
      id
    },
    UpdateExpression: `set listName = :listName, completed = :completed`,
    ExpressionAttributeValues: {
      ':listName': listName,
      ':completed': completed
    }
  };

  return todoListDocumentClient.update(params).promise();
};

module.exports = { makeUpdateTodoList };
