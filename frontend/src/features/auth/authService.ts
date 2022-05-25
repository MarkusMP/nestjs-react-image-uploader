import axios from "axios";
import { IUserData } from "./authInterface";

const register = async (userData: IUserData) => {
  const response = await axios.post("/api/users", userData);

  return response.data;
};

const login = async (userData: IUserData) => {
  const response = await axios.post("/api/users/login", userData);

  return response.data;
};

const authenticated = async () => {
  const response = await axios.get("/api/users/authenticated");

  return response.data;
};

const logout = async () => {
  const response = await axios.delete("/api/users/logout");

  return response.data;
};

const authService = { register, login, authenticated, logout };

export default authService;
