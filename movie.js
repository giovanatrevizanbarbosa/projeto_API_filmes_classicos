const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get("imdbID");

if (imdbID) {
    const apiUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=ff240ede`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("movieTitle").textContent = data.Title;
            document.getElementById("moviePlot").textContent = data.Plot;

            const moviePoster = document.getElementById("moviePoster");
            if (data.Poster !== "N/A") {
                moviePoster.src = data.Poster;
            } else {
                moviePoster.src = "default_poster.jpg";
            }
        })
        .catch(error => {
            console.error("Ocorreu um erro ao buscar os detalhes do filme:", error);
        });
}
