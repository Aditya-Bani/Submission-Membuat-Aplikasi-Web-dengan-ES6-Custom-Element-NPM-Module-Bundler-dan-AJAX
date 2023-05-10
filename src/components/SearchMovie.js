const axios = require("axios");
const apiKey = "63288fbed2ea65b17d9f1c7d731b981a";

class MovieSearch extends HTMLElement {
  connectedCallback() {
    this.render();

    const searchForm = this.querySelector("#search-form");
    const searchInput = this.querySelector("#search-input");
    const movieListElement = this.querySelector("#movie-list");

    const createMovieElement = (movie) => {
      const movieElement = document.createElement("div");
      movieElement.innerHTML = `<div class="card">
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" /> &emsp; 
          <div>
            <h2>${movie.title}</h2>
            <p>
              <strong>Release Date :</strong> ${movie.release_date} <br />
              <strong>Rating :</strong> ⭐ ${movie.vote_average}
            </p>
            <p> ${movie.overview} </p>
          </div>
        </div>
        <hr />
        `;
      return movieElement;
    };

    const renderSearchResults = (movies) => {
      movieListElement.innerHTML = "";

      if (movies.length === 0) {
        movieListElement.textContent = "No movies found.";
        return;
      }

      const movieElements = movies.map(createMovieElement);
      movieElements.forEach((movieElement) => {
        movieListElement.appendChild(movieElement);
      });
    };

    const searchMovies = (query) => {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

      axios
        .get(searchUrl)
        .then((response) => {
          const movies = response.data.results;
          renderSearchResults(movies);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (query !== "") {
        searchMovies(query);
      }
    });
  }

  render() {
    this.innerHTML = `
      <form id="search-form">
        <input
          type="text"
          id="search-input"
          placeholder="Cari Movie"
        />
        <button type="submit">Search</button>
      </form>
      <ul id="movie-list"></ul>
    `;
  }
}

customElements.define("search-movie", MovieSearch);
