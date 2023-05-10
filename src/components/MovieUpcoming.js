const axios = require("axios");

class MovieUpcoming extends HTMLElement {
  connectedCallback() {
    const apiKey = "63288fbed2ea65b17d9f1c7d731b981a";
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
    axios
      .get(apiUrl)
      .then((response) => {
        const movies = response.data.results;
        const movieUpcoming = new MovieUpcomingRenderer(movies);
        this.innerHTML = movieUpcoming.render();

        // Add event listener to handle click on movie links
        this.addEventListener("click", (event) => {
          const link = event.target.closest("a");
          if (link) {
            event.preventDefault();
            const movieId = link.dataset.id;
            const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
            axios.get(movieUrl).then((response) => {
              const movie = response.data;
              // Render nya
              console.log(movie);
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

class MovieUpcomingRenderer {
  constructor(movies) {
    this.movies = movies;
  }
  render() {
    return `<ol>
      <h1>Upcoming</h1>
      <div class="card-right">
      ${this.movies
        .slice(0, 9)
        .map(
          (movie) => `
          <li>
            <div style="display:flex; justify-content:flex-start; align-items:center;">
              <img style="width: 60px" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />&nbsp;
              <p><strong>${movie.title}</strong> <br/><strong>Release :</strong> ${movie.release_date} </p>
            </div>
          </li>
        <br>`
        )
        .join("")}
        </div>
    </ol>`;
  }
}

customElements.define("movie-upcoming", MovieUpcoming);
