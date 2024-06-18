import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const API_KEY = "Pj9OG2VePIxBotML07icqApC0IcM_X0oMmtO4D0AFq0";

export const fetchData = async (searchQuery, page) => {
  const data = await axios.get("/search/photos", {
    params: {
      client_id: API_KEY,
      query: searchQuery,
      per_page: 12,
      page,
    },
  });
  return data;
};