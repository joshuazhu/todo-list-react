const makeUpdateUser = ({
  userDocumentClient
}) => async (updateUser) => {
  const params = {
    Item: updateUser
  };

  await userDocumentClient.put(params).promise();
  return updateUser;
};

module.exports = { makeUpdateUser };
