import axios from 'axios';

const API_KEY = "38933529-1badfc8ed6dbb186160b3796b";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchPics(searchTerm) {

  const params = {
    key: API_KEY,
    q: searchTerm,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 40,
    page: page,
  };

  return axios.get(BASE_URL, { params })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}








