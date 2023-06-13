import customizeAxios from './customize-axios';

const fetchAllUser = (page) => {
  return customizeAxios.get(`/api/users?page=${page}`); 
}

const postCreateUser = (name, job) => {
  return customizeAxios.post("/api/users", {name, job});
}

const putUpdateUser = (id, name, job) => {
  return customizeAxios.put(`/api/users/${id}`, {name, job});
}

const deleteDeleteUser = (id) => {
  return customizeAxios.delete(`/api/users/${id}`)
}

const loginApi = (email, password) => {
  return customizeAxios.post('/api/login', {email, password})
}

export {
  fetchAllUser,
  postCreateUser,
  putUpdateUser,
  deleteDeleteUser,
  loginApi
}