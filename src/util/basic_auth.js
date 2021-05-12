import basicAuth from 'express-basic-auth';

const auth = basicAuth({
  users: {
    username: 'password',
  },
});

export default auth;
