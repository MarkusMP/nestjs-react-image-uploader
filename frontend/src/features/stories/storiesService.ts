import axios from "axios";
import { IPhotoData } from "./storiesInterface";

const createStory = async (data: IPhotoData) => {
  const formData = new FormData();
  formData.append("description", data.description);
  formData.append("image", data.image);

  const response = await axios.post("/api/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const getStories = async () => {
  const response = await axios.get("/api/images");

  return response.data;
};

const deleteStory = async (id: string) => {
  const response = await axios.delete(`/api/images/${id}`);

  return { ...response.data, id };
};

const photosSrvice = { createStory, getStories, deleteStory };
export default photosSrvice;
