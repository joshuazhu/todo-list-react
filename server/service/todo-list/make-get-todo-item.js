const makeGetTodoItem = ({
  todoListDocumentClient
}) => async ({ userId, id }) => {
  const params = {
    Key: {
      userId,
      id
    }
  };

  return todoListDocumentClient.get(params).promise();
};

module.exports = { makeGetTodoItem };
