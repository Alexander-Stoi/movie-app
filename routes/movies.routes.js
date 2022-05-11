const router = require("express").Router();
const MovieController = require("../controllers/movies.controller");

router.get("", MovieController.getMovies);

module.exports = router;
