import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = "38933529-1badfc8ed6dbb186160b3796b";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchPics(searchTerm, page, limit) {

  const params = {
    key: API_KEY,
    q: searchTerm,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: limit,
    page: page,
  };

  return axios.get(BASE_URL, { params })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      const data = response.data;
       if (data.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        throw new Error('No images found'); 
      }

      return data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}








