import axios from 'axios';

export const register = (data) => axios.post('/api/auth/register', data).then(res => res.data);
export const login = (data) => axios.post('/api/auth/login', data).then(res => res.data);