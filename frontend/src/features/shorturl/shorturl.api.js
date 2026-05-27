import axiosInstance from "../../shared/utils/axiosInstance";

export const createShortUrl = async (url) => {
  const { data } = await axiosInstance.post("/api/shorturl", {
    url,
  });
  return data;
};
