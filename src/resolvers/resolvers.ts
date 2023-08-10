import register from "./mutation/register.resolver";
import login from "./mutation/login.resolver";
import changePassword from "./mutation/changePassword.resolver";
import getMe from "./query/getme.resolver";
import enableTwoFactor from "./mutation/enableTwoFactor.resolver";
const resolvers = {
  Query: {
    getMe,
  },
  Mutation: {
    register,
    login,
    enableTwoFactor,
    changePassword,
  },
};

export default resolvers;
