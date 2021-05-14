import basicAuth from 'express-basic-auth';

export default basicAuth({
    users:{
        username:'password',
    }
});
