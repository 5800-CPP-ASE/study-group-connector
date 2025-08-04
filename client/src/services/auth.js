import axios from 'axios'; 

// regisstration function to post to backend register endpoint
export const register = (data) => axios.post('/api/auth/register', data).then(res => {
  const { token, userId } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  return res.data;
});

// Login funtion to pot to backend login endpoint
export const login = (data) => axios.post('/api/auth/login', data).then(res => {
  const { token, userId } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  return res.data;
});