const MovieService = require("../services/movie.service");
const FIRST_PAGE = "1";
class MovieController {
  static async getMovies(req, res, next) {
    let searchQuery = req.query.query;
    let page = req.query.page;

    if (!searchQuery) {
      res.status(500).json({ message: "search query must be specified" });
    }
    if (!page) {
      page = FIRST_PAGE;
    }

    try {
      const movies = await MovieService.getMovies(page, searchQuery);
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: error.response.data.status_message });
    }
  }
}

module.exports = MovieController;
