import { fetchPics } from './pixaby_api';
import { createMarkup } from './markup';
import Notiflix from 'notiflix';

const refs = {
  form: document.getElementById(`search-form`),
  input: document.querySelector('.input-field'),
  loadMoreBtn: document.querySelector(`.load-more`),
  gallery: document.querySelector(`.gallery`),
};

let page = 0;
const limitPic = 4;
let totalPage = 0;
const previousTerm = { value: '' };

loadMoreHide();

refs.form.addEventListener(`submit`, showSetPictures);

refs.loadMoreBtn.addEventListener(`click`, showSetPictures);

async function showSetPictures(event) {
  event.preventDefault();

  let currentSearchTerm = refs.input.value;
  checkNewDataImput(currentSearchTerm, previousTerm);

  try {
    const data = await fetchPics(currentSearchTerm, (page += 1), limitPic);

    console.log(data);
    console.log(data.totalHits);
    totalPage = Math.ceil(data.totalHits / limitPic);
    console.log(totalPage);
    console.log(page);

    refs.gallery.insertAdjacentHTML(`beforeend`, createMarkup(data.hits));

    checkTheEnd(page, totalPage);
  } catch (error) {
      loadMoreHide();
      console.error(error);
  }
}

function loadMoreShow() {
  refs.loadMoreBtn.style.display = 'block';
}

function loadMoreHide() {
  refs.loadMoreBtn.style.display = 'none';
}

function checkTheEnd(p, tp) {
  if (p < tp) {
    loadMoreShow();
  } else {
    loadMoreHide();
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function checkNewDataImput(currentTerm, previousTerm) {
  if (currentTerm !== previousTerm.value) {
    refs.gallery.innerHTML = '';
    previousTerm.value = currentTerm;
    page = 0;
    totalPage = 0;
    return page, totalPage;
  }
}
