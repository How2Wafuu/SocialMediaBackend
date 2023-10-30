const router = require("express").Router();
const authJwt = require("../middleware/authJWT");

// If you want to use Versioning the API
const api = process.env.apiVersion || "/api";
router.use(`${api}`, require("./users.routes"));
router.use(`${api}`, require("./posts.routes"));

// Routes that do not require the authJwt middleware
router.use(`${api}`, require("./calendar.routes"));

module.exports = router;