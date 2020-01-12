const { DynamoDB } = require('aws-sdk');
const {
  makeGetUser,
  makeUpdateUser,
  makeRegisterUser
} = require('../service/users/index');

const makeUserServiceFromContext = () => {
  const userTable = 'users';
  const userDocumentClient = new DynamoDB.DocumentClient({
    params: {
      TableName: userTable
    }
  });

  const getUser = makeGetUser({ userDocumentClient });
  const updateUser = makeUpdateUser({ userDocumentClient });
  const registeruser = makeRegisterUser({ getUser, updateUser });

  return {
    get: getUser,
    update: updateUser,
    register: registeruser
  };
};

module.exports = { makeUserServiceFromContext };
