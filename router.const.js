const router = require('express').Router();
const moviesRoutes = require('./routes/movies.routes');

router.use("/movies", moviesRoutes);

module.exports = router;