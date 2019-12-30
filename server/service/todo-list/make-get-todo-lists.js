const get = require('lodash/get');

const makeGetTodoLists = ({
  todoListDocumentClient
}) => async ({ userId }) => {
  const params = {
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  };

  const response = await todoListDocumentClient.query(params).promise();
  return get(response, 'Items') || [];
};

module.exports = { makeGetTodoLists };
