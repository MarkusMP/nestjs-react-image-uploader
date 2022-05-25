import axios from "axios";

const getProfile = async () => {
  const response = await axios.get("/api/users");

  return response.data;
};

const updateUsername = async (username: string) => {
  const response = await axios.patch("/api/users", { username });

  return response.data;
};

const deleteProfile = async () => {
  const response = await axios.delete("/api/users");

  return response.data;
};

const profileService = { getProfile, updateUsername, deleteProfile };
export default profileService;
