const makeGetUser = ({
  userDocumentClient
}) => async ({ userId }) => {
  const params = {
    Key: {
      userId
    }
  };

  return userDocumentClient.get(params).promise();
};

module.exports = { makeGetUser };
