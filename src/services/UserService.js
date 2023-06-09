import customizeAxios from './customize-axios';

const fetchAllUser = () => {
  return customizeAxios.get('/api/users?page=1'); 
}

export {
  fetchAllUser
}