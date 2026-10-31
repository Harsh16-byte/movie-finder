const apiKey = "df628609";
const moviesElement = document.getElementById('movies');
const form = document.querySelector('.search-bar')
const input = document.querySelector('.search-bar input')

async function getMovies(name) {
  const response = await fetch(`https://www.omdbapi.com/?s=${name}&apikey=${apiKey}`)
  const data = await response.json()
  showMovies(data.Search);  
}



async function showMovies(movies) {
  moviesElement.innerHTML = '';

  for (const movie of movies) {
    const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
    const details = await res.json();

    const card = document.createElement("div");
    card.classList.add('movie-card');
    card.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h2>${movie.Title}</h2>
      <p>${movie.Year}</p>
      <p>⭐ ${details.imdbRating}</p>
    `;
    moviesElement.appendChild(card);
  }
}
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = input.value.trim();
    if(name) getMovies(name)
  })
