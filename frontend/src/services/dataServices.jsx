import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/user";

const getConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getUsers = (token) =>
  axios.get(`${API_BASE_URL}/all`, getConfig(token));

export const addUser = (data, token) =>
  axios.post(`${API_BASE_URL}/create`, data, getConfig(token));

export const updateUser = (id, data, token) =>
  axios.patch(`${API_BASE_URL}/update/${id}`, data, getConfig(token));

export const deleteUser = (id, token) =>
  axios.delete(`${API_BASE_URL}/delete/${id}`, getConfig(token));
