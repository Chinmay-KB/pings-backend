import basicAuth from 'express-basic-auth';

// TODO will be changed
export default basicAuth({
  users: {
    username: 'password',
  },
});
