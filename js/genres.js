const movies = [
    { imdbID: 'tt0066921'}, 
    { imdbID: 'tt0081505'}, 
    { imdbID: 'tt0947798'}, 
    { imdbID: 'tt0102926'},
    { imdbID: 'tt0062622'},
    { imdbID: 'tt0209144'},
    { imdbID: 'tt0100157'},
    { imdbID: 'tt0102926'},
    { imdbID: 'tt0266697'},
    { imdbID: 'tt0110912'},
    { imdbID: 'tt0086250'},
    { imdbID: 'tt0947798'}
];

function openMovieDetails(imdbID) {
  window.location.href = `movie.html?imdbID=${imdbID}`;
}

function populateMovieData() {
  const cards = document.querySelectorAll('.movie-card');

  cards.forEach((card, index) => {
      const movie = movies[index];

      const details = card.querySelector('.details');
      details.setAttribute('onclick', `openMovieDetails('${movie.imdbID}')`);
  });
}

populateMovieData();

function fetchAndPopulateMovies() {
  movies.forEach((movie, index) => {
    const imdbID = movie.imdbID;
    const apiUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=ff240ede`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const card = document.querySelectorAll('.movie-card')[index];
        const imdbRating = card.querySelector(".imdbRating");
        const runtime = card.querySelector(".runtime");
        const poster = card.querySelector("img");
  
        imdbRating.textContent = `Nota: ${data.imdbRating}`;
        runtime.textContent = `${data.Runtime}`;
        poster.src = data.Poster;
      })
      .catch((error) => console.error("Erro na solicitação da API OMDB:", error));
  });
}

fetchAndPopulateMovies();

const fetchMovieDetails = async (imdbID) => {
  const apiUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=ff240ede`;
  const response = await fetch(apiUrl);

  if (response.ok) {
      const data = await response.json();
      return data;
  } else {
      console.error('Failed to fetch movie details from OMDB API');
      return null;
  }
};

