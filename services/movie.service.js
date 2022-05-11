require("dotenv").config();
const axios = require("axios").default;

const TRAILER = "Trailer";
const YOUTUBE = "YouTube";
const MEDIA_TYPE_PERSON = "person";

class MovieService {
  // fetchMovies fetches the movies that are searched by the search query and returns 20 by page,
  // if no page is provided it fetches the first page
  static async fetchMovies(page, query) {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${query}&page=${page}`
      );
      // because the themoviedb returns also people we filter the data to exclude them
      let movies = await result.data.results.filter(
        (f) => f.media_type !== MEDIA_TYPE_PERSON
      );

      return movies;
    } catch (error) {
      throw error;
    }
  }

  // fetchMovieTrailers fetches the youtube trailers for specific movie id
  static async fetchMovieTrailers(movieId, mediaType) {
    const youTubeLinks = [];
    try {
      const videoResults = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${movieId}/videos?api_key=${process.env.API_KEY}&language=en-US`
      );
      if (videoResults.data.results) {
        videoResults.data.results.forEach((element) => {
          if (
            element.key &&
            element.type === TRAILER &&
            element.site === YOUTUBE
          ) {
            youTubeLinks.push(`https://www.youtube.com/watch?v=${element.key}`);
          }
        });
      }
      return youTubeLinks;
    } catch (error) {
      throw error;
    }
  }

  // getMovies fetches the movies from movies_db api and gets the youtube trailers for all the movies that are searched
  static async getMovies(page, query) {
    try {
      const movies = await this.fetchMovies(page, query);
      const listOfMovies = await movies.map(async (movie) => {
        const youtubeLinks = await this.fetchMovieTrailers(
          movie.id,
          movie.media_type
        );

        return {
          id: movie.id,
          mediaType: movie.media_type,
          title: movie.title || movie.name,
          overview: movie.overview,
          popularity: movie.popularity,
          youTubeTrailers: youtubeLinks,
        };
      });

      return await Promise.all(listOfMovies);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MovieService;
