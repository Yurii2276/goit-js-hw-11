import { fetchPics } from "./sass/pixaby_api";

fetchPics("nature")
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });














// API_KEY = 38933529-1badfc8ed6dbb186160b3796b