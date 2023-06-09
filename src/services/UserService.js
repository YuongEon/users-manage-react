import customizeAxios from './customize-axios';

const fetchAllUser = (page) => {
  return customizeAxios.get(`/api/users?page=${page}`); 
}

export {
  fetchAllUser
}