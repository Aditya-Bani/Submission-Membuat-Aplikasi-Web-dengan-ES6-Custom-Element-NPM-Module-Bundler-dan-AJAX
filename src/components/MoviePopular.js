const axios = require("axios");

class MoviePopular extends HTMLElement {
  connectedCallback() {
    const apiKey = "63288fbed2ea65b17d9f1c7d731b981a";
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const movies = response.data.results;
        const moviePopular = new MoviePopularRenderer(movies);
        this.innerHTML = moviePopular.render();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

class MoviePopularRenderer {
  constructor(movies) {
    this.movies = movies;
  }

  render() {
    return `
    <h1>Popular Movie 📈</h1>
      ${this.movies
        .slice(0, 9)
        .map(
          (movie) => `
        <div class="card">
          <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" /> &emsp;
          <div >
            <h2>${movie.title}</h2>
            <p><strong>Release Date :</strong> ${movie.release_date} <br/><strong>Rating :</strong> ⭐ ${movie.vote_average} </p>
            <p>
            ${movie.overview}
            </p>
          </div>
        </div>`
        )
        .join("")}
    `;
  }
}

customElements.define("movie-popular", MoviePopular);
