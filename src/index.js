import difference from 'lodash.difference';
const filmsList = document.querySelector('.films__list');
const LOCALSTORAGE_KEY = 'genre-list';
async function fetchMovieMainPage() {
  const API_KEY = '35e94b176a96ea96112da2a8bb1e2480';
  const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&&language=uk`;
  const response = await fetch(URL);
  const data = await response.json();

  const markup = await createMovieCardMarkup(data);
  populateMarkup(filmsList, markup);
}

const fetchGenreList = async () => {
  const API_KEY = '35e94b176a96ea96112da2a8bb1e2480';
  const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&&language=uk`;

  const response = await fetch(URL);
  const data = await response.json();
  // console.log(data);
  const dataStorage = JSON.stringify(data);
  localStorage.setItem(LOCALSTORAGE_KEY, dataStorage);
};

function definesGenreById(arrayIds) {
  fetchGenreList();
  const genresObj = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  const list = genresObj.genres.filter(item => arrayIds.includes(item.id));
  const arrayGenres = list.map(item => item.name);
  return arrayGenres.toString();
}

function createMovieCardMarkup(data) {
  const items = data.results;

  let markup = '';
  markup = items
    .map(
      item => `<div class="films__card">
    <a href="#" class="films__preview"
      ><div class="films__cards-list">
      <div class="films__img">
      <img src="https://www.themoviedb.org/t/p/w500${
        item.poster_path
      }" alt="" width=395 class="films__img">
      </div>
        <div>
          <p class="films__name">${item.title}</p>
          <p class="films__description">${definesGenreById(item.genre_ids)}
           | ${item.release_date.slice(0, 4)}</p>
        </div>
      </div>
    </a>
  </div>`
    )
    .join('');
  return markup;
}

function populateMarkup(item, markup) {
  item.insertAdjacentHTML('beforeend', markup);
}

window.addEventListener('load', fetchMovieMainPage);
