import customizeAxios from './customize-axios';

const fetchAllUser = (page) => {
  return customizeAxios.get(`/api/users?page=${page}`); 
}

const postCreateUser = (name, job) => {
  return customizeAxios.post("/api/users", {name, job});
}

export {
  fetchAllUser,
  postCreateUser
}