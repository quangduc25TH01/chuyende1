import axios from './axios';

const Auth = (() => {
  const me = () => {
    return axios.get('/auth/me');
  };

  const login = (data: any) => {
    return axios.post('/auth/login', data);
  };

  const register = (data: any) => {
    return axios.post('/auth/register', data);
  };

  const logout = () => {
    return axios.post('/auth/logout');
  };

  return {
    me,
    login,
    register,
    logout,
  };
})();

export default Auth;
