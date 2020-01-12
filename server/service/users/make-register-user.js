const makeRegisterUser = ({
  getUser,
  updateUser
}) => async (newUser) => {
  const { userId } = newUser;

  const user = await getUser({ userId });

  if (!user.userId) {
    return updateUser(newUser);
  }
};

module.exports = { makeRegisterUser };
