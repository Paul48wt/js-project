const filmsList = document.querySelector('.films__list');

async function fetchMovie() {
  const API_KEY = '35e94b176a96ea96112da2a8bb1e2480';
  const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
  const response = await fetch(URL);
  const data = await response.json();

  const markup = await createMovieCardMarkup(data);
  populateMarkup(filmsList, markup);
}

function createMovieCardMarkup(data) {
  const items = data.results;
  console.log(items);

  let markup = '';
  markup = items
    .map(
      item => `<li>
    <a href="#" class="films__preview"
      ><ul class="films__cards-list">
      <li class="films__img">
      <img src="${item.poster_path}" alt="">
      </li>
        <li>
          <p class="films__name">${item.title}</p>
          <p class="films__description"></p>
        </li>
      </ul>
    </a>
  </li>`
    )
    .join('');
  return markup;
}

function populateMarkup(item, markup) {
  item.insertAdjacentHTML('beforeend', markup);
}

window.addEventListener('load', fetchMovie);
