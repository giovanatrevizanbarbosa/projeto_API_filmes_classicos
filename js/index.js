const movies = [
    { imdbID: 'tt0081505' },
    { imdbID: 'tt0066921' },
    { imdbID: 'tt0110912' },
    { imdbID: 'tt0266697' },
    { imdbID: 'tt0102926' },
    { imdbID: 'tt0062622' },
    { imdbID: 'tt0209144' },
    { imdbID: 'tt0086250' },
    { imdbID: 'tt0100157' },
    { imdbID: 'tt0133093' },
    { imdbID: 'tt0947798' },
    { imdbID: 'tt1130884' },
    { imdbID: 'tt0102926' }
];

function openMovieDetails(imdbID) {
    window.location.href = `movie.html?imdbID=${imdbID}`;
}

function populateMovieData() {
    const cards = document.querySelectorAll('.card');

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
            .then(response => response.json())
            .then(data => {
                const card = document.querySelectorAll('.card')[index];
                const cardPoster = card.querySelector('.card-poster');

                cardPoster.src = data.Poster;
            })
            .catch(error => {
                console.error("An error occurred while fetching movie details:", error);
            });
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

